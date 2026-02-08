#!/bin/bash

echo "=== Infographic 插件验证脚本 ==="
echo ""

# 检查必需文件
echo "1. 检查必需文件..."
required_files=("main.js" "manifest.json" "styles.css")
for file in "${required_files[@]}"; do
    if [ -f "$file" ]; then
        size=$(wc -c < "$file")
        echo "✓ $file 存在 ($size 字节)"
    else
        echo "✗ $file 缺失"
    fi
done
echo ""

# 检查 manifest.json 格式
echo "2. 验证 manifest.json..."
if python3 -c "import json; json.load(open('manifest.json'))" 2>/dev/null; then
    echo "✓ manifest.json 格式正确"
    plugin_id=$(python3 -c "import json; print(json.load(open('manifest.json'))['id'])")
    echo "  插件 ID: $plugin_id"
else
    echo "✗ manifest.json 格式错误"
fi
echo ""

# 检查 main.js 导出
echo "3. 检查 main.js 导出..."
if grep -q "module.exports" main.js; then
    echo "✓ main.js 有 module.exports"
else
    echo "✗ main.js 缺少 module.exports"
fi

if grep -q "InfographicPlugin" main.js; then
    echo "✓ main.js 包含 InfographicPlugin 类"
else
    echo "✗ main.js 缺少 InfographicPlugin 类"
fi
echo ""

# 检查语法错误
echo "4. 检查 TypeScript 类型..."
bun run type-check 2>&1
echo ""

echo "=== 验证完成 ==="
echo ""
echo "下一步："
echo "1. 确保文件夹名称与 manifest.json 中的 id 一致: $plugin_id"
echo "2. 将插件文件夹复制到 Obsidian 的 plugins 目录"
echo "3. 在 Obsidian 中启用插件"
echo "4. 查看 Console (Ctrl+Shift+I) 查看错误信息"
