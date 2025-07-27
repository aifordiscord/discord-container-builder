const { Client, GatewayIntentBits } = require('discord.js');
const {
  ContainerBuilder,
  SeparatorSpacingSize,
  MessageFlags,
  EMOJIS
} = require('discord-container-builder');

const client = new Client({ 
  intents: [GatewayIntentBits.Guilds] 
});

// Mock game lobby data
const gameLobbies = new Map();

client.on('ready', () => {
  console.log(`${client.user.tag} Game Lobby System is ready!`);
});

// Example: Game Lobby Management System
client.on('interactionCreate', async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === 'lobby') {
    const action = interaction.options.getString('action') || 'list';

    if (action === 'create') {
      const lobbyId = `lobby_${Date.now()}`;
      const gameName = interaction.options.getString('game') || 'Valorant';
      const maxPlayers = interaction.options.getInteger('max_players') || 5;
      
      gameLobbies.set(lobbyId, {
        id: lobbyId,
        game: gameName,
        host: interaction.user,
        players: [interaction.user],
        maxPlayers: maxPlayers,
        status: 'waiting',
        createdAt: new Date()
      });

      const container = new ContainerBuilder()
        .addText(`${EMOJIS.GAME_DIE} **New Game Lobby Created!**`)
        .addText(`**Game:** ${gameName}`)
        .addText(`**Host:** ${interaction.user.displayName || interaction.user.username}`)
        .addText(`**Players:** 1/${maxPlayers}`)
        .addSeparator({ spacing: SeparatorSpacingSize.Small, divider: true })
        .addText(`${EMOJIS.ID} **Lobby ID:** ${lobbyId}`)
        .addText(`${EMOJIS.CLOCK} **Created:** <t:${Math.floor(Date.now() / 1000)}:R>`)
        .addSeparator({ spacing: SeparatorSpacingSize.Medium })
        .addActionRow((row) => {
          row.addButton((btn) => btn.asPrimary(`join_${lobbyId}`, 'Join Lobby'))
             .addButton((btn) => btn.asSecondary(`spectate_${lobbyId}`, 'Spectate'))
             .addButton((btn) => btn.asDanger(`leave_${lobbyId}`, 'Leave'));
        })
        .addActionRow((row) => {
          row.addSelectMenu((menu) => {
            menu.setCustomId(`lobby_settings_${lobbyId}`)
                .setPlaceholder('Lobby Settings...')
                .addOptions([
                  { label: 'Change Game', value: 'change_game', emoji: '🎮' },
                  { label: 'Set Max Players', value: 'set_max_players', emoji: '👥' },
                  { label: 'Invite Friends', value: 'invite_friends', emoji: '📨' },
                  { label: 'Start Game', value: 'start_game', emoji: '🚀' }
                ]);
          });
        });

      await interaction.reply({
        components: [container.build()],
        flags: MessageFlags.IsComponentsV2,
      });
    }

    if (action === 'list') {
      const container = new ContainerBuilder()
        .addText(`${EMOJIS.LIST} **Active Game Lobbies**`)
        .addText(`Found ${gameLobbies.size} active lobbies`)
        .addSeparator({ spacing: SeparatorSpacingSize.Small, divider: true });

      if (gameLobbies.size === 0) {
        container
          .addText(`${EMOJIS.INFO} No active lobbies found.`)
          .addText('Create a new lobby to get started!')
          .addActionRow((row) => {
            row.addButton((btn) => btn.asPrimary('create_lobby', 'Create Lobby'))
               .addButton((btn) => btn.asSecondary('refresh_lobbies', 'Refresh'));
          });
      } else {
        // Display each lobby
        Array.from(gameLobbies.values()).forEach((lobby, index) => {
          const statusEmoji = lobby.status === 'waiting' ? '🟡' : lobby.status === 'playing' ? '🟢' : '🔴';
          container
            .addText(`${statusEmoji} **${lobby.game}** (${lobby.id})`)
            .addText(`Host: ${lobby.host.displayName || lobby.host.username}`)
            .addText(`Players: ${lobby.players.length}/${lobby.maxPlayers}`)
            .addActionRow((row) => {
              row.addButton((btn) => btn.asPrimary(`join_${lobby.id}`, 'Join'))
                 .addButton((btn) => btn.asSecondary(`view_${lobby.id}`, 'View Details'))
                 .addButton((btn) => btn.asSecondary(`spectate_${lobby.id}`, 'Spectate'));
            });

          if (index < gameLobbies.size - 1) {
            container.addSeparator({ spacing: SeparatorSpacingSize.Small });
          }
        });

        container
          .addSeparator({ spacing: SeparatorSpacingSize.Medium, divider: true })
          .addActionRow((row) => {
            row.addButton((btn) => btn.asPrimary('create_new_lobby', 'Create New Lobby'))
               .addButton((btn) => btn.asSecondary('refresh_lobbies', 'Refresh'))
               .addButton((btn) => btn.asSecondary('filter_lobbies', 'Filter'));
          });
      }

      await interaction.reply({
        components: [container.build()],
        flags: MessageFlags.IsComponentsV2,
      });
    }
  }

  // Tournament bracket system
  if (interaction.commandName === 'tournament') {
    const container = new ContainerBuilder()
      .addText(`${EMOJIS.TROPHY} **Tournament Manager**`)
      .addText("Create and manage competitive tournaments")
      .addSeparator({ spacing: SeparatorSpacingSize.Medium, divider: true })
      .addText(`${EMOJIS.CHART} **Current Tournaments:**`)
      .addText('🏆 Summer Championship - 16 teams')
      .addText('🥇 Weekly Ladder - 32 players')
      .addText('🎮 Casual Cup - 8 teams')
      .addSeparator({ spacing: SeparatorSpacingSize.Small, divider: true })
      .addActionRow((row) => {
        row.addSelectMenu((menu) => {
          menu.setCustomId('tournament_action')
              .setPlaceholder('Select tournament action...')
              .addOptions([
                { label: 'Create Tournament', value: 'create_tournament', emoji: '🏆' },
                { label: 'Join Tournament', value: 'join_tournament', emoji: '👤' },
                { label: 'View Brackets', value: 'view_brackets', emoji: '📊' },
                { label: 'Tournament Rules', value: 'tournament_rules', emoji: '📋' }
              ]);
        });
      })
      .addActionRow((row) => {
        row.addButton((btn) => btn.asPrimary('quick_match', 'Quick Match'))
           .addButton((btn) => btn.asSecondary('leaderboard', 'Leaderboard'))
           .addButton((btn) => btn.asSecondary('match_history', 'Match History'));
      });

    await interaction.reply({
      components: [container.build()],
      flags: MessageFlags.IsComponentsV2,
    });
  }
});

