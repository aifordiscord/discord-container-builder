const { Client, GatewayIntentBits, ApplicationCommandOptionType } = require('discord.js');
const {
  ContainerBuilder,
  TextDisplayBuilder,
  SeparatorBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  StringSelectMenuBuilder,
  SeparatorSpacingSize,
  MessageFlags,
  EMOJIS,
  BUTTON_STYLES
} = require('discord-container-builder');

const client = new Client({ 
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ] 
});

// Mock data for demonstration
const mockUsers = new Map();
const mockProducts = [
  { id: 'prod_1', name: 'Premium Bot', price: 9.99, category: 'Discord Bots' },
  { id: 'prod_2', name: 'Music Player', price: 14.99, category: 'Entertainment' },
  { id: 'prod_3', name: 'Moderation Suite', price: 19.99, category: 'Security' }
];

client.on('ready', () => {
  console.log(`${client.user.tag} is ready with advanced examples!`);
});

// Example 1: Shopping Cart System
client.on('interactionCreate', async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === 'shop') {
    const container = new ContainerBuilder()
      .addText(`${EMOJIS.SHOPPING_CART} **Discord Bot Store**`)
      .addText("Browse our premium Discord bots and services:")
      .addSeparator({ spacing: SeparatorSpacingSize.Medium, divider: true });

    // Add product listings
    mockProducts.forEach((product, index) => {
      container
        .addText(`**${product.name}** - $${product.price}`)
        .addText(`Category: ${product.category}`)
        .addActionRow((row) => {
          row.addButton((btn) => btn.asPrimary(`add_to_cart_${product.id}`, 'Add to Cart'))
             .addButton((btn) => btn.asSecondary(`view_details_${product.id}`, 'View Details'))
             .addButton((btn) => btn.asLink('https://example.com/demo', 'Try Demo'));
        });
      
      if (index < mockProducts.length - 1) {
        container.addSeparator({ spacing: SeparatorSpacingSize.Small });
      }
    });

    container
      .addSeparator({ spacing: SeparatorSpacingSize.Large, divider: true })
      .addActionRow((row) => {
        row.addButton((btn) => btn.asSuccess('view_cart', 'View Cart'))
           .addButton((btn) => btn.asSecondary('filter_products', 'Filter Products'))
           .addButton((btn) => btn.asLink('https://example.com/support', 'Contact Support'));
      });

    await interaction.reply({
      components: [container.build()],
      flags: MessageFlags.IsComponentsV2,
    });
  }

  // Example 2: Music Player Interface
  if (interaction.commandName === 'music') {
    const container = new ContainerBuilder()
      .addText(`${EMOJIS.MUSICAL_NOTE} **Music Player Dashboard**`)
      .addText("Now Playing: **Never Gonna Give You Up** - Rick Astley")
      .addText(`${EMOJIS.CLOCK} 2:45 / 3:33`)
      .addSeparator({ spacing: SeparatorSpacingSize.Small, divider: true })
      .addActionRow((row) => {
        row.addButton((btn) => btn.asSecondary('previous_track', '⏮️'))
           .addButton((btn) => btn.asPrimary('play_pause', '⏸️'))
           .addButton((btn) => btn.asSecondary('next_track', '⏭️'))
           .addButton((btn) => btn.asSecondary('shuffle', '🔀'))
           .addButton((btn) => btn.asSecondary('repeat', '🔁'));
      })
      .addActionRow((row) => {
        row.addSelectMenu((menu) => {
          menu.setCustomId('volume_control')
              .setPlaceholder('Volume: 75%')
              .addOptions([
                { label: 'Mute', value: 'volume_0', emoji: '🔇' },
                { label: '25%', value: 'volume_25', emoji: '🔈' },
                { label: '50%', value: 'volume_50', emoji: '🔉' },
                { label: '75%', value: 'volume_75', emoji: '🔊' },
                { label: '100%', value: 'volume_100', emoji: '🔊' }
              ]);
        });
      })
      .addActionRow((row) => {
        row.addButton((btn) => btn.asSuccess('add_to_playlist', 'Add to Playlist'))
           .addButton((btn) => btn.asSecondary('view_queue', 'View Queue'))
           .addButton((btn) => btn.asDanger('clear_queue', 'Clear Queue'));
      });

    await interaction.reply({
      components: [container.build()],
      flags: MessageFlags.IsComponentsV2,
    });
  }

  // Example 3: Poll/Voting System
  if (interaction.commandName === 'poll') {
    const question = interaction.options.getString('question') || 'What should we do next?';
    const options = [
      interaction.options.getString('option1') || 'Option 1',
      interaction.options.getString('option2') || 'Option 2',
      interaction.options.getString('option3') || 'Option 3'
    ].filter(Boolean);

    const container = new ContainerBuilder()
      .addText(`${EMOJIS.BALLOT_BOX} **Poll: ${question}**`)
      .addText(`Created by ${interaction.user.displayName || interaction.user.username}`)
      .addSeparator({ spacing: SeparatorSpacingSize.Small, divider: true })
      .addText('Vote for your preferred option:')
      .addSeparator({ spacing: SeparatorSpacingSize.Small });

    // Add voting buttons for each option
    const voteRow = new ActionRowBuilder();
    options.forEach((option, index) => {
      voteRow.addButton((btn) => btn.asPrimary(`vote_${index}`, `${index + 1}. ${option}`));
    });
    container.addActionRowComponents(voteRow.build());

    container
      .addSeparator({ spacing: SeparatorSpacingSize.Medium })
      .addActionRow((row) => {
        row.addButton((btn) => btn.asSecondary('view_results', 'View Results'))
           .addButton((btn) => btn.asDanger('end_poll', 'End Poll'))
           .addButton((btn) => btn.asSecondary('poll_settings', 'Poll Settings'));
      });

    await interaction.reply({
      components: [container.build()],
      flags: MessageFlags.IsComponentsV2,
    });
  }

  // Example 4: Server Management Dashboard
  if (interaction.commandName === 'dashboard') {
    const guild = interaction.guild;
    const container = new ContainerBuilder()
      .addText(`${EMOJIS.SHIELD} **${guild.name} Management Dashboard**`)
      .addText(`Server ID: ${guild.id} • Members: ${guild.memberCount}`)
      .addSeparator({ spacing: SeparatorSpacingSize.Medium, divider: true })
      .addText(`${EMOJIS.CHART} **Quick Stats:**`)
      .addText(`Online Members: ${guild.members.cache.filter(m => m.presence?.status === 'online').size || 'N/A'}`)
      .addText(`Text Channels: ${guild.channels.cache.filter(c => c.type === 0).size}`)
      .addText(`Voice Channels: ${guild.channels.cache.filter(c => c.type === 2).size}`)
      .addSeparator({ spacing: SeparatorSpacingSize.Small, divider: true })
      .addActionRow((row) => {
        row.addSelectMenu((menu) => {
          menu.setCustomId('dashboard_section')
              .setPlaceholder('Select management section...')
              .addOptions([
                { label: 'Member Management', value: 'members', emoji: '👥' },
                { label: 'Channel Management', value: 'channels', emoji: '📝' },
                { label: 'Role Management', value: 'roles', emoji: '🎭' },
                { label: 'Moderation Logs', value: 'moderation', emoji: '🛡️' },
                { label: 'Server Analytics', value: 'analytics', emoji: '📊' }
              ]);
        });
      })
      .addActionRow((row) => {
        row.addButton((btn) => btn.asPrimary('quick_setup', 'Quick Setup'))
           .addButton((btn) => btn.asSecondary('backup_server', 'Backup Settings'))
           .addButton((btn) => btn.asDanger('emergency_lockdown', 'Emergency Lockdown'));
      });

    await interaction.reply({
      components: [container.build()],
      flags: MessageFlags.IsComponentsV2,
    });
  }
});

