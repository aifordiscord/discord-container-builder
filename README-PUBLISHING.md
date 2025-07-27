# Publishing Guide

This guide explains how to publish the discord-container-builder package to NPM using the automated workflows.

## Prerequisites

1. **NPM Account**: Create an account at [npmjs.com](https://www.npmjs.com)
2. **NPM Token**: Generate an automation token from your NPM account settings
3. **GitHub Repository**: Set up the repository at https://github.com/aifordiscord/discord-container-builder
4. **GitHub Secrets**: Add your NPM token to GitHub secrets

## Setup GitHub Secrets

1. Go to your GitHub repository settings
2. Navigate to "Secrets and variables" → "Actions"
3. Add the following secrets:
   - `NPM_TOKEN`: Your NPM automation token

## Publishing Methods

### Method 1: Automatic Publishing (Recommended)

1. **Prepare a release:**
   ```bash
   node scripts/prepare-release.js 1.0.0
   ```

2. **Push to GitHub:**
   ```bash
   git push && git push --tags
   ```

3. **GitHub Actions will automatically:**
   - Run tests and linting
   - Build the package
   - Publish to NPM
   - Create a GitHub release

### Method 2: Manual Trigger via GitHub

1. Go to your GitHub repository
2. Navigate to "Actions" tab
3. Select "Publish to NPM" workflow
4. Click "Run workflow"
5. Enter the version number (e.g., 1.0.0)
6. Click "Run workflow"

### Method 3: Manual Publishing

1. **Run the manual publish script:**
   ```bash
   node scripts/publish-manual.js
   ```

2. **Or publish directly:**
   ```bash
   npm login
   npm run build
   npm test
   npm publish
   ```

## Workflow Details

### CI Workflow (`.github/workflows/ci.yml`)
- Runs on every push and pull request
- Tests against Node.js 16, 18, and 20
- Performs linting, testing, and security audits
- Checks TypeScript types and package size

### Publish Workflow (`.github/workflows/publish.yml`)
- Triggers on git tags or manual dispatch
- Runs comprehensive tests before publishing
- Publishes to NPM with authentication
- Creates GitHub releases automatically

## Version Management

### Semantic Versioning
- **Major (1.0.0)**: Breaking changes
- **Minor (1.1.0)**: New features, backward compatible
- **Patch (1.0.1)**: Bug fixes, backward compatible

### Updating Versions
```bash
# Patch version (1.0.0 → 1.0.1)
npm version patch

# Minor version (1.0.0 → 1.1.0)
npm version minor

# Major version (1.0.0 → 2.0.0)
npm version major
```

## Pre-publish Checklist

- [ ] All tests passing (`npm test`)
- [ ] Linting passes (`npm run lint`)
- [ ] Build successful (`npm run build`)
- [ ] Documentation updated
- [ ] Changelog updated
- [ ] Version number incremented
- [ ] GitHub secrets configured

## Troubleshooting

### Common Issues

1. **NPM Authentication Failed**
   - Verify NPM_TOKEN is correct
   - Check token permissions (needs publish access)

2. **Version Already Exists**
   - Update version in package.json
   - Use `npm version patch/minor/major`

3. **Tests Failing**
   - Fix failing tests before publishing
   - Check TypeScript compilation errors

4. **Build Errors**
   - Ensure all dependencies are installed
   - Check Rollup configuration

### Getting Help

- Check GitHub Actions logs for detailed error messages
- Verify package.json configuration
- Test locally before pushing to GitHub

## Post-Publishing

After successful publication:

1. **Verify on NPM**: Check https://www.npmjs.com/package/discord-container-builder
2. **Test Installation**: `npm install discord-container-builder`
3. **Update Documentation**: Ensure README reflects latest version
4. **Announce Release**: Share in Discord communities and social media

## Security

- Never commit NPM tokens to the repository
- Use GitHub secrets for sensitive information
- Regularly rotate NPM tokens
- Enable 2FA on your NPM account