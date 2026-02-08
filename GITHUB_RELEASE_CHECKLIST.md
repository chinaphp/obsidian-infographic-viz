# GitHub Release Checklist - Version 1.0.0

## ✅ Pre-Release Tasks

### Documentation
- [x] Update README.md
  - [x] Add BRAT installation instructions
  - [x] Add installation methods (BRAT, Manual, Source)
  - [x] Add usage examples
  - [x] Add template reference
  - [x] Add theme documentation
  - [x] Add export functionality documentation
  - [x] Add syntax reference

- [x] Update CHANGELOG.md
  - [x] Add version 1.0.0 entry
  - [x] List all features
  - [x] Document templates included
  - [x] Document installation methods
  - [x] Document technical details

- [x] Update RELEASE_NOTES.md
  - [x] Write comprehensive release notes
  - [x] Add key features section
  - [x] Add installation instructions
  - [x] Add quick start examples
  - [x] Add comparison with other plugins
  - [x] Add roadmap

- [x] Create .gitignore
  - [x] Ignore node_modules/
  - [x] Ignore build artifacts
  - [x] Ignore temporary files
  - [x] Include documentation files

- [x] Create prepare-release.sh
  - [x] Build plugin
  - [x] Create release package
  - [x] Generate ZIP file

### Version Files
- [x] Update manifest.json
  - [x] Set version to 1.0.0
  - [x] Update description
  - [x] Verify minAppVersion

- [x] Update package.json
  - [x] Set version to 1.0.0
  - [x] Update description
  - [x] Verify dependencies

- [x] Update versions.json
  - [x] Add 1.0.0 entry
  - [x] Clean up old versions

### Build
- [x] Run `bun run build`
  - [x] Verify no errors
  - [x] Verify main.js generated
  - [x] Verify file size (~1.6MB expected)

- [x] Create release package
  - [x] Run `./prepare-release.sh`
  - [x] Verify ZIP created
  - [x] Verify contents correct

## 📦 Release Files

### Files to Upload
```
release/infographic-viz-1.0.0.zip
├── main.js (1.6MB)
├── manifest.json
├── styles.css
├── README.md
├── LICENSE
└── CHANGELOG.md
```

### File Sizes
- main.js: 1.6MB (includes @antv/infographic library)
- manifest.json: 360B
- styles.css: 624B
- README.md: 7.7KB
- LICENSE: 1.1KB
- CHANGELOG.md: 2.5KB
- ZIP total: ~324KB (compressed)

## 🚀 GitHub Release Steps

### 1. Create Release on GitHub
- [ ] Go to [Releases](https://github.com/chinaphp/obsidian-infographic-viz/releases/new)
- [ ] Choose tag: `1.0.0`
- [ ] Title: `Infographic Viz 1.0.0 - Initial Stable Release`
- [ ] Description: Copy content from RELEASE_NOTES.md
- [ ] Attach ZIP: `release/infographic-viz-1.0.0.zip`

### 2. Publish Release
- [ ] Click "Publish release"
- [ ] Verify release appears on releases page
- [ ] Test download link

### 3. Update Repository
- [ ] Create GitHub milestone for v1.0.0 (optional)
- [ ] Pin release to repository (optional)
- [ ] Update repository topics/tags

### 4. Verify Installation
- [ ] Test BRAT installation
  - [ ] Add plugin URL to BRAT
  - [ ] Install successfully
  - [ ] Enable plugin
  - [ ] Test basic functionality

- [ ] Test manual installation
  - [ ] Download ZIP
  - [ ] Extract to plugins folder
  - [ ] Enable plugin
  - [ ] Test all features

## 📝 Post-Release Tasks

### Documentation
- [ ] Update README with release link
- [ ] Create issues template (optional)
- [ ] Create PR template (optional)
- [ ] Add badges to README (optional)

### Community
- [ ] Announce on Obsidian forum (optional)
- [ ] Share on Reddit r/ObsidianMD (optional)
- [ ] Tweet about release (optional)

### Monitoring
- [ ] Watch for issues
- [ ] Respond to questions
- [ ] Collect feedback
- [ ] Plan next version features

## 🎯 Next Version Planning (1.1.0)

### Potential Features
- [ ] Template preview in settings
- [ ] Theme preview functionality
- [ ] Custom export dimensions
- [ ] Batch export functionality
- [ ] Watermark options
- [ ] Performance optimizations

### Bugs to Watch
- [ ] Large file size concerns
- [ ] Initial rendering delay
- [ ] SVG gradient support
- [ ] Mobile responsiveness

## 📞 Support Channels

- [ ] Verify GitHub Issues page
- [ ] Verify GitHub Discussions page
- [ ] Prepare FAQ (optional)
- [ ] Prepare troubleshooting guide (optional)

## 🔍 Final Checks

- [ ] All documentation updated
- [ ] All version files consistent
- [ ] Build successful
- [ ] Release package created
- [ ] Release notes complete
- [ ] Installation tested
- [ ] Export features tested
- [ ] All examples working

---

## ✅ Release Ready!

Once all items in this checklist are completed, the plugin is ready for GitHub release 1.0.0.

**Next Action**: Go to GitHub and create the release!

**Release URL**: https://github.com/chinaphp/obsidian-infographic-viz/releases/new
