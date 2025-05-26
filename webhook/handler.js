const db = require('../db/pool');
const { checkIntent, getEmbedding, pickBestOption, generateFriendlyReply } = require('../services/openai');
const { sendMessage } = require('../services/telegram');

async function handleWebhook(req, res) {
  const msg = req.body.message;
  if (!msg || msg.from.is_bot) return res.sendStatus(200);

  const userQuery = msg.text;
  const chatId = msg.chat.id;

  try {
    const intent = await checkIntent(userQuery);

    if (!intent.startsWith('yes')) return res.sendStatus(200);

    const vector = await getEmbedding(userQuery);
    const result = await db.query(`
      SELECT id, description, 1 - (embedding <#> $1::vector) AS similarity
      FROM products
      ORDER BY embedding <#> $1::vector
      LIMIT 3
    `, [`[${vector.join(',')}]`]);

    if (result.rows.length < 3) return res.sendStatus(200);

    const descriptions = result.rows.map(r => r.description);
    const pick = await pickBestOption(userQuery, descriptions);

    if (!['1', '2', '3'].includes(pick)) return res.sendStatus(200);

    const chosen = result.rows[parseInt(pick) - 1];
    const reply = await generateFriendlyReply(userQuery, chosen.description);
    await sendMessage(chatId, reply);
  } catch (err) {
    console.error('❌ Error:', err?.response?.data || err);
  }

  res.sendStatus(200);
}

module.exports = { handleWebhook };