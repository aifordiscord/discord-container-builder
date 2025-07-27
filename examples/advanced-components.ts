/**
 * Advanced Components Example - Showcasing more complex use cases
 * This example demonstrates advanced patterns and features of discord-container-builder
 */

import {
  ContainerBuilder,
  TextDisplayBuilder,
  SeparatorBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  StringSelectMenuBuilder,
  ButtonStyle,
  SeparatorSpacingSize,
  EMOJIS,
  BUTTON_STYLES,
} from '../src/index';

// Example 1: User Profile Card
export function createUserProfileCard(user: { name: string; level: number; xp: number; badges: string[] }) {
  return new ContainerBuilder()
    .addText(`${EMOJIS.USER} **${user.name}**`)
    .addText(`Level ${user.level} • ${user.xp} XP`)
    .addSeparator({ spacing: SeparatorSpacingSize.Small, divider: true })
    .addText(`${EMOJIS.TROPHY} **Badges:** ${user.badges.join(' ')}`)
    .addActionRow((row) => {
      row.addButton((btn) => btn.asPrimary('view_profile', 'View Profile'))
         .addButton((btn) => btn.asSecondary('add_friend', 'Add Friend'))
         .addButton((btn) => btn.asDanger('block_user', 'Block'));
    })
    .build();
}

// Example 2: Settings Panel
export function createSettingsPanel() {
  return new ContainerBuilder()
    .addText(`${EMOJIS.GEAR} **Settings Panel**`)
    .addSeparator()
    .addActionRow((row) => {
      row.addSelectMenu((menu) => {
        menu.setCustomId('settings_category')
            .setPlaceholder('Choose a settings category...')
            .addOptions([
              { label: 'Account', value: 'account', emoji: EMOJIS.USER, description: 'Manage your account settings' },
              { label: 'Privacy', value: 'privacy', emoji: EMOJIS.LOCK, description: 'Privacy and security settings' },
              { label: 'Notifications', value: 'notifications', emoji: EMOJIS.BELL, description: 'Notification preferences' },
              { label: 'Appearance', value: 'appearance', emoji: EMOJIS.IMAGE, description: 'Theme and display settings' },
            ]);
      });
    })
    .addActionRow((row) => {
      row.addButton((btn) => btn.asSuccess('save_settings', `${EMOJIS.SUCCESS} Save`))
         .addButton((btn) => btn.asSecondary('reset_settings', `${EMOJIS.WARNING} Reset`))
         .addButton((btn) => btn.asDanger('delete_account', `${EMOJIS.ERROR} Delete Account`));
    })
    .build();
}

// Example 3: Shopping Cart
export function createShoppingCart(items: Array<{ name: string; price: number; quantity: number }>) {
  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  const container = new ContainerBuilder()
    .addText(`${EMOJIS.FOLDER} **Shopping Cart**`)
    .addSeparator({ spacing: SeparatorSpacingSize.Small, divider: true });

  // Add each item
  items.forEach((item, index) => {
    container.addText(`${item.name} - $${item.price} x ${item.quantity}`)
            .addActionRow((row) => {
              row.addButton((btn) => btn.asSecondary(`decrease_${index}`, '−'))
                 .addButton((btn) => btn.asSecondary(`increase_${index}`, '+'))
                 .addButton((btn) => btn.asDanger(`remove_${index}`, `${EMOJIS.ERROR} Remove`));
            });
  });

  // Add total and checkout
  container.addSeparator()
           .addText(`**Total: $${total.toFixed(2)}**`)
           .addActionRow((row) => {
             row.addButton((btn) => btn.asSuccess('checkout', `${EMOJIS.MONEY} Checkout`))
                .addButton((btn) => btn.asSecondary('continue_shopping', 'Continue Shopping'))
                .addButton((btn) => btn.asDanger('clear_cart', 'Clear Cart'));
           });

  return container.build();
}

