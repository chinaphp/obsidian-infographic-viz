# 本地开发调试指南

## 快速测试流程

### 1. 修改代码
编辑 `src/` 目录下的文件

### 2. 构建并复制到本地 Obsidian
```bash
# 一键构建 + 复制
bun run copy
```

### 3. 重启 Obsidian
在 Obsidian 中：
- Windows/Linux: `Ctrl+R`
- macOS: `Cmd+R`

或直接关闭并重启 Obsidian

---

## 其他命令

```bash
# 仅构建（不复制）
bun run build

# 监听模式（开发时自动重新构建）
bun run watch

# 代码检查
bun run lint

# 类型检查
bun run type-check
```

---

## 插件位置
```
~/ObsidianZ/.obsidian/plugins/infographic-viz/
```

复制到本地的文件：
- `main.js` - 构建后的插件代码
- `manifest.json` - 插件配置
- `styles.css` - 样式文件
- `README.md` - 说明文档
- `LICENSE` - 许可证

---

## 开发工作流示例

```bash
# 1. 修改代码
vim src/main.ts

# 2. 构建并复制
bun run copy

# 3. 重启 Obsidian
# 在 Obsidian 中按 Cmd+R (macOS) 或 Ctrl+R (Windows/Linux)

# 4. 测试插件功能
```

---

## 故障排查

### 插件未加载
```bash
# 检查文件是否存在
ls -lh ~/ObsidianZ/.obsidian/plugins/infographic-viz/

# 检查 manifest.json
cat ~/ObsidianZ/.obsidian/plugins/infographic-viz/manifest.json
```

### 构建失败
```bash
# 清理并重新构建
rm -f main.js
bun run build
```

### 查看日志
在 Obsidian 中打开开发者控制台：
- macOS: `Cmd+Shift+I`
- Windows/Linux: `Ctrl+Shift+I`
