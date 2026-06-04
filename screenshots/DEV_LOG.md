# 开发日志

## 2026-06-02

### 上下文指示器修复
- 安装了 `jq 1.7.1`（`C:\Users\Administrator\bin\jq.exe`）
- 修复了 `settings.json` 中 statusLine 命令，底部状态栏显示 `Context: XX% remaining`

### 安装 Superpowers 插件
- 添加了 obra/superpowers-marketplace
- 安装了 superpowers 技能库（14 个技能：TDD、代码审查、调试等）

### 清理 .mcp.json
- 删除了两个失效的 replit HTTP MCP 服务器
- 移除了硬编码的 `OPENROUTER_API_KEY`
- **待办：需要在环境中设置 `OPENROUTER_API_KEY`，否则 mcp-openrouter 不可用**

### 项目全面审查（Brainstorming）
- ✅ 审查了 PROJECT_NAV.md、PROJECT_GUIDE.md、PROJECT_MAP.md、DESIGN_GUIDE.md
- ✅ 审查了全部组件代码和配置文件
- ✅ 发现 Phrase/Phase 拼写不一致、组件目录扁平、vite.config.ts 顶层 await 等问题

### 组件目录重组
- ✅ 业务组件按功能分组：`layout/`（navbar, footer）和 `sections/`（hero, about, menu, reviews）
- ✅ 更新了所有 import 路径和文档（PROJECT_NAV.md、PROJECT_MAP.md）
- ✅ 本地构建 + typecheck 通过
- ✅ 推送到 GitHub，Actions Run #8 部署成功

### vite.config.ts 修复
- ✅ `defineConfig({...})` 改为 `defineConfig(async () => ({...}))`
- ✅ Replit 插件改用直接 await 替代 .then()

### .mcp.json 安全处理
- ✅ 已加入 `.gitignore`，从 git 跟踪移除
- ✅ 创建 `mcp.template.json` 作为参考模板

---
	
## 待办 — 明天继续

### P0 — 修复 + 打磨
- [ ] `package.json` 依赖分类修正（运行时库从 devDependencies 移到 dependencies）
- [ ] `PROJECT_GUIDE.md` 更新（ja.ts 已完成但文档标注"待添加"）
- [ ] SEO 结构化数据（Schema.org LocalBusiness/Restaurant 标记）
- [ ] 图片懒加载 + 速度优化
- [ ] Meta / OG 标签增强
- [ ] Sitemap 自动生成
- [ ] 视觉细节微调

### P1 — 内容完善
- [ ] 忍者 logo + 青海波纹样结合到网页设计
- [ ] `project--1-sync/` 冗余目录说明或清理
- [ ] `site/` 和 `attached_assets/` 图片同步机制

### P2 — 远期
- [ ] 设置 `OPENROUTER_API_KEY` 环境变量 + 轮换旧 key
- [ ] 预约系统后端开发
- [ ] 管理后台
- [ ] 部署上线
- [ ] 图片压缩优化（int1 2.5MB / int2 1.6MB）
- [ ] hero/about 图片（JS 引用）改为 loading="lazy"

---

## 2026-06-03

### 预计
- P0-7 视觉微调：忍者 Logo + 青海波 + 流云纹
- 图文样式设计讨论
- 部署上线

---

## 2026-06-02

### 上午/下午：P0 推进

#### P0-1 package.json 依赖分类
- ✅ 运行时库从 devDependencies 移到 dependencies
- ✅ 构建工具/类型定义留在 devDependencies
- ✅ 本地构建通过
- ⚠️ pnpm 11.5.0 需 Node 22+，本地 Node 20 → 降级用 pnpm 9.15.9

#### P0-2 PROJECT_GUIDE.md 更新
- ✅ ja.ts 标记 ✅ 已实现（原为"待添加"）
- ✅ 待办列表勾掉"加日文语言包"
- ✅ 更新日期为 2026-06-02

#### P0-3 SEO 结构化数据
- ✅ 在 index.html `<head>` 添加 Schema.org Restaurant JSON-LD
- ✅ 包含：名称、地址、电话、营业时间、经纬度、社交链接
- ✅ 构建产物验证通过

#### P0-4 图片懒加载 + 速度优化
- ✅ Hero 首图：fetchpriority="high"（优先加载）
- ✅ About 内饰图：loading="lazy" + decoding="async"
- ✅ Menu 菜品图：loading="lazy" + decoding="async"

#### P0-5 Meta / OG 标签增强
- ✅ 修复 title（去掉 "built on Replit"）
- ✅ 修复 description（改为正常餐厅描述）
- ✅ 增加 og:image、og:url、twitter:image
- ✅ 更新 og:image:width/height

#### P0-6 Sitemap 自动生成
- ✅ 创建 public/sitemap.xml（首页 + 预约页）
- ✅ robots.txt 添加 Sitemap 引用
- ✅ 构建产物验证通过

#### 额外修复
- ✅ footer tagline 硬编码英文 → i18n 翻译（中/英/日三语）

#### 纹样尝试（未成功）
- ❌ 青海波 + 流云纹 CSS 实现 — 用户反馈样式不对，已回退
- ⏳ 明天需要找参考图重新设计方案

#### Git 提交
- ✅ 4 个 commit，本地领先 origin 4 个，待 push
