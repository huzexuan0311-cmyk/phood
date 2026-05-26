# 饭来（Phood）— 项目上下文

## 这是什么
一个基于AI视觉识别的智能菜谱推荐 + 卡路里识别小程序原型（MVP阶段）。
核心流程：拍照 → 识别食材/估算热量 → 推荐菜谱/营养分析 → 购物清单 → 一键买菜。

## 技术栈
- 纯 HTML/CSS/JS（零框架依赖，浏览器直接打开）
- 390×844 手机端适配
- 通义千问VL API（通过 Vercel Serverless Function 代理，前端不暴露 Key）
- API 失败自动降级 mock 数据

## 线上地址
- 生产环境：https://phood-orpin.vercel.app
- Vercel 项目：evan-s-fpood/phood

## 文件说明
- `index.html` — ⭐当前主力（暖陶土橘 + 液态玻璃 + Anthropic风格，含菜谱+卡路里双模式）
- `index-claude.html` — Claude版备份
- `index-v4-backup.html` — V4原版备份（浓缩咖啡棕 + 毛玻璃）
- `api/proxy.js` — Vercel Serverless 代理函数，隐藏 API Key
- `src/config.js` — API 配置（仅存代理路径，Key 已移除）
- `src/mockData.js` — 菜谱模拟数据（3套）+ 卡路里模拟数据（3套）
- `src/style-claude.css` — 全部样式（含模式Tab + 卡路里卡片）
- `src/app-claude.js` — 核心逻辑（菜谱模式 + 卡路里模式，均走代理API）
- `src/app.js` — V4版逻辑（仅mock，不调API）
- `src/style.css` — V4版样式
- `vercel.json` — Vercel 部署配置

## 当前状态
- 品牌名：饭来 / Phood | Slogan：拍一拍，饭就来
- 双模式：🍽️ 菜谱推荐 | 🔥 卡路里识别
- API Key 已通过 Vercel Serverless Function 保护，前端不再暴露
- 演示卡片使用 mock 数据（无需拍照即可体验）
- 买家平台：小象超市、朴朴超市
- 外观可调：3套配色 × 2套圆角

## 下一步
- 周菜谱规划
- 用户账号 + 口味/目标记忆
- 小程序化（uni-app/Taro）
- 生鲜电商 CPS 分佣
- 自定义域名
