#!/bin/bash

# Prepare release files for GitHub

VERSION="1.0.0"
RELEASE_DIR="release"
PLUGIN_NAME="infographic-viz"

echo "Preparing release ${VERSION}..."

# Clean up
rm -rf "${RELEASE_DIR}"
mkdir -p "${RELEASE_DIR}"

# Build
echo "Building plugin..."
bun run build

# Create release package
echo "Creating release package..."
mkdir -p "${RELEASE_DIR}/${PLUGIN_NAME}"
cp main.js manifest.json styles.css README.md LICENSE CHANGELOG.md "${RELEASE_DIR}/${PLUGIN_NAME}/"

# Create ZIP
cd "${RELEASE_DIR}"
zip -r "${PLUGIN_NAME}-${VERSION}.zip" "${PLUGIN_NAME}/"
cd ..

echo ""
echo "✓ Release package created: ${RELEASE_DIR}/${PLUGIN_NAME}-${VERSION}.zip"
echo ""
echo "Files included:"
ls -lh "${RELEASE_DIR}/${PLUGIN_NAME}/"
echo ""
echo "Ready to upload to GitHub Releases!"
