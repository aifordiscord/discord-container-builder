import { ButtonStyle, SeparatorSpacingSize } from 'discord.js';

/**
 * Common button styles for easy access
 */
export const BUTTON_STYLES = {
  PRIMARY: ButtonStyle.Primary,
  SECONDARY: ButtonStyle.Secondary,
  SUCCESS: ButtonStyle.Success,
  DANGER: ButtonStyle.Danger,
  LINK: ButtonStyle.Link,
} as const;

/**
 * Common separator spacing sizes for easy access
 */
export const SPACING_SIZES = {
  SMALL: SeparatorSpacingSize.Small,
  LARGE: SeparatorSpacingSize.Large,
} as const;

/**
 * Common emoji shortcuts
 */
export const EMOJIS = {
  SUCCESS: '✅',
  ERROR: '❌',
  WARNING: '⚠️',
  INFO: 'ℹ️',
  LOADING: '⏳',
  STAR: '⭐',
  HEART: '❤️',
  THUMBS_UP: '👍',
  THUMBS_DOWN: '👎',
  FIRE: '🔥',
  ROCKET: '🚀',
  MONEY: '💰',
  CROWN: '👑',
  GEAR: '⚙️',
  BOOK: '📚',
  MAIL: '📧',
  PHONE: '📞',
  HOME: '🏠',
  USER: '👤',
  USERS: '👥',
  LOCK: '🔒',
  UNLOCK: '🔓',
  KEY: '🔑',
  SEARCH: '🔍',
  CALENDAR: '📅',
  CLOCK: '🕐',
  CHART: '📊',
  GRAPH: '📈',
  FOLDER: '📁',
  FILE: '📄',
  LINK: '🔗',
  IMAGE: '🖼️',
  VIDEO: '🎥',
  MUSIC: '🎵',
  GAME: '🎮',
  TROPHY: '🏆',
  MEDAL: '🏅',
  FLAG: '🚩',
  BELL: '🔔',
  MUTE: '🔇',
  VOLUME: '🔊',
  PLUS: '➕',
  MINUS: '➖',
  MULTIPLY: '✖️',
  DIVIDE: '➗',
  EQUALS: '🟰',
  QUESTION: '❓',
  EXCLAMATION: '❗',
  ARROW_LEFT: '⬅️',
  ARROW_RIGHT: '➡️',
  ARROW_UP: '⬆️',
  ARROW_DOWN: '⬇️',
} as const;

/**
 * Validation constants
 */
export const VALIDATION = {
  MAX_COMPONENTS_PER_ACTION_ROW: 5,
  MAX_ACTION_ROWS_PER_MESSAGE: 5,
  MAX_BUTTON_LABEL_LENGTH: 80,
  MAX_SELECT_OPTION_LABEL_LENGTH: 100,
  MAX_SELECT_OPTION_DESCRIPTION_LENGTH: 100,
  MAX_SELECT_OPTIONS: 25,
  MAX_CUSTOM_ID_LENGTH: 100,
} as const;
