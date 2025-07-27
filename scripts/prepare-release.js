#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Get version from command line argument or package.json
const newVersion = process.argv[2];
if (!newVersion) {
  console.error('Usage: node scripts/prepare-release.js <version>');
  console.error('Example: node scripts/prepare-release.js 1.0.1');
  process.exit(1);
}

// Validate version format
const versionRegex = /^\d+\.\d+\.\d+(-[a-zA-Z0-9-.]+)?$/;
if (!versionRegex.test(newVersion)) {
  console.error('Invalid version format. Use semantic versioning (e.g., 1.0.1)');
  process.exit(1);
}

console.log(`🚀 Preparing release v${newVersion}`);

try {
  // Run tests first
  console.log('📋 Running tests...');
  execSync('npm test', { stdio: 'inherit' });
  
  // Run linting
  console.log('🔍 Running linting...');
  execSync('npm run lint', { stdio: 'inherit' });
  
  // Build the package
  console.log('🔨 Building package...');
  execSync('npm run build', { stdio: 'inherit' });
  
  // Update version in package.json
  console.log('📝 Updating version...');
  const packagePath = path.join(process.cwd(), 'package.json');
  const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
  packageJson.version = newVersion;
  fs.writeFileSync(packagePath, JSON.stringify(packageJson, null, 2) + '\n');
  
  // Update changelog
  const changelogPath = path.join(process.cwd(), 'CHANGELOG.md');
  let changelog = '';
  
  if (fs.existsSync(changelogPath)) {
    changelog = fs.readFileSync(changelogPath, 'utf8');
  } else {
    changelog = '# Changelog\n\nAll notable changes to this project will be documented in this file.\n\n';
  }
  
  const today = new Date().toISOString().split('T')[0];
  const newEntry = `## [${newVersion}] - ${today}\n\n### Added\n- New features and improvements\n\n### Changed\n- Updated dependencies and optimizations\n\n### Fixed\n- Bug fixes and stability improvements\n\n`;
  
  // Insert new entry after the header
  const lines = changelog.split('\n');
  const headerEnd = lines.findIndex(line => line.startsWith('## ')) || 3;
  lines.splice(headerEnd, 0, newEntry);
  
  fs.writeFileSync(changelogPath, lines.join('\n'));
  
  // Create git commit and tag
  console.log('📦 Creating git commit and tag...');
  execSync('git add .', { stdio: 'inherit' });
  execSync(`git commit -m "chore: release v${newVersion}"`, { stdio: 'inherit' });
  execSync(`git tag v${newVersion}`, { stdio: 'inherit' });
  
  console.log('✅ Release preparation complete!');
  console.log('');
  console.log('Next steps:');
  console.log('1. Review the changes with: git show');
  console.log('2. Push the changes: git push && git push --tags');
  console.log('3. The GitHub Action will automatically publish to NPM');
  console.log('');
  console.log('Or publish manually with: npm publish');
  
} catch (error) {
  console.error('❌ Release preparation failed:', error.message);
  process.exit(1);
}