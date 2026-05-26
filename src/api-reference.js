// ========== 未来接入真实AI API的参考代码 ==========
// 当准备好接入真实API时，替换 mockData.js 中的逻辑

// 方案一：通义千问 VL（阿里云）
async function recognizeWithQwen(imageBase64) {
  const response = await fetch('https://dashscope.aliyuncs.com/api/v1/services/aigc/multimodal-generation/generation', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer YOUR_API_KEY',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'qwen-vl-plus',
      input: {
        messages: [{
          role: 'user',
          content: [
            { image: imageBase64 },
            { text: '识别图片中所有食材，列出名称和大致数量，JSON格式返回。' }
          ]
        }]
      }
    })
  });
  return response.json();
}

// 方案二：GPT-4V (OpenAI)
async function recognizeWithGPT4V(imageBase64) {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer YOUR_API_KEY',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-4o',
      messages: [{
        role: 'user',
        content: [
          { type: 'image_url', image_url: { url: `data:image/jpeg;base64,${imageBase64}` } },
          { type: 'text', text: '识别图中所有食材，列出名称数量。基于这些食材推荐3-5道菜，包含做法步骤。返回JSON格式。' }
        ]
      }],
      response_format: { type: 'json_object' }
    })
  });
  return response.json();
}

// 方案三：国内低成本方案 - 图文识别 + 菜谱生成分开
async function recognizeHybrid(imageBase64) {
  // 1. 用视觉模型识别食材（便宜模型即可）
  const ingredients = await recognizeIngredients(imageBase64);

  // 2. 用文本模型生成菜谱（更便宜）
  const recipes = await generateRecipes(ingredients);

  return { ingredients, recipes };
}

// 菜谱生成的 System Prompt 模板
const RECIPE_SYSTEM_PROMPT = `你是一个专业的中餐厨师和营养师。
根据用户提供的食材列表，推荐3-5道菜。
要求：
1. 优先使用已有食材，减少额外购买
2. 搭配均衡（荤素搭配、烹饪方式多样）
3. 标注烹饪时间、难度、卡路里
4. 每道菜附详细步骤（3-5步）
5. 列出缺少的食材
返回JSON格式。`;
