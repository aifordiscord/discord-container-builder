import { 
  StringSelectMenuBuilder as DiscordStringSelectMenuBuilder,
  StringSelectMenuOptionBuilder,
} from 'discord.js';

export interface SelectOption {
  label: string;
  value: string;
  description?: string;
  emoji?: string;
  default?: boolean;
}

/**
 * Simplified StringSelectMenuBuilder that provides a cleaner API for creating select menu components
 */
export class StringSelectMenuBuilder {
  private selectMenu: DiscordStringSelectMenuBuilder;

  constructor() {
    this.selectMenu = new DiscordStringSelectMenuBuilder();
  }

  /**
   * Set the custom ID of the select menu
   * @param customId - The custom ID
   * @returns The StringSelectMenuBuilder instance for chaining
   */
  setCustomId(customId: string): this {
    this.selectMenu.setCustomId(customId);
    return this;
  }

  /**
   * Set the placeholder text
   * @param placeholder - The placeholder text
   * @returns The StringSelectMenuBuilder instance for chaining
   */
  setPlaceholder(placeholder: string): this {
    this.selectMenu.setPlaceholder(placeholder);
    return this;
  }

  /**
   * Set the minimum number of values that can be selected
   * @param min - The minimum values
   * @returns The StringSelectMenuBuilder instance for chaining
   */
  setMinValues(min: number): this {
    this.selectMenu.setMinValues(min);
    return this;
  }

  /**
   * Set the maximum number of values that can be selected
   * @param max - The maximum values
   * @returns The StringSelectMenuBuilder instance for chaining
   */
  setMaxValues(max: number): this {
    this.selectMenu.setMaxValues(max);
    return this;
  }

  /**
   * Set whether the select menu is disabled
   * @param disabled - Whether the select menu is disabled
   * @returns The StringSelectMenuBuilder instance for chaining
   */
  setDisabled(disabled: boolean = true): this {
    this.selectMenu.setDisabled(disabled);
    return this;
  }

  /**
   * Add options to the select menu
   * @param options - Array of option objects or StringSelectMenuOptionBuilder instances
   * @returns The StringSelectMenuBuilder instance for chaining
   */
  addOptions(options: (SelectOption | StringSelectMenuOptionBuilder)[]): this {
    const discordOptions = options.map(option => {
      if (option instanceof StringSelectMenuOptionBuilder) {
        return option;
      }
      
      const builder = new StringSelectMenuOptionBuilder()
        .setLabel(option.label)
        .setValue(option.value);
      
      if (option.description) builder.setDescription(option.description);
      if (option.emoji) builder.setEmoji(option.emoji);
      if (option.default) builder.setDefault(option.default);
      
      return builder;
    });
    
    this.selectMenu.addOptions(...discordOptions);
    return this;
  }

  /**
   * Add a single option with simplified API
   * @param label - The option label
   * @param value - The option value
   * @param description - Optional description
   * @param emoji - Optional emoji
   * @returns The StringSelectMenuBuilder instance for chaining
   */
  addOption(label: string, value: string, description?: string, emoji?: string): this {
    const option: SelectOption = { label, value };
    if (description !== undefined) option.description = description;
    if (emoji !== undefined) option.emoji = emoji;
    return this.addOptions([option]);
  }

  /**
   * Set options (replaces existing options)
   * @param options - Array of option objects
   * @returns The StringSelectMenuBuilder instance for chaining
   */
  setOptions(options: SelectOption[]): this {
    this.selectMenu.setOptions([]);
    return this.addOptions(options);
  }

  /**
   * Build the final Discord.js StringSelectMenuBuilder
   * @returns The Discord.js StringSelectMenuBuilder instance
   */
  build(): DiscordStringSelectMenuBuilder {
    return this.selectMenu;
  }

  /**
   * Get the JSON representation of the select menu
   * @returns The JSON data
   */
  toJSON(): any {
    return this.selectMenu.toJSON();
  }
}
