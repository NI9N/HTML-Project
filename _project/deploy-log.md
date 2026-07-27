# 部署日志

## 2026-07-27

| # | Commit | 说明 | 状态 |
|---|--------|------|------|
| 1 | `b3d465b` | Splash动画大升级—蓄力弹射/360°旋转/斩击刀光/音效 | ✅ |
| 2 | `64b18b8` | Splash动画部署修复—等待Logo加载+图片压缩(int1/ext/int2) | ✅ |
| 3 | `b628325` | ~~菜单硬编码英文~~ ← 误推，下个commit恢复 | ❌ |
| 4 | `248380b` | OrderSummary确认单固定英文名 + Cart/Modal存nameEn | ✅ |
| 5 | `8b6e1ce` | 恢复菜单语言切换功能 | ✅ |
| 6 | 待提交 | 刀光位置调整 top:72%→85%, rotate:-28°→-22° | 待推 |

## 说明
- 菜单内容跟随语言切换，仅 OrderSummary 确认单始终英文
- 图片压缩：int1 2.4MB→227KB, int2 1.6MB→151KB, ext 872KB→98KB
- ClickShow 替代 PointerFocus（鼠标高亮，免费开源）
