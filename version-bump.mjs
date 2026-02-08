import fs from 'fs';

// 读取 package.json
const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
const version = pkg.version;

// 更新 manifest.json
const manifest = JSON.parse(fs.readFileSync('manifest.json', 'utf8'));
manifest.version = version;
fs.writeFileSync('manifest.json', JSON.stringify(manifest, null, 2));

// 更新 versions.json
const versions = JSON.parse(fs.readFileSync('versions.json', 'utf8'));
versions[version] = manifest.minAppVersion;
fs.writeFileSync('versions.json', JSON.stringify(versions, null, 2));

console.log(`Updated to version ${version}`);