// Handle lobby interactions
client.on('interactionCreate', async (interaction) => {
  if (!interaction.isButton()) return;

  // Join lobby functionality
  if (interaction.customId.startsWith('join_')) {
    const lobbyId = interaction.customId.replace('join_', '');
    const lobby = gameLobbies.get(lobbyId);

    if (!lobby) {
      await interaction.reply({
        content: 'This lobby no longer exists.',
        ephemeral: true
      });
      return;
    }

    if (lobby.players.length >= lobby.maxPlayers) {
      await interaction.reply({
        content: 'This lobby is full!',
        ephemeral: true
      });
      return;
    }

    if (lobby.players.some(p => p.id === interaction.user.id)) {
      await interaction.reply({
        content: 'You are already in this lobby!',
        ephemeral: true
      });
      return;
    }

    lobby.players.push(interaction.user);

    const container = new ContainerBuilder()
      .addText(`${EMOJIS.SUCCESS} **Joined Lobby Successfully!**`)
      .addText(`**Game:** ${lobby.game}`)
      .addText(`**Host:** ${lobby.host.displayName || lobby.host.username}`)
      .addText(`**Players:** ${lobby.players.length}/${lobby.maxPlayers}`)
      .addSeparator({ spacing: SeparatorSpacingSize.Small, divider: true })
      .addText(`${EMOJIS.USERS} **Current Players:**`)
      .addText(lobby.players.map(p => `• ${p.displayName || p.username}`).join('\n'))
      .addSeparator({ spacing: SeparatorSpacingSize.Medium });

    if (lobby.players.length === lobby.maxPlayers) {
      container
        .addText(`${EMOJIS.PARTY} **Lobby is now full! Ready to start?**`)
        .addActionRow((row) => {
          row.addButton((btn) => btn.asSuccess(`start_game_${lobbyId}`, 'Start Game'))
             .addButton((btn) => btn.asSecondary(`wait_more_${lobbyId}`, 'Wait for More'))
             .addButton((btn) => btn.asDanger(`leave_${lobbyId}`, 'Leave Lobby'));
        });
    } else {
      container.addActionRow((row) => {
        row.addButton((btn) => btn.asPrimary(`invite_friends_${lobbyId}`, 'Invite Friends'))
           .addButton((btn) => btn.asSecondary(`lobby_chat_${lobbyId}`, 'Lobby Chat'))
           .addButton((btn) => btn.asDanger(`leave_${lobbyId}`, 'Leave Lobby'));
      });
    }

    await interaction.update({
      components: [container.build()],
      flags: MessageFlags.IsComponentsV2,
    });
  }

  // Start game functionality
  if (interaction.customId.startsWith('start_game_')) {
    const lobbyId = interaction.customId.replace('start_game_', '');
    const lobby = gameLobbies.get(lobbyId);

    if (lobby && lobby.host.id === interaction.user.id) {
      lobby.status = 'playing';

      const container = new ContainerBuilder()
        .addText(`${EMOJIS.ROCKET} **Game Started!**`)
        .addText(`**${lobby.game}** is now in progress`)
        .addSeparator({ spacing: SeparatorSpacingSize.Small, divider: true })
        .addText(`${EMOJIS.USERS} **Players:**`)
        .addText(lobby.players.map(p => `🎮 ${p.displayName || p.username}`).join('\n'))
        .addSeparator({ spacing: SeparatorSpacingSize.Medium })
        .addText(`${EMOJIS.INFO} **Game Information:**`)
        .addText(`Started: <t:${Math.floor(Date.now() / 1000)}:R>`)
        .addText(`Duration: Estimated 30-45 minutes`)
        .addActionRow((row) => {
          row.addButton((btn) => btn.asSecondary('game_stats', 'Live Stats'))
             .addButton((btn) => btn.asSecondary('spectate_mode', 'Spectate'))
             .addButton((btn) => btn.asDanger('end_game', 'End Game'));
        });

      await interaction.update({
        components: [container.build()],
        flags: MessageFlags.IsComponentsV2,
      });
    } else {
      await interaction.reply({
        content: 'Only the lobby host can start the game.',
        ephemeral: true
      });
    }
  }

  // Quick match system
  if (interaction.customId === 'quick_match') {
    const container = new ContainerBuilder()
      .addText(`${EMOJIS.HOURGLASS} **Finding Match...**`)
      .addText('Searching for players with similar skill level')
      .addSeparator({ spacing: SeparatorSpacingSize.Small, divider: true })
      .addText(`${EMOJIS.CHART} **Your Stats:**`)
      .addText('Rank: Gold III')
      .addText('Win Rate: 67%')
      .addText('Recent Performance: 🔥 Win Streak (3)')
      .addSeparator({ spacing: SeparatorSpacingSize.Medium })
      .addActionRow((row) => {
        row.addButton((btn) => btn.asDanger('cancel_search', 'Cancel Search'))
           .addButton((btn) => btn.asSecondary('search_settings', 'Search Settings'));
      });

    await interaction.update({
      components: [container.build()],
      flags: MessageFlags.IsComponentsV2,
    });

    // Simulate finding a match
    setTimeout(async () => {
      try {
        const matchFoundContainer = new ContainerBuilder()
          .addText(`${EMOJIS.SUCCESS} **Match Found!**`)
          .addText('Found 4 other players')
          .addSeparator({ spacing: SeparatorSpacingSize.Small, divider: true })
          .addText(`${EMOJIS.USERS} **Team Assignment:**`)
          .addText('🔵 **Blue Team:**')
          .addText(`• ${interaction.user.displayName || interaction.user.username} (You)`)
          .addText('• PlayerTwo (Gold II)')
          .addText('• PlayerThree (Gold I)')
          .addText('')
          .addText('🔴 **Red Team:**')
          .addText('• PlayerFour (Gold III)')
          .addText('• PlayerFive (Gold II)')
          .addSeparator({ spacing: SeparatorSpacingSize.Medium })
          .addActionRow((row) => {
            row.addButton((btn) => btn.asSuccess('accept_match', 'Accept Match (30s)'))
               .addButton((btn) => btn.asDanger('decline_match', 'Decline'));
          });

        await interaction.editReply({
          components: [matchFoundContainer.build()],
          flags: MessageFlags.IsComponentsV2,
        });
      } catch (error) {
        console.log('Match update failed - user may have navigated away');
      }
    }, 3000);
  }
});

