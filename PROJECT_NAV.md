# 项目导航 — Hello World

> 工作区根目录 `E:\Hello World`，主项目为 Hungry Ninja 餐馆网站。
> 查找文件时，先看这个导航确定在哪个文件夹。

---

## 一、顶层目录速查

```
E:\Hello World\
├── project--1/              ★ 主项目（pnpm monorepo，全栈网站）
├── project--1-sync/         Replit 同步副本（与 Replit 双向同步）
├── site/                    静态网站输出（构建产物 + 图片资源副本）
├── screenshots/             各类截图（设计参考、Vercel 部署、反馈记录）
├── mcp-openrouter/          MCP 服务：用 OpenRouter API 看图
├── .playwright-mcp/         MCP 服务：Playwright 浏览器截图/自动化
├── .claude/                 Claude Code 配置（settings / skills / memory）
├── 1-1/                     (空目录 / 暂未使用)
│
├── .mcp.json                MCP 服务注册（playwright + openrouter + replit）
├── README.md                GitHub Repo 简介
└── PROJECT_NAV.md           本文件 ← 你现在看的就是这个
```

---

## 二、主项目 `project--1/`

### 项目概览

| 项目 | 说明 |
|------|------|
| 项目名 | Hungry Ninja 餐馆 Demo 站 |
| 技术栈 | pnpm monorepo / React 19 / Vite 7 / Tailwind v4 / shadcn/ui |
| 后端 | Express + PostgreSQL + Drizzle ORM（预约系统备用） |
| 状态 | Demo 阶段，已出 Phrase 3-5（首页/菜单/评价），Phrase 7 推进中 |
| 三方角色 | 甲方（餐馆老板）+ 你（PM / 监理）+ Replit（主力开发） |

### 目录结构

```
project--1/
├── artifacts/
│   ├── hungry-ninja/         ★ 前端网站（主产出）
│   │   ├── src/
│   │   │   ├── App.tsx       路由 / Provider 根组件
│   │   │   ├── main.tsx      入口文件
│   │   │   ├── index.css     Tailwind + CSS 变量
│   │   │   ├── pages/
│   │   │   │   ├── home.tsx      首页（组合各 section）
│   │   │   │   ├── reserve.tsx   预约页面（待完善）
│   │   │   │   └── not-found.tsx 404
│   │   │   ├── components/
│   │   │   │   ├── layout/
│   │   │   │   │   ├── navbar.tsx    导航栏（sticky + 汉堡菜单）
│   │   │   │   │   └── footer.tsx    页脚（地图、营业时间、联系方式）
│   │   │   │   ├── sections/
│   │   │   │   │   ├── hero.tsx      Hero 全屏首屏
│   │   │   │   │   ├── about.tsx     关于区
│   │   │   │   │   ├── menu.tsx      菜单（分类 tab + 卡片 + 价目表）
│   │   │   │   │   └── reviews.tsx   顾客评价
│   │   │   │   ├── decorative.tsx    装饰组件（灯笼、暖帘）
│   │   │   │   └── ui/               shadcn/ui 组件库（~60个组件）
│   │   │   ├── i18n/
│   │   │   │   ├── index.ts      i18next 初始化
│   │   │   │   ├── en.ts         英文文案
│   │   │   │   ├── zh.ts         中文文案
│   │   │   │   └── ja.ts         日文文案（待完成）
│   │   │   ├── hooks/
│   │   │   │   ├── use-mobile.tsx 移动端断点检测
│   │   │   │   └── use-toast.ts   Toast hook
│   │   │   └── lib/
│   │   │       └── utils.ts       cn() 工具函数
│   │   ├── public/           静态资源（favicon, robots.txt, opengraph.jpg）
│   │   ├── vite.config.ts    Vite 配置（需要 PORT 和 BASE_PATH env）
│   │   ├── index.html        入口 HTML
│   │   ├── package.json      前端依赖
│   │   └── components.json   shadcn/ui 配置
│   │
│   └── api-server/           后端 API（预约系统备用）
│       ├── src/
│       │   ├── index.ts      入口（启动 Express）
│       │   ├── app.ts        Express 实例（CORS + 路由 + 错误处理）
│       │   ├── mcp.ts        MCP 校验
│       │   ├── routes/
│       │   │   ├── index.ts        路由聚合
│       │   │   ├── health.ts       健康检查
│       │   │   └── reservations.ts 预约 API（待填充）
│       │   └── lib/
│       │       └── logger.ts       pino 日志
│       └── package.json
│
├── lib/                      共享库
│   ├── db/                   数据库层（Drizzle ORM + PostgreSQL）
│   │   ├── src/
│   │   │   ├── index.ts      DB 客户端初始化（需 DATABASE_URL）
│   │   │   └── schema/
│   │   │       ├── index.ts    导出聚合
│   │   │       └── reservations.ts  预约表定义
│   │   └── drizzle.config.ts Drizzle Kit 配置
│   ├── api-spec/             OpenAPI 3.0 规范（Orval 代码生成用）
│   ├── api-zod/              Orval 生成的 Zod schemas
│   └── api-client-react/     Orval 生成的 React API 客户端
│
├── attached_assets/          甲方提供的餐厅截图素材（菜品/环境/外观）
├── .agents/memory/           Replit Agent 记忆文件
│
├── DESIGN_GUIDE.md           设计风格指南（配色/字体/组件规范）
├── PROJECT_GUIDE.md          项目总览（Phase 进度/决策/待办）
├── PROJECT_MAP.md            目录导览（更详细的内部走查）
├── replit.md                 Replit 平台说明
├── pnpm-workspace.yaml       Monorepo 配置（catalog + overrides）
├── package.json              根 package（preinstall 检查 pnpm）
├── tsconfig.base.json        全局 TS 配置
└── tsconfig.json             项目 TS 配置
```