// Example 4: Poll Creator
export function createPoll(question: string, options: string[], allowMultiple: boolean = false) {
  const container = new ContainerBuilder()
    .addText(`${EMOJIS.QUESTION} **Poll**`)
    .addText(question)
    .addSeparator();

  // Add poll options as select menu
  container.addActionRow((row) => {
    row.addSelectMenu((menu) => {
      menu.setCustomId('poll_vote')
          .setPlaceholder('Select your choice(s)...')
          .setMinValues(1)
          .setMaxValues(allowMultiple ? options.length : 1)
          .addOptions(options.map((option, index) => ({
            label: option,
            value: `option_${index}`,
            emoji: EMOJIS.STAR
          })));
    });
  });

  // Add poll controls
  container.addActionRow((row) => {
    row.addButton((btn) => btn.asPrimary('view_results', `${EMOJIS.CHART} View Results`))
       .addButton((btn) => btn.asSecondary('share_poll', `${EMOJIS.LINK} Share`))
       .addButton((btn) => btn.asDanger('end_poll', 'End Poll'));
  });

  return container.build();
}

// Example 5: Game Lobby
export function createGameLobby(players: string[], maxPlayers: number, gameType: string) {
  const container = new ContainerBuilder()
    .addText(`${EMOJIS.GAME} **${gameType} Lobby**`)
    .addText(`Players: ${players.length}/${maxPlayers}`)
    .addSeparator({ spacing: SeparatorSpacingSize.Small, divider: true });

  // Show current players
  if (players.length > 0) {
    container.addText(`**Current Players:**\n${players.map(p => `• ${p}`).join('\n')}`);
  } else {
    container.addText('*No players in lobby*');
  }

  container.addSeparator();

  // Game controls
  const canStart = players.length >= 2;
  container.addActionRow((row) => {
    row.addButton((btn) => {
      const button = btn.asSuccess('join_game', `${EMOJIS.PLUS} Join Game`);
      if (players.length >= maxPlayers) {
        button.setDisabled(true).setLabel('Lobby Full');
      }
      return button;
    })
    .addButton((btn) => {
      const button = btn.asPrimary('start_game', `${EMOJIS.ROCKET} Start Game`);
      if (!canStart) {
        button.setDisabled(true);
      }
      return button;
    })
    .addButton((btn) => btn.asSecondary('leave_game', `${EMOJIS.ARROW_LEFT} Leave`));
  });

  // Game settings
  container.addActionRow((row) => {
    row.addSelectMenu((menu) => {
      menu.setCustomId('game_settings')
          .setPlaceholder('Game settings...')
          .addOptions([
            { label: 'Easy', value: 'easy', emoji: EMOJIS.THUMBS_UP },
            { label: 'Normal', value: 'normal', emoji: EMOJIS.STAR },
            { label: 'Hard', value: 'hard', emoji: EMOJIS.FIRE },
            { label: 'Expert', value: 'expert', emoji: EMOJIS.CROWN },
          ]);
    });
  });

  return container.build();
}

// Example 6: Music Player Controls
export function createMusicPlayer(currentSong?: { title: string; artist: string; duration: string }) {
  const container = new ContainerBuilder();

  if (currentSong) {
    container.addText(`${EMOJIS.MUSIC} **Now Playing**`)
             .addText(`**${currentSong.title}**\nby ${currentSong.artist}`)
             .addText(`Duration: ${currentSong.duration}`);
  } else {
    container.addText(`${EMOJIS.MUSIC} **Music Player**`)
             .addText('*No song currently playing*');
  }

  container.addSeparator();

  // Playback controls
  container.addActionRow((row) => {
    row.addButton((btn) => btn.asSecondary('previous', `${EMOJIS.ARROW_LEFT} Previous`))
       .addButton((btn) => {
         return currentSong 
           ? btn.asSecondary('pause', `⏸️ Pause`)
           : btn.asPrimary('play', `▶️ Play`);
       })
       .addButton((btn) => btn.asSecondary('next', `Next ${EMOJIS.ARROW_RIGHT}`))
       .addButton((btn) => btn.asSecondary('stop', `⏹️ Stop`));
  });

  // Volume and extras
  container.addActionRow((row) => {
    row.addButton((btn) => btn.asSecondary('volume_down', `${EMOJIS.VOLUME} -`))
       .addButton((btn) => btn.asSecondary('volume_up', `${EMOJIS.VOLUME} +`))
       .addButton((btn) => btn.asSecondary('shuffle', '🔀 Shuffle'))
       .addButton((btn) => btn.asSecondary('repeat', '🔁 Repeat'));
  });

  return container.build();
}
