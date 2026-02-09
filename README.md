# Infographic Viz for Obsidian

[![Release](https://img.shields.io/github/v/release/chinaphp/obsidian-infographic-viz?display_name=tag&style=flat-square)](https://github.com/chinaphp/obsidian-infographic-viz/releases)
[![License](https://img.shields.io/github/license/chinaphp/obsidian-infographic-viz?style=flat-square)](LICENSE)

Create beautiful infographic visualizations in Obsidian with official [@antv/infographic](https://github.com/antvis/Infographic) engine. Supports 200+ templates and themes with PNG/SVG export functionality.

## ✨ Features

- 🎨 **200+ Official Templates** - Powered by @antv/infographic
- 🎭 **200+ Themes** - Choose from all AntV official themes
- 📤 **Export to PNG/SVG** - Right-click to export or copy to clipboard
- ✏️ **Editable Mode** - Double-click to edit infographic elements
- 🌓 **Dark/Light Theme** - Automatic theme detection
- 📱 **Responsive** - Works on desktop and mobile
- 🔄 **Live Preview** - Real-time rendering in edit mode

## 📦 Installation

### Method 1: BRAT Plugin (Recommended)

1. Install the [BRAT (Beta Tester's Auto-update Tool)](https://github.com/TfTHacker/obsidian42-brat) plugin from Community Plugins
2. Open BRAT settings
3. Click "Add a beta plugin"
4. Enter the repository URL:
   ```
   https://github.com/chinaphp/obsidian-infographic-viz
   ```
5. Click "Add Plugin"
6. Enable "Infographic Viz" in Community Plugins

### Method 2: Manual Installation

1. Download the latest release from [GitHub Releases](https://github.com/chinaphp/obsidian-infographic-viz/releases/latest)
2. Extract the files to your Obsidian vault's `.obsidian/plugins/infographic-viz/` directory
3. Enable the plugin in Obsidian settings

### Method 3: From Source

```bash
cd ~/.obsidian/plugins
git clone https://github.com/chinaphp/obsidian-infographic-viz.git
cd obsidian-infographic-viz
bun install
bun run build
```

## 🚀 Usage

Create infographics using the `infographic` code block:

````markdown
```infographic
infographic sequence-zigzag-steps-underline-text
data
  title Agile Development Process
  items
    - label Sprint 1
      desc Requirements gathering and user research
    - label Sprint 2
      desc Prototyping and design review
    - label Sprint 3
      desc Core feature development
    - label Sprint 4
      desc Testing and optimization
    - label Sprint 5
      desc Release and iteration
```
````

## 🎯 Available Templates

### List Templates
- `list-row-simple-horizontal-arrow` - Horizontal arrow list for step-by-step processes
- `list-grid-badge-card` - Grid layout with badge cards
- `list-grid-compact-card` - Compact grid cards
- `list-column-done-list` - Vertical checklist

### Sequence Templates
- `sequence-steps-simple` - Simple numbered steps
- `sequence-timeline-simple` - Timeline for roadmaps and events
- `sequence-snake-steps-simple` - Snake-style workflow steps
- `sequence-ascending-steps` - Ascending stair-like steps
- `sequence-zigzag-steps-underline-text` - Zigzag steps with underline decoration

### Hierarchy Templates
- `hierarchy-tree-curved-line-rounded-rect-node` - Tree hierarchy with curved lines
- `hierarchy-mindmap-curved-line-compact-card` - Mind map style hierarchy

### Chart Templates
- `chart-pie-plain-text` - Pie chart for proportions
- `chart-bar-plain-text` - Horizontal bar chart
- `chart-column-simple` - Vertical column chart

### Compare Templates
- `compare-swot` - SWOT analysis layout
- `compare-binary-horizontal-simple-fold` - Binary comparison

### Quadrant Templates
- `quadrant-quarter-simple-card` - Four quadrant layout

> **Note**: This plugin includes 200+ templates from @antv/infographic. Check the [official documentation](https://github.com/antvis/Infographic) for the complete list.

## 🎨 Themes

Choose from 200+ official AntV themes in plugin settings:

1. Go to Settings → Community Plugins → Infographic Viz
2. Select "Default Theme"
3. Choose from available themes or leave empty for default

Popular themes include:
- `antv` - AntV standard theme
- `catppuccin` - Catppuccin theme
- `github` - GitHub theme
- `dracula` - Dracula theme
- `nord` - Nord theme

## 📤 Export

Right-click on any infographic to access export options:

1. **Copy to Clipboard (PNG)** - Copy PNG image to clipboard for pasting into other apps
2. **Export as PNG** - Download infographic as PNG file (high resolution 2x scale)
3. **Export as SVG** - Download infographic as SVG vector file (editable in Figma/Illustrator)
4. **Copy Source Code** - Copy infographic source code for reuse

## ⚙️ Settings

### Default Theme
Choose the default theme for all infographics. Leave empty to use AntV default theme.

### Editable Mode
Enable inline editing mode. When enabled, you can double-click infographic elements to edit them directly.

## 📖 Syntax Reference

### Basic Structure

```
infographic <template-name>
data
  title <title-text>
  items
    - label <item-label>
      desc <description>
      value <number-or-text>
      icon <iconify-icon>
      children
        - label <child-label>
```

### Examples

#### Simple Steps

```infographic
infographic sequence-steps-simple
data
  title Getting Started
  items
    - label Step 1
      desc Install dependencies
    - label Step 2
      desc Configure settings
    - label Step 3
      desc Run the application
```

#### Hierarchy Tree

```infographic
infographic hierarchy-tree-curved-line-rounded-rect-node
data
  title Organization Structure
  items
    - label CEO
      children
        - label CTO
          children
            - label Engineering
            - label QA
        - label CFO
          children
            - label Finance
            - label HR
```

#### Pie Chart

```infographic
infographic chart-pie-plain-text
data
  title Market Share 2024
  items
    - label Company A
      value 45
    - label Company B
      value 30
    - label Company C
      value 25
```

#### SWOT Analysis

```infographic
infographic compare-swot
data
  title Project SWOT
  items
    - label Strengths
      desc Experienced team, strong brand
    - label Weaknesses
      desc Limited budget, tight timeline
    - label Opportunities
      desc Growing market, new tech
    - label Threats
      desc Competition, regulations
```

## 🛠️ Development

```bash
# Install dependencies
bun install

# Development mode with hot reload
bun run dev

# Production build
bun run build

# Type check
bun run type-check

# Lint
bun run lint
```

## 📚 Documentation

For more templates and syntax, visit:
- [@antv/infographic Documentation](https://github.com/antvis/Infographic)
- [AntV Official Website](https://antv.antgroup.com/)
- [Infographic Examples](https://infographic.antv.antgroup.com/)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

MIT License - see [LICENSE](LICENSE) for details.

## 🙏 Acknowledgments

- Built with [@antv/infographic](https://github.com/antvis/Infographic)
- Based on [Obsidian Sample Plugin](https://github.com/obsidianmd/obsidian-sample-plugin)

## 📞 Support

If you encounter any issues or have questions:
- Open an issue on [GitHub Issues](https://github.com/chinaphp/obsidian-infographic-viz/issues)
- Check the [GitHub Discussions](https://github.com/chinaphp/obsidian-infographic-viz/discussions)

---

**Made with ❤️ by Coffee**
