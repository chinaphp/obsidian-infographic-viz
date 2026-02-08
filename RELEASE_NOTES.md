# Infographic Viz 1.0.0 Release Notes

## 🎉 Initial Stable Release

We're excited to announce the first stable release of **Infographic Viz** - a powerful Obsidian plugin for creating beautiful infographics using the official [@antv/infographic](https://github.com/antvis/Infographic) engine.

## ✨ Key Features

### 200+ Official Templates
Powered by @antv/infographic, access a vast library of professionally designed templates including:
- **List Templates**: Arrow lists, grid cards, checklists
- **Sequence Templates**: Steps, timelines, zigzag flows
- **Hierarchy Templates**: Trees, mind maps
- **Chart Templates**: Pie charts, bar charts, column charts
- **Compare Templates**: SWOT analysis, binary comparisons
- **Quadrant Templates**: Four-quadrant layouts

### 200+ Themes
Choose from all official AntV themes:
- Default AntV themes
- Popular themes: Catppuccin, GitHub, Dracula, Nord
- Many more available in settings

### Export Functionality
Right-click on any infographic to:
- **Copy to Clipboard (PNG)** - Quick copy for pasting into documents
- **Export as PNG** - Download high-resolution PNG (2x scale)
- **Export as SVG** - Download editable vector files
- **Copy Source Code** - Reuse infographic code in other notes

### Editable Mode
Enable inline editing to:
- Double-click infographic elements to edit
- Make real-time changes
- See updates instantly

## 📦 Installation

### Method 1: BRAT Plugin (Recommended)
1. Install [BRAT](https://github.com/TfTHacker/obsidian42-brat) from Community Plugins
2. Open BRAT settings
3. Click "Add a beta plugin"
4. Enter: `https://github.com/chinaphp/obsidian-infographic-viz`
5. Click "Add Plugin"
6. Enable "Infographic Viz" in Community Plugins

### Method 2: Manual Download
1. Download [infographic-viz-1.0.0.zip](https://github.com/chinaphp/obsidian-infographic-viz/releases/download/1.0.0/infographic-viz-1.0.0.zip)
2. Extract to `.obsidian/plugins/infographic-viz/`
3. Enable plugin in Obsidian settings

### Method 3: From Source
```bash
cd ~/.obsidian/plugins
git clone https://github.com/chinaphp/obsidian-infographic-viz.git
cd obsidian-infographic-viz
bun install
bun run build
```

## 📝 Quick Start

Create your first infographic:

````markdown
```infographic
infographic sequence-zigzag-steps-underline-text
data
  title My First Infographic
  items
    - label Step 1
      desc Get started
    - label Step 2
      desc Customize
    - label Step 3
      desc Export
```
````

## 🎯 Example Templates

### Simple Steps
```infographic
infographic sequence-steps-simple
data
  title Getting Started
  items
    - label Install
      desc Download and install plugin
    - label Create
      desc Use infographic code blocks
    - label Export
      desc Right-click to export
```

### Hierarchy Tree
```infographic
infographic hierarchy-tree-curved-line-rounded-rect-node
data
  title Organization
  items
    - label CEO
      children
        - label CTO
          children
            - label Engineering
            - label QA
```

### Pie Chart
```infographic
infographic chart-pie-plain-text
data
  title Market Share
  items
    - label Product A
      value 45
    - label Product B
      value 30
    - label Product C
      value 25
```

## ⚙️ Settings

Configure your experience in **Settings → Community Plugins → Infographic Viz**:

1. **Default Theme** - Choose from 200+ themes or leave empty for default
2. **Editable Mode** - Enable inline editing (double-click to edit)

## 🆚 What Makes Infographic Viz Different?

| Feature | Other Plugins | Infographic Viz |
|---------|---------------|------------------|
| Templates | Limited | **200+ official** |
| Themes | Custom only | **200+ official** |
| Updates | Manual | **Official @antv updates** |
| Engine | Custom DOM | **@antv/infographic** |
| Export | Basic | **PNG/SVG + Clipboard** |
| Editable | No | **Yes** |

## 📚 Documentation

- **[Full README](https://github.com/chinaphp/obsidian-infographic-viz/blob/main/README.md)**
- [@antv/infographic Documentation](https://github.com/antvis/Infographic)
- [AntV Official Website](https://antv.antgroup.com/)
- [Template Examples](https://infographic.antv.antgroup.com/)

## 🐛 Known Issues

- Plugin file size is ~1.6MB due to bundled @antv/infographic library
- Initial rendering may have slight delay on slower devices
- SVG export doesn't support some gradient effects

## 🚀 Roadmap

### Planned for Future Releases
- [ ] Template preview in settings
- [ ] Theme preview functionality
- [ ] Custom export dimensions
- [ ] Batch export multiple infographics
- [ ] Watermark options for exports
- [ ] Performance optimizations
- [ ] More template categories
- [ ] Custom template support

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest features
- Submit pull requests
- Improve documentation

## 📞 Support

- **[GitHub Issues](https://github.com/chinaphp/obsidian-infographic-viz/issues)** - Bug reports and feature requests
- **[GitHub Discussions](https://github.com/chinaphp/obsidian-infographic-viz/discussions)** - Questions and discussions
- **[Documentation](https://github.com/chinaphp/obsidian-infographic-viz/blob/main/README.md)** - Usage guides and examples

## 🙏 Acknowledgments

- Powered by [@antv/infographic](https://github.com/antvis/Infographic) engine
- Built with [Obsidian Plugin API](https://docs.obsidian.md/Plugins/Getting+started/Build+a+plugin)

## 📄 License

MIT License - See [LICENSE](https://github.com/chinaphp/obsidian-infographic-viz/blob/main/LICENSE) for details.

---

## 🎊 Thank You!

Thank you for trying Infographic Viz! We hope this plugin helps you create beautiful infographics and visualizations in Obsidian.

Please consider:
- ⭐ **Starring** the repository on GitHub
- 🐛 **Reporting** issues you encounter
- 💡 **Sharing** your use cases and suggestions
- 📝 **Contributing** to make the plugin better

**Happy Infographic Creating! 🎨**

---

**Version**: 1.0.0  
**Release Date**: February 9, 2026  
**Author**: Coffee
