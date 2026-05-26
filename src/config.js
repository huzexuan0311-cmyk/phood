// ========== 饭来 — API配置 ==========
// API Key 已移至服务端代理（Vercel Serverless Function），前端不暴露
// 静态页面部署在 EdgeOne Pages，API 请求走 Vercel 代理
const API_CONFIG = {
  vision: {
    model: 'qwen-vl-plus',
    endpoint: 'https://phood-orpin.vercel.app/api/proxy',
  },
};
