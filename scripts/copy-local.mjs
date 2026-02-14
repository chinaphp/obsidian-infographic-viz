import fs from 'fs';
import path from 'path';

const SOURCE_DIR = process.cwd();
const TARGET_DIR = path.join(process.env.HOME, 'ObsidianZ/.obsidian/plugins/infographic-viz');

const filesToCopy = [
    'main.js',
    'manifest.json',
    'styles.css',
    'README.md',
    'LICENSE'
];

console.log('Copying built files to local Obsidian plugin directory...');
console.log(`Source: ${SOURCE_DIR}`);
console.log(`Target: ${TARGET_DIR}`);

// Create target directory if it doesn't exist
if (!fs.existsSync(TARGET_DIR)) {
    fs.mkdirSync(TARGET_DIR, { recursive: true });
}

// Copy files
filesToCopy.forEach(file => {
    const sourcePath = path.join(SOURCE_DIR, file);
    const targetPath = path.join(TARGET_DIR, file);
    
    if (fs.existsSync(sourcePath)) {
        fs.copyFileSync(sourcePath, targetPath);
        console.log(`✓ Copied ${file}`);
    } else {
        console.warn(`✗ ${file} not found`);
    }
});

console.log('\n✓ All files copied successfully!');
console.log(`\nPlugin location: ${TARGET_DIR}`);
console.log('\nRestart Obsidian to load changes.');
