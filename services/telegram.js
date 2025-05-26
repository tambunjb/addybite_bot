const axios = require('axios');
const { TELEGRAM_API, TELEGRAM_TOKEN, WEBHOOK_URL } = require('../config');

async function sendMessage(chatId, text) {
  await axios.post(`${TELEGRAM_API}/sendMessage`, { chat_id: chatId, text });
}

async function setWebhook() {
  try {
    await axios.post(`${TELEGRAM_API}/setWebhook`, { url: WEBHOOK_URL });
    console.log('✅ Webhook set:', WEBHOOK_URL);
  } catch (err) {
    console.error('❌ Webhook error:', err);
  }
}

module.exports = {
  sendMessage,
  setWebhook
};