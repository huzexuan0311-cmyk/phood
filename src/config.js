// ========== 饭来 — API配置 ==========
// 自动检测部署环境：EdgeOne → 直连Qwen；Vercel → 走代理隐藏Key
const isEdgeOne = window.location.hostname.includes('edgeone');

const API_CONFIG = {
  vision: {
    model: 'qwen-vl-plus',
    endpoint: isEdgeOne
      ? 'https://dashscope.aliyuncs.com/api/v1/services/aigc/multimodal-generation/generation'
      : 'https://phood-orpin.vercel.app/api/proxy',
    apiKey: isEdgeOne ? 'sk-53de2df3bbc042f0aa48237d26102201' : null,
    isProxy: !isEdgeOne,
  },
};
