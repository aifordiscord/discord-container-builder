# discord-container-builder

A simplified, developer-friendly API for Discord.js v2 Components that reduces boilerplate and improves code readability.

[![npm version](https://badge.fury.io/js/discord-container-builder.svg)](https://badge.fury.io/js/discord-container-builder)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Features

- 🚀 **Simplified API** - Cleaner, more intuitive method names and patterns
- ⛓️ **Chainable Methods** - Fluent interface for building components
- 📝 **TypeScript Support** - Full type definitions included
- 🔧 **Helper Methods** - Shortcuts for common component patterns
- 🎨 **Rich Utilities** - Built-in emojis, button styles, and constants
- ✅ **Fully Compatible** - Works seamlessly with Discord.js v2 Components
- 📚 **Well Documented** - Comprehensive examples and API documentation

## Installation

```bash
npm install discord-container-builder discord.js
```

## Quick Comparison

### Before (Discord.js v2 Components)
```javascript
const container = new ContainerBuilder()
  .addTextDisplayComponents(
    new TextDisplayBuilder().setContent("**📋 Plan Selector**\nChoose a plan below:")
  )
  .addSeparatorComponents(
    new SeparatorBuilder()
      .setSpacing(SeparatorSpacingSize.Small)
      .setDivider(true)
  )
  .addActionRowComponents(
    new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId("plan_basic")
        .setLabel("Basic")
        .setStyle(ButtonStyle.Primary),
      new ButtonBuilder()
        .setCustomId("plan_premium")
        .setLabel("Premium")
        .setStyle(ButtonStyle.Success)
    )
  );
```

### After (discord-container-builder)
```javascript
const container = new ContainerBuilder()
  .addText("**📋 Plan Selector**\nChoose a plan below:")
  .addSeparator({ spacing: SeparatorSpacingSize.Small, divider: true })
  .addActionRow((row) => {
    row.addButton((btn) => btn.asPrimary("plan_basic", "Basic"))
       .addButton((btn) => btn.asSuccess("plan_premium", "Premium"));
  });
```

**Result: 60% less code, much more readable!**

## Basic Usage

### 1. Simple Plan Selector

```javascript
import {
  ContainerBuilder,
  SeparatorSpacingSize,
  MessageFlags,
} from 'discord-container-builder';

// Create a plan selector with simplified API
const container = new ContainerBuilder()
  .addText("**📋 Plan Selector**\nChoose a plan below:")
  .addSeparator({ spacing: SeparatorSpacingSize.Small, divider: true })
  .addActionRow((row) => {
    row.addButton((btn) => btn.asPrimary("plan_basic", "Basic"))
       .addButton((btn) => btn.asSuccess("plan_premium", "Premium"));
  })
  .addActionRow((row) => {
    row.addSelectMenu((menu) => {
      menu.setCustomId("plan_dropdown")
          .setPlaceholder("Select a plan...")
          .addOptions([
            { label: "Basic", value: "basic", description: "Basic Plan" },
            { label: "Premium", value: "premium", description: "Premium Plan" },
          ]);
    });
  });

// Use in Discord.js
await interaction.reply({
  components: [container.build()],
  flags: MessageFlags.IsComponentsV2,
});
```

### 2. User Profile Card

```javascript
import { ContainerBuilder, EMOJIS } from 'discord-container-builder';

function createUserProfile(user) {
  return new ContainerBuilder()
    .addText(`${EMOJIS.USER} **${user.name}**`)
    .addText(`Level ${user.level} • ${user.xp} XP`)
    .addSeparator({ divider: true })
    .addText(`${EMOJIS.TROPHY} **Badges:** ${user.badges.join(' ')}`)
    .addActionRow((row) => {
      row.addButton((btn) => btn.asPrimary('view_profile', 'View Profile'))
         .addButton((btn) => btn.asSecondary('add_friend', 'Add Friend'))
         .addButton((btn) => btn.asDanger('block_user', 'Block'));
    })
    .build();
}
```

## API Reference

### ContainerBuilder

The main builder for creating Discord component containers.

```javascript
const container = new ContainerBuilder()
  .addText("Hello World")                    // Add simple text
  .addSeparator()                           // Add default separator
  .addActionRow((row) => { /* ... */ });    // Add action row with callback
```

**Methods:**
- `addText(content: string)` - Add text display with simple string
- `addSeparator(options?)` - Add separator with optional spacing/divider
- `addActionRow(callback)` - Add action row using callback pattern
- `addTextDisplayComponents(...components)` - Add raw text display components
- `addSeparatorComponents(...components)` - Add raw separator components  
- `addActionRowComponents(...components)` - Add raw action row components
- `build()` - Returns Discord.js ContainerBuilder instance

### TextDisplayBuilder

Builder for text display components with formatting helpers.

```javascript
new TextDisplayBuilder()
  .setContent("Regular text")
  .setBoldContent("Bold text")
  .setItalicContent("Italic text")
  .setCodeContent("Code text")
  .setEmojiContent("🎉", "Celebration!")
  .setLines(["Line 1", "Line 2", "Line 3"]);
```

### SeparatorBuilder

Builder for separator components with spacing shortcuts.

```javascript
new SeparatorBuilder()
  .setSpacing(SeparatorSpacingSize.Small)
  .setDivider(true)
  .asDivider()                    // Quick divider with small spacing
  .asSpacer()                     // Quick spacer without divider
  .setSmallSpacing()              // Convenience method
  .setLargeSpacing();             // Convenience method
```

### ActionRowBuilder

Builder for action rows with component helpers.

```javascript
new ActionRowBuilder()
  .addButton((btn) => btn.asPrimary('id', 'Label'))
  .addSelectMenu((menu) => menu.setCustomId('id').setPlaceholder('...'))
  .addButtons([                   // Add multiple buttons at once
    (btn) => btn.asPrimary('btn1', 'Button 1'),
    (btn) => btn.asSecondary('btn2', 'Button 2')
  ]);
```

### ButtonBuilder

Builder with style shortcuts and common patterns.

```javascript
new ButtonBuilder()
  .asPrimary('id', 'Primary Button')
  .asSecondary('id', 'Secondary Button')
  .asSuccess('id', 'Success Button')
  .asDanger('id', 'Danger Button')
  .asLink('https://example.com', 'Link Button')
  .setEmoji('🎉')
  .setDisabled(true);
```

### StringSelectMenuBuilder

Builder for select menus with option helpers.

```javascript
new StringSelectMenuBuilder()
  .setCustomId('menu_id')
  .setPlaceholder('Choose an option...')
  .addOptions([
    { label: 'Option 1', value: 'opt1', description: 'First option' },
    { label: 'Option 2', value: 'opt2', emoji: '🎉' }
  ])
  .addOption('Option 3', 'opt3', 'Third option', '⭐')
  .setMinValues(1)
  .setMaxValues(3);
```

## Built-in Utilities

### EMOJIS Constant

Pre-defined emoji shortcuts for common use cases:

```javascript
import { EMOJIS } from 'discord-container-builder';

EMOJIS.SUCCESS    // ✅
EMOJIS.ERROR      // ❌
EMOJIS.WARNING    // ⚠️
EMOJIS.USER       // 👤
EMOJIS.TROPHY     // 🏆
EMOJIS.ROCKET     // 🚀
EMOJIS.HEART      // ❤️
// ... and 50+ more
```

### BUTTON_STYLES Constant

Quick access to button styles:

```javascript
import { BUTTON_STYLES } from 'discord-container-builder';

BUTTON_STYLES.PRIMARY     // ButtonStyle.Primary
BUTTON_STYLES.SECONDARY   // ButtonStyle.Secondary
BUTTON_STYLES.SUCCESS     // ButtonStyle.Success
BUTTON_STYLES.DANGER      // ButtonStyle.Danger
BUTTON_STYLES.LINK        // ButtonStyle.Link
```

## Complete Bot Example

```javascript
import { Client, GatewayIntentBits } from 'discord.js';
import {
  ContainerBuilder,
  SeparatorSpacingSize,
  MessageFlags,
  EMOJIS
} from 'discord-container-builder';

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.on('interactionCreate', async (interaction) => {
  if (interaction.isChatInputCommand() && interaction.commandName === 'plan') {
    const container = new ContainerBuilder()
      .addText(`${EMOJIS.CROWN} **Premium Plan Selector**`)
      .addText("Choose the perfect plan for your needs:")
      .addSeparator({ spacing: SeparatorSpacingSize.Small, divider: true })
      .addActionRow((row) => {
        row.addButton((btn) => btn.asPrimary("plan_basic", "💳 Basic"))
           .addButton((btn) => btn.asSuccess("plan_premium", "👑 Premium"))
           .addButton((btn) => btn.asDanger("plan_enterprise", "🏢 Enterprise"));
      })
      .addActionRow((row) => {
        row.addSelectMenu((menu) => {
          menu.setCustomId("plan_features")
              .setPlaceholder("Compare features...")
              .addOptions([
                { label: "Basic Features", value: "basic_features", emoji: "📝" },
                { label: "Premium Features", value: "premium_features", emoji: "⭐" },
                { label: "Enterprise Features", value: "enterprise_features", emoji: "🚀" }
              ]);
        });
      });

    await interaction.reply({
      components: [container.build()],
      flags: MessageFlags.IsComponentsV2,
    });
  }
});

client.login(process.env.DISCORD_TOKEN);
```

## Advanced Examples

Check out the `examples/` directory for more complex use cases:

- **User Profile Cards** - Rich user information displays
- **Settings Panels** - Complex configuration interfaces  
- **Shopping Carts** - Dynamic item management
- **Game Lobbies** - Interactive multiplayer interfaces
- **Music Players** - Media control interfaces
- **Poll Systems** - Interactive voting components

## TypeScript Support

Full TypeScript definitions are included with helpful interfaces:

```typescript
interface SelectOption {
  label: string;
  value: string;
  description?: string;
  emoji?: string;
  default?: boolean;
}

interface SeparatorOptions {
  spacing?: SeparatorSpacingSize;
  divider?: boolean;
}
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Run tests (`npm test`)
4. Commit your changes (`git commit -m 'Add some amazing feature'`)
5. Push to the branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

- 📖 [Documentation](https://github.com/discord-container-builder/discord-container-builder)
- 🐛 [Report Issues](https://github.com/discord-container-builder/discord-container-builder/issues)
- 💬 [Discord Support Server](https://discord.gg/your-server)

---

**Made with ❤️ for the Discord.js community**
