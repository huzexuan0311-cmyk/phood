// Vercel Serverless Function — API Key 代理
// 前端不暴露 Key，所有 AI 请求通过此函数中转

const API_KEY = 'sk-53de2df3bbc042f0aa48237d26102201';
const VISION_ENDPOINT = 'https://dashscope.aliyuncs.com/api/v1/services/aigc/multimodal-generation/generation';
const VISION_MODEL = 'qwen-vl-plus';

export default async function handler(req, res) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { image, prompt } = req.body;
    if (!image || !prompt) return res.status(400).json({ error: 'Missing image or prompt' });

    const response = await fetch(VISION_ENDPOINT, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: VISION_MODEL,
        input: { messages: [{ role: 'user', content: [{ image }, { text: prompt }] }] },
        parameters: { temperature: 0.4 },
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      return res.status(response.status).json({ error: `Upstream API error: ${response.status}`, detail: errText });
    }

    const data = await response.json();
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ error: 'Proxy error', detail: err.message });
  }
}
