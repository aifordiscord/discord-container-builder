const { Client, GatewayIntentBits } = require('discord.js');
const {
  ContainerBuilder,
  SeparatorSpacingSize,
  MessageFlags,
  EMOJIS,
  BUTTON_STYLES
} = require('discord-container-builder');

const client = new Client({ 
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages] 
});

client.on('ready', () => {
  console.log(`${client.user.tag} is ready!`);
});

// Example 1: Simple Plan Selector
client.on('interactionCreate', async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === 'plans') {
    const container = new ContainerBuilder()
      .addText(`${EMOJIS.CROWN} **Premium Plan Selector**`)
      .addText("Choose the perfect plan for your needs:")
      .addSeparator({ spacing: SeparatorSpacingSize.Small, divider: true })
      .addActionRow((row) => {
        row.addButton((btn) => btn.asPrimary("plan_basic", "💳 Basic Plan"))
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

  // Example 2: User Profile Card
  if (interaction.commandName === 'profile') {
    const user = interaction.user;
    const container = new ContainerBuilder()
      .addText(`${EMOJIS.USER} **${user.displayName || user.username}**`)
      .addText(`${EMOJIS.ID} ID: ${user.id}`)
      .addText(`${EMOJIS.CALENDAR} Joined: <t:${Math.floor(user.createdAt.getTime() / 1000)}:D>`)
      .addSeparator({ divider: true })
      .addText(`${EMOJIS.TROPHY} **Account Status:** Verified User`)
      .addActionRow((row) => {
        row.addButton((btn) => btn.asPrimary('view_full_profile', 'View Full Profile'))
           .addButton((btn) => btn.asSecondary('send_message', 'Send Message'))
           .addButton((btn) => btn.asDanger('report_user', 'Report'));
      });

    await interaction.reply({
      components: [container.build()],
      flags: MessageFlags.IsComponentsV2,
      ephemeral: true
    });
  }

  // Example 3: Server Settings Panel
  if (interaction.commandName === 'settings') {
    const container = new ContainerBuilder()
      .addText(`${EMOJIS.GEAR} **Server Settings Panel**`)
      .addText("Configure your server preferences below:")
      .addSeparator({ spacing: SeparatorSpacingSize.Medium, divider: true })
      .addActionRow((row) => {
        row.addSelectMenu((menu) => {
          menu.setCustomId("settings_category")
              .setPlaceholder("Select settings category...")
              .addOptions([
                { label: "General Settings", value: "general", emoji: "⚙️" },
                { label: "Moderation", value: "moderation", emoji: "🛡️" },
                { label: "Roles & Permissions", value: "roles", emoji: "👥" },
                { label: "Channels", value: "channels", emoji: "📝" },
                { label: "Bots & Integrations", value: "bots", emoji: "🤖" }
              ]);
        });
      })
      .addSeparator({ spacing: SeparatorSpacingSize.Small })
      .addActionRow((row) => {
        row.addButton((btn) => btn.asSuccess('save_settings', 'Save Changes'))
           .addButton((btn) => btn.asSecondary('reset_settings', 'Reset to Default'))
           .addButton((btn) => btn.asDanger('export_settings', 'Export Config'));
      });

    await interaction.reply({
      components: [container.build()],
      flags: MessageFlags.IsComponentsV2,
    });
  }
});

// Handle button interactions
client.on('interactionCreate', async (interaction) => {
  if (!interaction.isButton()) return;

  const customId = interaction.customId;

  if (customId.startsWith('plan_')) {
    const planType = customId.replace('plan_', '');
    const container = new ContainerBuilder()
      .addText(`${EMOJIS.SUCCESS} **Plan Selected: ${planType.toUpperCase()}**`)
      .addText("Thank you for choosing our service!")
      .addSeparator({ divider: true })
      .addText(`${EMOJIS.INFO} You will receive a confirmation email shortly.`)
      .addActionRow((row) => {
        row.addButton((btn) => btn.asLink('https://example.com/billing', 'Manage Billing'))
           .addButton((btn) => btn.asSecondary('contact_support', 'Contact Support'));
      });

    await interaction.update({
      components: [container.build()],
      flags: MessageFlags.IsComponentsV2,
    });
  }

  if (customId === 'view_full_profile') {
    const user = interaction.user;
    const container = new ContainerBuilder()
      .addText(`${EMOJIS.USER} **Complete Profile: ${user.username}**`)
      .addSeparator({ spacing: SeparatorSpacingSize.Small })
      .addText(`**Username:** ${user.username}`)
      .addText(`**Display Name:** ${user.displayName || 'Not set'}`)
      .addText(`**Account Created:** <t:${Math.floor(user.createdAt.getTime() / 1000)}:F>`)
      .addText(`**Avatar:** ${user.avatar ? 'Custom' : 'Default'}`)
      .addSeparator({ divider: true })
      .addText(`${EMOJIS.SHIELD} **Badges:** ${user.flags?.toArray().join(', ') || 'None'}`)
      .addActionRow((row) => {
        row.addButton((btn) => btn.asSecondary('back_to_profile', 'Back to Profile'))
           .addButton((btn) => btn.asPrimary('download_data', 'Download Data'));
      });

    await interaction.update({
      components: [container.build()],
      flags: MessageFlags.IsComponentsV2,
    });
  }
});

// Handle select menu interactions
client.on('interactionCreate', async (interaction) => {
  if (!interaction.isStringSelectMenu()) return;

  if (interaction.customId === 'plan_features') {
    const selectedFeature = interaction.values[0];
    const features = {
      basic_features: [
        "✅ 5 Projects",
        "✅ 10GB Storage", 
        "✅ Community Support",
        "❌ Priority Support",
        "❌ Advanced Analytics"
      ],
      premium_features: [
        "✅ Unlimited Projects",
        "✅ 100GB Storage",
        "✅ Priority Support", 
        "✅ Advanced Analytics",
        "✅ Custom Integrations"
      ],
      enterprise_features: [
        "✅ Everything in Premium",
        "✅ Unlimited Storage",
        "✅ 24/7 Phone Support",
        "✅ Custom Solutions",
        "✅ Dedicated Account Manager"
      ]
    };

    const container = new ContainerBuilder()
      .addText(`${EMOJIS.LIST} **${selectedFeature.replace('_', ' ').toUpperCase()} COMPARISON**`)
      .addSeparator({ spacing: SeparatorSpacingSize.Small, divider: true })
      .addText(features[selectedFeature].join('\n'))
      .addSeparator({ spacing: SeparatorSpacingSize.Medium })
      .addActionRow((row) => {
        row.addButton((btn) => btn.asPrimary('select_this_plan', 'Select This Plan'))
           .addButton((btn) => btn.asSecondary('compare_all', 'Compare All Plans'))
           .addButton((btn) => btn.asLink('https://example.com/pricing', 'View Pricing'));
      });

    await interaction.update({
      components: [container.build()],
      flags: MessageFlags.IsComponentsV2,
    });
  }

  if (interaction.customId === 'settings_category') {
    const category = interaction.values[0];
    const container = new ContainerBuilder()
      .addText(`${EMOJIS.GEAR} **${category.toUpperCase()} SETTINGS**`)
      .addText(`Configure your ${category} preferences:`)
      .addSeparator({ spacing: SeparatorSpacingSize.Small, divider: true })
      .addText(`${EMOJIS.INFO} Settings for ${category} will be displayed here.`)
      .addActionRow((row) => {
        row.addButton((btn) => btn.asPrimary('edit_' + category, 'Edit Settings'))
           .addButton((btn) => btn.asSecondary('view_' + category, 'View Current'))
           .addButton((btn) => btn.asDanger('reset_' + category, 'Reset Category'));
      })
      .addActionRow((row) => {
        row.addButton((btn) => btn.asSecondary('back_to_main', 'Back to Main Settings'));
      });

    await interaction.update({
      components: [container.build()],
      flags: MessageFlags.IsComponentsV2,
    });
  }
});

client.login(process.env.DISCORD_TOKEN);