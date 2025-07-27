# Installation Guide

## Package.json Setup

To publish this package to NPM, you'll need to update your `package.json` with the following configuration:

```json
{
  "name": "discord-container-builder",
  "version": "1.0.0",
  "description": "A simplified, developer-friendly API for Discord.js v2 Components that reduces boilerplate and improves code readability.",
  "main": "dist/index.js",
  "module": "dist/index.esm.js",
  "types": "dist/index.d.ts",
  "files": [
    "dist",
    "src",
    "examples",
    "README.md"
  ],
  "scripts": {
    "build": "rollup -c",
    "test": "jest",
    "lint": "eslint src/**/*.ts",
    "format": "prettier --write src/**/*.ts",
    "prepublishOnly": "npm run build && npm test"
  },
  "keywords": [
    "discord",
    "discord.js",
    "components",
    "containers",
    "typescript",
    "builder",
    "ui",
    "bot",
    "interactions"
  ],
  "author": "AI for Discord",
  "license": "MIT",
  "repository": {
    "type": "git",
    "url": "https://github.com/aifordiscord/discord-container-builder.git"
  },
  "homepage": "https://github.com/aifordiscord/discord-container-builder#readme",
  "bugs": {
    "url": "https://github.com/aifordiscord/discord-container-builder/issues"
  },
  "peerDependencies": {
    "discord.js": "^14.0.0"
  }
}
```

## Publishing Steps

1. **Build the package:**
   ```bash
   npm run build
   ```

2. **Run tests:**
   ```bash
   npm test
   ```

3. **Login to NPM:**
   ```bash
   npm login
   ```

4. **Publish:**
   ```bash
   npm publish
   ```

## GitHub Repository Setup

1. Create a new repository at: https://github.com/aifordiscord/discord-container-builder
2. Add the repository URL to package.json (already included in template above)
3. Push your code to the repository
4. Set up GitHub Actions for automated testing and publishing

## Installation for Users

Once published, users can install with:

```bash
npm install discord-container-builder discord.js
```

## Quick Start Script

Save this as `setup.js` to help users get started quickly:

```javascript
const fs = require('fs');
const path = require('path');

// Create a basic bot file
const botCode = `const { Client, GatewayIntentBits } = require('discord.js');
const { ContainerBuilder, EMOJIS } = require('discord-container-builder');

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.on('ready', () => {
  console.log(\`\${client.user.tag} is ready!\`);
});

client.on('interactionCreate', async (interaction) => {
  if (interaction.isChatInputCommand() && interaction.commandName === 'hello') {
    const container = new ContainerBuilder()
      .addText(\`\${EMOJIS.WAVE} **Hello, \${interaction.user.displayName}!**\`)
      .addText('Welcome to discord-container-builder!')
      .addActionRow((row) => {
        row.addButton((btn) => btn.asPrimary('greet', 'Say Hello Back'));
      });

    await interaction.reply({
      components: [container.build()]
    });
  }
});

client.login(process.env.DISCORD_TOKEN);`;

fs.writeFileSync('bot.js', botCode);
console.log('✅ Created bot.js');
console.log('💡 Set your DISCORD_TOKEN environment variable and run: node bot.js');
```