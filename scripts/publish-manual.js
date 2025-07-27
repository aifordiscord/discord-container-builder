#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Manual NPM Publishing Script');

try {
  // Check if user is logged in to NPM
  console.log('🔐 Checking NPM authentication...');
  try {
    const whoami = execSync('npm whoami', { encoding: 'utf8' }).trim();
    console.log(`✅ Logged in as: ${whoami}`);
  } catch (error) {
    console.error('❌ Not logged in to NPM. Run: npm login');
    process.exit(1);
  }
  
  // Read package.json to get current version
  const packagePath = path.join(process.cwd(), 'package.json');
  const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
  const currentVersion = packageJson.version;
  
  console.log(`📦 Current version: ${currentVersion}`);
  
  // Check if this version already exists on NPM
  console.log('🔍 Checking if version exists on NPM...');
  try {
    execSync(`npm view ${packageJson.name}@${currentVersion}`, { stdio: 'pipe' });
    console.error(`❌ Version ${currentVersion} already exists on NPM`);
    console.error('Update the version in package.json or run: npm version patch');
    process.exit(1);
  } catch (error) {
    console.log('✅ Version available for publishing');
  }
  
  // Run pre-publish checks
  console.log('📋 Running pre-publish checks...');
  
  // Run tests
  console.log('🧪 Running tests...');
  execSync('npm test', { stdio: 'inherit' });
  
  // Run linting
  console.log('🔍 Running linting...');
  execSync('npm run lint', { stdio: 'inherit' });
  
  // Build the package
  console.log('🔨 Building package...');
  execSync('npm run build', { stdio: 'inherit' });
  
  // Check if dist folder exists
  const distPath = path.join(process.cwd(), 'dist');
  if (!fs.existsSync(distPath)) {
    console.error('❌ dist folder not found. Build may have failed.');
    process.exit(1);
  }
  
  // Show what will be published
  console.log('📋 Files to be published:');
  execSync('npm pack --dry-run', { stdio: 'inherit' });
  
  // Confirm publication
  const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  });
  
  readline.question(`\n❓ Publish ${packageJson.name}@${currentVersion} to NPM? (y/N): `, (answer) => {
    readline.close();
    
    if (answer.toLowerCase() !== 'y' && answer.toLowerCase() !== 'yes') {
      console.log('❌ Publication cancelled');
      process.exit(0);
    }
    
    // Publish to NPM
    console.log('🚀 Publishing to NPM...');
    try {
      execSync('npm publish', { stdio: 'inherit' });
      console.log('✅ Successfully published to NPM!');
      console.log(`🔗 Package URL: https://www.npmjs.com/package/${packageJson.name}`);
      
      // Create git tag if not exists
      try {
        execSync(`git tag v${currentVersion}`, { stdio: 'pipe' });
        console.log(`✅ Created git tag: v${currentVersion}`);
        console.log('💡 Push the tag with: git push --tags');
      } catch (error) {
        console.log('⚠️  Git tag may already exist');
      }
      
    } catch (error) {
      console.error('❌ NPM publish failed:', error.message);
      process.exit(1);
    }
  });
  
} catch (error) {
  console.error('❌ Manual publish failed:', error.message);
  process.exit(1);
}