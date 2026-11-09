# Bohemian Scriptorium — 中文摘要

## 这是什么

**Bohemian Scriptorium（波西米亚缮写室）** 是给 Kiroween 2026 黑客松 **Resurrection（复活）** 类别准备的**纯静态**网页应用，部署在 GitHub Pages（账号 **Baoyx007**）。

两个模式：

1. **Illuminate（照亮文稿）**：输入现代中文或英文，改写成 15 世纪风格的 **古捷克语 / 拉丁语 / 中古英语**，羊皮纸手抄本样式展示，可导出 **PNG**。
2. **Resurrect（复活文献）**：粘贴古文或选公有领域示例，得到白话说明 + 逐行注释。

**没有后端、没有 Serverless、没有项目自己的 API Key。**  
默认 **Demo Mode**：内置预计算的改写样例和一份复活文献，评委不用密钥就能玩。  
可选 **自带密钥（BYOK）**：访问者在设置里粘贴自己的 xAI Key，只存在浏览器 `localStorage`，可一键清除；密钥只会发往 `https://api.x.ai`。Haven **不提供**密钥。

浏览器直连 xAI 可能遇到 **CORS** 限制（官方文档未明确保证），所以 Demo Mode 是稳妥演示路径；Live 失败时提示切回 Demo。

所有结果标明：**AI 重构，不是学术翻译**。主题：中世纪波西米亚 + 万圣节彩蛋。不用《天国拯救》素材。

## 技术栈

- 前端：Vite + React + TypeScript（静态站）
- 托管：GitHub Pages（Baoyx007）
- 测试：Vitest + fast-check
- 开发分工：
  - **Kiro（最便宜模型）**：只做合规——已有 specs / steering / hooks，以及很小的初始脚手架
  - **Grok**：几乎全部实质编码（Grok CLI / xAI API），并作为应用内 Live 模型

## 三周左右里程碑（截止：12 月 5 日 06:00 新加坡时间）

| 周次 | 目标 |
|------|------|
| 第 1 周 | Kiro 廉价模型搭空壳；Grok 完成类型/校验/Demo 固件/keyStore/浏览器 xAI 客户端与属性测试 |
| 第 2 周 | Grok 做设置页、双模式 UI、羊皮纸、PNG、主题彩蛋 |
| 第 3 周 | Grok 部署 GitHub Pages、写诚实的 Kiro 使用说明、录 ≤3 分钟视频（必演示 Demo Mode）、Devpost 提交 |

任务清单见 `.kiro/specs/scribe/tasks.md`（标了 `[Kiro]` / `[Grok]`）。

## 你需要准备的

1. **GitHub 账号 Baoyx007**（公开仓库 + MIT；务必提交 `/.kiro`；开启 GitHub Pages）
2. 本地安装 **Kiro**（只用最便宜模型做脚手架）和 **Grok 编码环境**（CLI 或等价方式）
3. **不需要** xAI 项目密钥，**不需要** Vercel / Cloudflare 账号
4. （可选）你自己的 xAI Key 仅用于本地试 Live Mode；评委靠 Demo Mode
5. 录视频设备；提交前核对规则与资格

## 规格包位置

- 需求：`.kiro/specs/scribe/requirements.md`
- 设计：`.kiro/specs/scribe/design.md`
- 任务：`.kiro/specs/scribe/tasks.md`
- 转向：`.kiro/steering/`
- 钩子：`.kiro/hooks/`
