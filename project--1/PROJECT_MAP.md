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
│   │   ├── layout/
│   │   │   ├── navbar.tsx      # 墨黑导航栏：Logo+导航链接+语言切换+预订按钮
│   │   │   │                   #   滚动变高 + 移动端汉堡菜单
│   │   │   └── footer.tsx      # 页脚：Logo + Location/Hours/Phone + 地图 iframe
│   │   ├── sections/
│   │   │   ├── hero.tsx        # 首屏：外景大图背景 + "Every bowl tells a story"
│   │   │   │                   #   + CTA "View Menu" 按钮
│   │   │   ├── about.tsx       # "The Izakaya Experience"：内景图+店主故事
│   │   │   ├── menu.tsx        # 菜单区：分类Tab筛选（All/Sushi/Bowls/Salads）
│   │   │   │                   #   菜品卡片网格 + Framer Motion 动画
│   │   │   │                   #   ⚠️ 含图片预加载 + onError 缓存破坏重试
│   │   │   └── reviews.tsx     # 评价区：4.6★ 星级 + 6条顾客评价轮播/列表
│   │   ├── decorative.tsx      # 装饰组件：灯笼图标、暖帘分割
│   │   └── ui/             # shadcn/ui 组件库（~60 个组件）
