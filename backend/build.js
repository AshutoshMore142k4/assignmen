const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🔨 Building backend...');

try {
  // Clean dist directory
  if (fs.existsSync('./dist')) {
    fs.rmSync('./dist', { recursive: true, force: true });
  }

  // Compile TypeScript
  console.log('📦 Compiling TypeScript...');
  execSync('npx tsc', { stdio: 'inherit' });

  // Copy package.json to dist
  console.log('📋 Copying package.json...');
  const packageJson = JSON.parse(fs.readFileSync('./package.json', 'utf8'));
  const distPackageJson = {
    name: packageJson.name,
    version: packageJson.version,
    main: 'index.js',
    type: 'commonjs',
    dependencies: packageJson.dependencies
  };
  fs.writeFileSync('./dist/package.json', JSON.stringify(distPackageJson, null, 2));

  console.log('✅ Build completed successfully!');
} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
} 