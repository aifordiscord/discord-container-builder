import { ButtonStyle, SeparatorSpacingSize, MessageFlags } from 'discord.js';

// Re-export Discord.js types for convenience
export { ButtonStyle, SeparatorSpacingSize, MessageFlags };

// Custom types for our builders
export interface ComponentBuilderOptions {
  validate?: boolean;
}

export interface TextDisplayOptions {
  bold?: boolean;
  italic?: boolean;
  code?: boolean;
  emoji?: string;
}

export interface SeparatorOptions {
  spacing?: SeparatorSpacingSize;
  divider?: boolean;
}

export interface ButtonOptions {
  customId?: string;
  label?: string;
  style?: ButtonStyle;
  emoji?: string;
  url?: string;
  disabled?: boolean;
}

export interface SelectMenuOptions {
  customId?: string;
  placeholder?: string;
  minValues?: number;
  maxValues?: number;
  disabled?: boolean;
}

export interface SelectOption {
  label: string;
  value: string;
  description?: string;
  emoji?: string;
  default?: boolean;
}