---

## 三、`site/` — 静态网站

从 attached_assets 整理出来的网站图片资源，目录结构与目标网站一致：

```
site/
├── images/
│   ├── exterior/    外景图（Hero 背景）
│   ├── interior/    内景图（About 区）
│   ├── food/        菜品图（Menu 卡片）
│   ├── environs/    周边环境
│   ├── menu/        菜单图片
│   └── reviews/     评价截图
├── css/
├── js/
└── design-guide.md  设计指南副本
```

---

## 四、`screenshots/` — 截图存档

| 文件 | 内容 |
|------|------|
| vercel-1.png, vercel-2.png, vercel-step-1.png | Vercel 部署配置截图 |
| hungry-ninja-home/menu/fullpage/mobile-*.png | 网站各状态预览 |
| ref-zakkushi/matsuri/tofuro.png | 竞品参考网站 |
| user-feedback-*.png | 用户反馈记录 |
| test-read.png | 测试用图 |

---

## 五、`mcp-openrouter/` — MCP 看图服务

```
mcp-openrouter/
├── index.js      MCP 服务主程序
├── analyze.js    设计风格分析模块
└── package.json
```

通过 OpenRouter API 提供图片分析能力（describe / analyze_design_style / extract_text）。

---

## 六、`.mcp.json` — MCP 服务注册

定义了 4 个 MCP 服务：
- **playwright** — 浏览器截图 / 页面交互/爬取
- **mcp-openrouter** — 图片分析（看图/设计分析/OCR）
- **replit** — Replit Agent 远程 MCP 连接
- **replit-ninja** — 同上，带鉴权 token

---

## 七、找文件速查

| 要找什么 | 去哪个文件夹 |
|----------|------------|
| 前端页面代码 | `project--1/artifacts/hungry-ninja/src/pages/` |
| 前端组件 | `project--1/artifacts/hungry-ninja/src/components/` |
| UI 组件库（按钮/卡片等） | 同上 `.../components/ui/` |
| 国际化文案 | `.../hungry-ninja/src/i18n/` |
| 网站配置（vite/package） | `.../hungry-ninja/` 根目录 |
| 后端 API 代码 | `project--1/artifacts/api-server/src/routes/` |
| 数据库 Schema | `project--1/lib/db/src/schema/` |
| API 接口定义 | `project--1/lib/api-spec/openapi.yaml` |
| 设计规范 | `project--1/DESIGN_GUIDE.md` |
| 项目进度/决策 | `project--1/PROJECT_GUIDE.md` |
| 目录导览（详细版） | `project--1/PROJECT_MAP.md` |
| 餐厅图片素材 | `project--1/attached_assets/` |
| 网站用图资源 | `site/images/` |
| 各种截图 | `screenshots/` |
| MCP 服务配置 | `.mcp.json` |

---

## 八、运行方式

```bash
# 前端开发（在 project--1 根目录）
cd project--1/artifacts/hungry-ninja
PORT=3000 BASE_PATH=// pnpm run dev

# 全项目构建
cd project--1
pnpm run build
```