// Complex button interaction handling
client.on('interactionCreate', async (interaction) => {
  if (!interaction.isButton()) return;

  // Shopping cart system
  if (interaction.customId.startsWith('add_to_cart_')) {
    const productId = interaction.customId.replace('add_to_cart_', '');
    const product = mockProducts.find(p => p.id === productId);
    
    if (!mockUsers.has(interaction.user.id)) {
      mockUsers.set(interaction.user.id, { cart: [], favorites: [] });
    }
    
    const userData = mockUsers.get(interaction.user.id);
    userData.cart.push(product);

    const container = new ContainerBuilder()
      .addText(`${EMOJIS.SUCCESS} **Added to Cart!**`)
      .addText(`**${product.name}** has been added to your cart.`)
      .addSeparator({ spacing: SeparatorSpacingSize.Small, divider: true })
      .addText(`${EMOJIS.SHOPPING_CART} Cart Items: ${userData.cart.length}`)
      .addText(`${EMOJIS.MONEY_BAG} Total: $${userData.cart.reduce((sum, p) => sum + p.price, 0).toFixed(2)}`)
      .addActionRow((row) => {
        row.addButton((btn) => btn.asPrimary('view_cart', 'View Cart'))
           .addButton((btn) => btn.asSuccess('checkout', 'Checkout'))
           .addButton((btn) => btn.asSecondary('continue_shopping', 'Continue Shopping'));
      });

    await interaction.update({
      components: [container.build()],
      flags: MessageFlags.IsComponentsV2,
    });
  }

  // Music player controls
  if (interaction.customId === 'play_pause') {
    const isPlaying = Math.random() > 0.5; // Mock state
    const container = new ContainerBuilder()
      .addText(`${EMOJIS.MUSICAL_NOTE} **Music Player Dashboard**`)
      .addText(`Now Playing: **Never Gonna Give You Up** - Rick Astley`)
      .addText(`${EMOJIS.CLOCK} 2:45 / 3:33 ${isPlaying ? '⏸️ Paused' : '▶️ Playing'}`)
      .addSeparator({ spacing: SeparatorSpacingSize.Small, divider: true })
      .addActionRow((row) => {
        row.addButton((btn) => btn.asSecondary('previous_track', '⏮️'))
           .addButton((btn) => btn.asPrimary('play_pause', isPlaying ? '▶️' : '⏸️'))
           .addButton((btn) => btn.asSecondary('next_track', '⏭️'))
           .addButton((btn) => btn.asSecondary('shuffle', '🔀'))
           .addButton((btn) => btn.asSecondary('repeat', '🔁'));
      })
      .addActionRow((row) => {
        row.addButton((btn) => btn.asSuccess('add_to_playlist', 'Add to Playlist'))
           .addButton((btn) => btn.asSecondary('view_queue', 'View Queue'))
           .addButton((btn) => btn.asDanger('clear_queue', 'Clear Queue'));
      });

    await interaction.update({
      components: [container.build()],
      flags: MessageFlags.IsComponentsV2,
    });
  }

  // Poll voting
  if (interaction.customId.startsWith('vote_')) {
    const optionIndex = parseInt(interaction.customId.replace('vote_', ''));
    const container = new ContainerBuilder()
      .addText(`${EMOJIS.SUCCESS} **Vote Recorded!**`)
      .addText(`You voted for option ${optionIndex + 1}`)
      .addSeparator({ spacing: SeparatorSpacingSize.Small, divider: true })
      .addText(`${EMOJIS.CHART} **Current Results:**`)
      .addText('Option 1: ████████░░ 45%')
      .addText('Option 2: ██████░░░░ 30%')
      .addText('Option 3: █████░░░░░ 25%')
      .addSeparator({ spacing: SeparatorSpacingSize.Small })
      .addText(`Total votes: 127`)
      .addActionRow((row) => {
        row.addButton((btn) => btn.asSecondary('change_vote', 'Change Vote'))
           .addButton((btn) => btn.asPrimary('share_poll', 'Share Poll'))
           .addButton((btn) => btn.asSecondary('poll_details', 'Poll Details'));
      });

    await interaction.update({
      components: [container.build()],
      flags: MessageFlags.IsComponentsV2,
    });
  }
});

