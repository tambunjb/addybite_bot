const axios = require('axios');
const { OPENAI_API_KEY } = require('../config');

const headers = {
  Authorization: `Bearer ${OPENAI_API_KEY}`,
  'Content-Type': 'application/json'
};

async function checkIntent(userQuery) {
  const prompt = `
    Does the following message ask for a skin care product recommendation or show intent to find or need something? 
    Only respond with “yes” or “no”.

    Message: """${userQuery}"""
  `;

  const res = await axios.post('https://api.openai.com/v1/chat/completions', {
    model: 'gpt-4',
    messages: [
      { role: 'system', content: 'You determine whether the user is asking for a product recommendation.' },
      { role: 'user', content: prompt }
    ]
  }, { headers });

  return res.data.choices[0].message.content.trim().toLowerCase();
}

async function getEmbedding(text) {
  const res = await axios.post('https://api.openai.com/v1/embeddings', {
    model: 'text-embedding-3-small',
    input: text
  }, { headers });

  return res.data.data[0].embedding;
}

async function pickBestOption(userQuery, descriptions) {
  const decisionPrompt = `
You are a strict evaluator for product recommendations. Based ONLY on the options provided, you must decide which product best matches the user's need.

DO NOT request more information. 
DO NOT elaborate. 
ONLY answer with:
- 1, 2, or 3 if one of the product descriptions clearly fits the need
- "none" (no quotes) if none are suitable

User is looking for:
${userQuery}

Here are the options:
1. ${descriptions[0]}
2. ${descriptions[1]}
3. ${descriptions[2]}

Which is the best fit? Reply ONLY with 1, 2, 3, or none.
  `;

  const res = await axios.post('https://api.openai.com/v1/chat/completions', {
    model: 'gpt-4',
    messages: [
      { role: 'system', content: 'You choose the best matching product for a user need.' },
      { role: 'user', content: decisionPrompt }
    ]
  }, { headers });

  return res.data.choices[0].message.content.trim().toLowerCase();
}

async function generateFriendlyReply(userQuery, productDescription) {
  const res = await axios.post('https://api.openai.com/v1/chat/completions', {
    model: 'gpt-4',
    messages: [
      { role: 'system', content: 'You respond like a friendly human recommending a product briefly and helpfully.' },
      {
        role: 'user',
        content: `Someone asked: "${userQuery}"\n\nHere’s the product: "${productDescription}"\n\nReply like a friend recommending it in one short, friendly message.`
      }
    ]
  }, { headers });

  return res.data.choices[0].message.content.trim();
}

module.exports = {
  checkIntent,
  getEmbedding,
  pickBestOption,
  generateFriendlyReply
};