// Handle select menu interactions
client.on('interactionCreate', async (interaction) => {
  if (!interaction.isStringSelectMenu()) return;

  if (interaction.customId === 'tournament_action') {
    const action = interaction.values[0];

    if (action === 'view_brackets') {
      const container = new ContainerBuilder()
        .addText(`${EMOJIS.CHART} **Tournament Brackets**`)
        .addText('Summer Championship - Round of 16')
        .addSeparator({ spacing: SeparatorSpacingSize.Small, divider: true })
        .addText('🥇 **Quarter Finals:**')
        .addText('Team Alpha vs Team Beta')
        .addText('Team Gamma vs Team Delta') 
        .addText('Team Epsilon vs Team Zeta')
        .addText('Team Eta vs Team Theta')
        .addSeparator({ spacing: SeparatorSpacingSize.Small })
        .addText('📅 **Next Matches:** Tomorrow 8:00 PM UTC')
        .addActionRow((row) => {
          row.addButton((btn) => btn.asPrimary('view_full_bracket', 'View Full Bracket'))
             .addButton((btn) => btn.asSecondary('predict_winners', 'Make Predictions'))
             .addButton((btn) => btn.asSecondary('tournament_schedule', 'Schedule'));
        });

      await interaction.update({
        components: [container.build()],
        flags: MessageFlags.IsComponentsV2,
      });
    }

    if (action === 'create_tournament') {
      const container = new ContainerBuilder()
        .addText(`${EMOJIS.HAMMER} **Create New Tournament**`)
        .addText('Set up a competitive tournament for your community')
        .addSeparator({ spacing: SeparatorSpacingSize.Medium, divider: true })
        .addActionRow((row) => {
          row.addSelectMenu((menu) => {
            menu.setCustomId('tournament_type')
                .setPlaceholder('Select tournament type...')
                .addOptions([
                  { label: 'Single Elimination', value: 'single_elim', emoji: '🏆' },
                  { label: 'Double Elimination', value: 'double_elim', emoji: '🥇' },
                  { label: 'Round Robin', value: 'round_robin', emoji: '🔄' },
                  { label: 'Swiss System', value: 'swiss', emoji: '🇨🇭' }
                ]);
          });
        })
        .addActionRow((row) => {
          row.addButton((btn) => btn.asPrimary('tournament_settings', 'Tournament Settings'))
             .addButton((btn) => btn.asSecondary('tournament_rules', 'Set Rules'))
             .addButton((btn) => btn.asSecondary('preview_tournament', 'Preview'));
        });

      await interaction.update({
        components: [container.build()],
        flags: MessageFlags.IsComponentsV2,
      });
    }
  }
});

client.login(process.env.DISCORD_TOKEN);