// Select menu interaction handling
client.on('interactionCreate', async (interaction) => {
  if (!interaction.isStringSelectMenu()) return;

  if (interaction.customId === 'dashboard_section') {
    const section = interaction.values[0];
    const sectionData = {
      members: {
        title: 'Member Management',
        emoji: '👥',
        stats: 'Active: 1,234 • New Today: 45 • Banned: 12'
      },
      channels: {
        title: 'Channel Management', 
        emoji: '📝',
        stats: 'Text: 25 • Voice: 8 • Categories: 5'
      },
      roles: {
        title: 'Role Management',
        emoji: '🎭', 
        stats: 'Total Roles: 15 • Hoisted: 8 • Mentionable: 6'
      }
    };

    const data = sectionData[section] || sectionData.members;
    
    const container = new ContainerBuilder()
      .addText(`${data.emoji} **${data.title}**`)
      .addText(`Server: ${interaction.guild.name}`)
      .addSeparator({ spacing: SeparatorSpacingSize.Small, divider: true })
      .addText(`${EMOJIS.CHART} **Statistics:**`)
      .addText(data.stats)
      .addSeparator({ spacing: SeparatorSpacingSize.Medium })
      .addActionRow((row) => {
        row.addButton((btn) => btn.asPrimary(`manage_${section}`, 'Manage'))
           .addButton((btn) => btn.asSecondary(`view_${section}`, 'View All'))
           .addButton((btn) => btn.asSecondary(`export_${section}`, 'Export Data'));
      })
      .addActionRow((row) => {
        row.addButton((btn) => btn.asSecondary('back_to_dashboard', 'Back to Dashboard'))
           .addButton((btn) => btn.asLink('https://example.com/docs', 'Documentation'));
      });

    await interaction.update({
      components: [container.build()],
      flags: MessageFlags.IsComponentsV2,
    });
  }

  if (interaction.customId === 'volume_control') {
    const volume = interaction.values[0].replace('volume_', '');
    const container = new ContainerBuilder()
      .addText(`${EMOJIS.MUSICAL_NOTE} **Music Player Dashboard**`)
      .addText("Now Playing: **Never Gonna Give You Up** - Rick Astley")
      .addText(`${EMOJIS.CLOCK} 2:45 / 3:33 • Volume: ${volume}%`)
      .addSeparator({ spacing: SeparatorSpacingSize.Small, divider: true })
      .addText(`${EMOJIS.SUCCESS} Volume updated to ${volume}%`)
      .addActionRow((row) => {
        row.addButton((btn) => btn.asSecondary('previous_track', '⏮️'))
           .addButton((btn) => btn.asPrimary('play_pause', '⏸️'))
           .addButton((btn) => btn.asSecondary('next_track', '⏭️'))
           .addButton((btn) => btn.asSecondary('shuffle', '🔀'))
           .addButton((btn) => btn.asSecondary('repeat', '🔁'));
      });

    await interaction.update({
      components: [container.build()],
      flags: MessageFlags.IsComponentsV2,
    });
  }
});

client.login(process.env.DISCORD_TOKEN);