# GitHub Actions 自动构建 Release 指南

## ✅ 现在会自动构建 Release

是的！当你推送代码和标签后，**会自动构建生成 Release**。

---

## 🔧 修复内容

### 1. 标签匹配模式
```yaml
on:
  push:
    tags:
      - 'v[0-9]*.[0-9]*.[0-9]*'  # 匹配 v1.0.0
      - '[0-9]*.[0-9]*.[0-9]*'   # 匹配 1.0.0
```
现在同时支持带 `v` 和不带 `v` 的标签。

### 2. 文件名处理
```yaml
# Remove 'v' prefix from tag name for file name
VERSION=${GITHUB_REF#refs/tags/}
VERSION=${VERSION#v}  # 移除 v 前缀
zip -r ../infographic-viz-${VERSION}.zip *
```
文件名会自动去除 `v` 前缀：
- 标签 `v1.0.0` → 文件 `infographic-viz-1.0.0.zip` ✅
- 标签 `1.0.0` → 文件 `infographic-viz-1.0.0.zip` ✅

### 3. Release 标题
```yaml
name: Release ${{ steps.get_version.outputs.VERSION }}
```
Release 标题使用不带 `v` 的版本号：
- 标签 `v1.0.0` → 标题 `Release 1.0.0` ✅

---

## 📦 自动构建流程

当你推送标签时：

### 触发条件
```bash
git tag v1.0.0
git push origin v1.0.0
```

### 自动执行步骤
1. ✅ 检出代码
2. ✅ 设置 Bun 环境
3. ✅ 安装依赖 (`bun install`)
4. ✅ 构建插件 (`bun run esbuild.config.mjs production`)
5. ✅ 创建归档文件
6. ✅ 获取版本号（去除 v 前缀）
7. ✅ 创建 GitHub Release
8. ✅ 上传附件：
   - `infographic-viz-1.0.0.zip`
   - `manifest.json`
   - `main.js`
   - `styles.css`

---

## 🎯 推送标签的正确方法

### 方法 1：创建并推送标签
```bash
git tag v1.0.0
git push origin v1.0.0
```

### 方法 2：带附注的标签
```bash
git tag -a v1.0.0 -m "Release version 1.0.0"
git push origin v1.0.0
```

### 方法 3：同时推送代码和标签
```bash
git add .
git commit -m "Release v1.0.0"
git tag v1.0.0
git push origin main
git push origin v1.0.0
```

---

## 🔍 监控构建状态

### 1. 查看 Actions 标签页
访问：https://github.com/chinaphp/obsidian-infographic-viz/actions

### 2. 查看工作流运行
- 点击 "Release Plugin" 工作流
- 查看运行状态（成功/失败）
- 查看日志输出

### 3. 查看 Releases
访问：https://github.com/chinaphp/obsidian-infographic-viz/releases

---

## ⚠️ 注意事项

### 1. 标签格式必须匹配
- ✅ `v1.0.0` - 匹配
- ✅ `v1.1.0` - 匹配
- ✅ `v2.0.0` - 匹配
- ❌ `v1.0` - 不匹配（需要三位）
- ❌ `release-v1.0.0` - 不匹配
- ✅ `1.0.0` - 匹配
- ✅ `1.1.0` - 匹配

### 2. 版本文件必须正确
推送前确保以下文件版本号正确（不带 v）：
- `manifest.json`: `"version": "1.0.0"`
- `package.json`: `"version": "1.0.0"`
- `versions.json`: `"1.0.0": "0.15.0"`

### 3. GITHUB_TOKEN 权限
工作流需要 `contents: write` 权限才能创建 Release。GitHub Actions 默认提供 `GITHUB_TOKEN`，配置中已设置：
```yaml
permissions:
  contents: write
```

---

## 🐛 故障排除

### 问题：推送标签后没有触发工作流

**原因**：标签格式不匹配

**解决**：
```bash
# 检查标签格式
git tag -l

# 删除错误的标签
git tag -d v1.0.0
git push origin :refs/tags/v1.0.0

# 创建正确格式的标签
git tag v1.0.0
git push origin v1.0.0
```

### 问题：工作流运行失败

**原因**：构建错误或权限问题

**解决**：
1. 查看 Actions 日志
2. 检查是否有构建错误
3. 确认 `manifest.json` 存在
4. 确认 `bun run build` 可以正常运行

### 问题：Release 创建成功但文件名包含 v

**原因**：工作流配置错误（已修复）

**解决**：
- 已在 `release.yml` 中添加 `${VERSION#v}` 去除 v 前缀
- 现在文件名总是 `infographic-viz-1.0.0.zip`

---

## 📊 预期结果

### 推送标签后

**GitHub Actions**：
- 工作流 "Release Plugin" 自动触发
- 运行时间：约 1-2 分钟
- 状态：成功 ✅

**GitHub Releases**：
- 自动创建新 Release
- 标题：`Release 1.0.0`
- 标签：`v1.0.0`
- 附件：`infographic-viz-1.0.0.zip`（343KB）
- 附加文件：`manifest.json`, `main.js`, `styles.css`

---

## 🚀 下一步操作

现在你可以安全地推送代码和标签：

```bash
cd /Users/jack/code/chinaphp/obsidian-infographic-viz

# 添加所有修改
git add .

# 提交
git commit -m "Release 1.0.0 - Initial stable release"

# 创建标签
git tag v1.0.0

# 推送代码
git push origin main

# 推送标签（会触发自动构建）
git push origin v1.0.0
```

推送标签后，访问以下地址查看自动构建：

- **Actions**: https://github.com/chinaphp/obsidian-infographic-viz/actions
- **Releases**: https://github.com/chinaphp/obsidian-infographic-viz/releases

---

**总结**：✅ 是的，推送 v1.0.0 标签后会自动构建和创建 Release！
