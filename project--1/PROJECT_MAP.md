# Hungry Ninja — 项目目录导览

> 全栈餐馆网站 | pnpm monorepo | React + Vite + Tailwind + shadcn/ui + API Server

---

## 顶层结构

```
project--1/
├── artifacts/              # 可部署的应用
│   ├── hungry-ninja/       # ▶ 主站点（前端网站）
│   ├── api-server/         #   后端 API 服务
│   └── mockup-sandbox/     #   设计原型沙箱
├── lib/                    # 共享库
│   ├── db/                 #   数据库 schema + Drizzle ORM
│   ├── api-spec/           #   OpenAPI 规范
│   ├── api-zod/            #   Zod 校验类型（由 API spec 生成）
│   └── api-client-react/   #   React API 客户端（由 API spec 生成）
├── attached_assets/        # 📸 甲方提供的餐厅截图素材
├── scripts/                # 工具脚本
├── .agents/memory/         # Replit Agent 的记忆文件
├── DESIGN_GUIDE.md         # 设计风格指南（Phase 2 产出）
├── replit.md               # Replit 平台说明
├── pnpm-workspace.yaml     # monorepo 工作区配置 + catalog + overrides
├── package.json            # 根 package（preinstall 检查 pnpm）
├── tsconfig.base.json      # 全局 TypeScript 基础配置
└── .replit                 # Replit 平台配置（nodejs-24, 端口映射）
```

---

## 主站点：`artifacts/hungry-ninja/`

```
hungry-ninja/
├── src/
│   ├── main.tsx            # 入口：渲染 App → #root
│   ├── App.tsx             # 路由（wouter）+ QueryClient + Tooltip + Toaster
│   ├── index.css           # Tailwind v4 配置 + CSS 变量（色板/字体/暗色模式）
│   │
│   ├── pages/
│   │   ├── home.tsx        # 首页：组合 Navbar+Hero+About+Menu+Reviews+Footer
│   │   └── not-found.tsx   # 404 页面
│   │
│   ├── components/
│   │   ├── navbar.tsx      # 墨黑导航栏：Logo+导航链接+语言切换+预订按钮
│   │   │                   #   滚动变高 + 移动端汉堡菜单
│   │   ├── hero.tsx        # 首屏：外景大图背景 + "Every bowl tells a story"
│   │   │                   #   + CTA "View Menu" 按钮
│   │   ├── about.tsx       # "The Izakaya Experience"：内景图+店主故事
│   │   ├── menu.tsx        # 菜单区：分类Tab筛选（All/Sushi/Bowls/Salads）
│   │   │                   #   菜品卡片网格 + Framer Motion 动画
│   │   │                   #   ⚠️ 含图片预加载 + onError 缓存破坏重试
│   │   ├── reviews.tsx     # 评价区：4.6★ 星级 + 6条顾客评价轮播/列表
│   │   ├── footer.tsx      # 页脚：Logo + Location/Hours/Phone + 地图 iframe
│   │   ├── decorative.tsx  # 装饰组件：灯笼图标（LanternIcon）、暖帘分割（NorenDivider）
│   │   └── ui/             # shadcn/ui 组件库（~60 个组件）
│   │       ├── button.tsx  # 按钮组件（主色灯笼红）
│   │       ├── card.tsx    # 卡片容器
│   │       ├── badge.tsx   # 标签（推荐/新品/辣）
│   │       ├── dialog.tsx  # 弹窗
│   │       ├── ...         # 其余 shadcn 组件
│   │
│   ├── i18n/               # 国际化
│   │   ├── index.ts        # i18next 初始化（自动加载）
│   │   ├── en.ts           # 英文文案
│   │   └── zh.ts           # 中文文案
│   │
│   ├── hooks/
│   │   ├── use-mobile.tsx  # 移动端断点检测
│   │   └── use-toast.ts    # Toast 通知 hook
│   │
│   └── lib/
│       └── utils.ts        # Tailwind class 合并工具（cn()）
│
├── public/
│   ├── favicon.svg         # 网站图标（SVG）
│   ├── robots.txt          # 搜索引擎爬虫规则
│   └── opengraph.jpg       # OG 分享图
│
├── vite.config.ts          # Vite 构建配置
│                           #   ⚠️ 需要 PORT + BASE_PATH 环境变量
│                           #   @assets → ../../attached_assets/
│                           #   Replit 插件仅在 REPL_ID 存在时启用
├── index.html              # HTML 入口
├── package.json            # 依赖清单（React 19, Tailwind v4, Vite 7）
├── tsconfig.json           # TypeScript 配置
└── components.json         # shadcn/ui 配置
```

