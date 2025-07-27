#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🔧 Fixing ESLint configuration for v9+');

try {
  // Check if new config exists
  const newConfigPath = path.join(process.cwd(), 'eslint.config.js');
  const oldConfigPath = path.join(process.cwd(), '.eslintrc.js');
  
  if (fs.existsSync(newConfigPath)) {
    console.log('✅ New ESLint config (eslint.config.js) already exists');
  } else {
    console.log('❌ New ESLint config not found');
    process.exit(1);
  }
  
  // Try running eslint with the new config
  console.log('🧪 Testing ESLint configuration...');
  try {
    execSync('npx eslint --version', { stdio: 'pipe' });
    const eslintOutput = execSync('npx eslint src/**/*.ts --max-warnings 0', { 
      stdio: 'pipe',
      encoding: 'utf8' 
    });
    console.log('✅ ESLint configuration is working properly');
    
    if (eslintOutput.trim()) {
      console.log('📋 Linting output:');
      console.log(eslintOutput);
    } else {
      console.log('✨ No linting issues found!');
    }
    
  } catch (error) {
    console.log('⚠️  ESLint found some issues or configuration problems');
    console.log('Error output:', error.stdout || error.message);
    
    // Try with legacy config as fallback
    console.log('🔄 Attempting to use legacy ESLint configuration...');
    try {
      execSync('npx eslint -c .eslintrc.js src/**/*.ts --max-warnings 0', { 
        stdio: 'inherit' 
      });
      console.log('✅ Legacy ESLint configuration works');
    } catch (legacyError) {
      console.log('❌ Both ESLint configurations have issues');
      console.log('Consider updating your ESLint setup or temporarily disabling linting');
    }
  }
  
  // Check package.json lint script
  const packagePath = path.join(process.cwd(), 'package.json');
  if (fs.existsSync(packagePath)) {
    const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
    
    if (packageJson.scripts && packageJson.scripts.lint) {
      console.log('📋 Current lint script:', packageJson.scripts.lint);
      
      // Suggest updated lint script
      const suggestedScript = 'eslint src/**/*.ts --max-warnings 0';
      if (packageJson.scripts.lint !== suggestedScript) {
        console.log('💡 Suggested lint script:', suggestedScript);
      }
    }
  }
  
  console.log('');
  console.log('🔧 ESLint Migration Help:');
  console.log('1. Make sure you\'re using the new eslint.config.js format');
  console.log('2. Update your lint script to: "eslint src/**/*.ts --max-warnings 0"');
  console.log('3. Or temporarily disable linting in CI workflows');
  console.log('4. See: https://eslint.org/docs/latest/use/configure/migration-guide');
  
} catch (error) {
  console.error('❌ Failed to fix ESLint configuration:', error.message);
  process.exit(1);
}