---

## API 服务：`artifacts/api-server/`

```
api-server/
├── src/
│   ├── index.ts            # 服务入口：读取 PORT → 启动 Express 监听
│   │                       #   含 graceful shutdown (SIGTERM/SIGINT)
│   ├── app.ts              # Express 应用实例
│   ├── mcp.ts              # MCP 相关配置校验
│   ├── lib/
│   │   ├── logger.ts       # 结构化日志（pino）
│   │   └── .gitkeep
│   ├── middleware/
│   │   └── .gitkeep
│   └── routes/
│       ├── index.ts        # 路由聚合
│       └── health.ts       # 健康检查端点
├── build.mjs               # 构建脚本
└── package.json
```

> 当前状态：基础架子已搭好，API 路由待填充（Phase 6 预约模块会用到）

---

## 共享库：`lib/`

```
lib/
├── db/                     # 数据库层
│   ├── src/
│   │   ├── index.ts        # Drizzle 客户端初始化（需 DATABASE_URL）
│   │   └── schema/         # 数据库表定义（Drizzle ORM schema）
│   ├── drizzle.config.ts   # Drizzle Kit 配置（迁移管理）
│   └── package.json
│
├── api-spec/               # API 契约
│   ├── openapi.yaml        # OpenAPI 3.0 规范
│   └── orval.config.ts     # Orval 代码生成配置
│
├── api-zod/                # 校验层（由 api-spec 生成）
│   └── src/generated/      # 自动生成的 Zod schemas
│
└── api-client-react/       # 前端 API 客户端（由 api-spec 生成）
    └── src/generated/      # 自动生成的 React hooks + fetch 函数
```

---

## 素材：`attached_assets/`

甲方提供的 Google Maps 截图，分类如下：

```
attached_assets/
├── ext_*.jpg/png           # 店面外景（Hero 区背景图）
├── int1_*.jpg/png          # 室内装修（About 区）
├── int2_*.jpg/png          # 室内装修（About 区）
├── image_*.png             # Google Maps 截图（菜品、菜单等）
├── 屏幕截图_*.png          # 菜品特写（Menu 区各菜品图片）
└── Pasted--Phase--*.txt    # Replit prompt 记录
```

---

## 运行方式

```bash
# 开发（主站点）
cd artifacts/hungry-ninja
PORT=3000 BASE_PATH=// pnpm run dev

# 构建
pnpm run build

# 类型检查
pnpm run typecheck
```

> ⚠️ 环境变量限制：`PORT` 和 `BASE_PATH` 为 vite.config.ts 强制要求
> ⚠️ MSYS2 (Git Bash) 下 BASE_PATH 用 `//` 防止路径转换

---

## 技术栈

| 层 | 技术 |
|------|---------|
| 框架 | React 19 + Vite 7 |
| 路由 | wouter（轻量 hash-free 路由） |
| 样式 | Tailwind CSS v4 + tw-animate-css |
| 组件 | shadcn/ui（~60 Radix 组件） |
| 动画 | Framer Motion 12 |
| 国际化 | i18next + react-i18next |
| 数据请求 | TanStack React Query |
| 后端 | Express（api-server） |
| 数据库 | PostgreSQL + Drizzle ORM（lib/db） |
| API 契约 | OpenAPI 3.0 → Orval → Zod + React hooks |
| 包管理 | pnpm workspace（monorepo） |

---

## 页面结构（从上到下）

```
Navbar (fixed top)
  ├── Logo (灯笼 + "HUNGRY NINJA")
  ├── Menu | About | Reviews | Visit Us
  └── [中文/EN] [Reserve a Table]
│
Hero
  ├── 外景背景图（带暗色遮罩）
  ├── "Every bowl tells a story"
  └── [View Menu] → 滚动到菜单区
│
About ("The Izakaya Experience")
  ├── 内景图（灯笼/桌椅）×2
  └── 店主故事 + 标签（4.6★ / 手工制作 / 无障碍）
│
Menu
  ├── 分类 Tab（All / Sushi & Bowls & Salads）
  └── 菜品卡片网格（图片 + 名称 + 价格 + 描述）
│
Reviews
  ├── 4.6★ 评分 + View on Google Maps
  └── 6 条顾客评价（星级 + 引文 + 署名）
│
Footer
  ├── Logo + 描述 + 社交媒体
  ├── Location（地址 + 地图 iframe）
  ├── Hours（周一休息 / 二~六 11:30-19:00 / 周日休息）
  ├── Phone + 价格区间
  └── [Reserve a Table]
```
