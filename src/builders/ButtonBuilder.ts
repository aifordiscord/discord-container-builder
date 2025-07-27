import { 
  ButtonBuilder as DiscordButtonBuilder,
  ButtonStyle,
} from 'discord.js';

/**
 * Simplified ButtonBuilder that provides a cleaner API for creating button components
 */
export class ButtonBuilder {
  private button: DiscordButtonBuilder;

  constructor() {
    this.button = new DiscordButtonBuilder();
  }

  /**
   * Set the custom ID of the button
   * @param customId - The custom ID
   * @returns The ButtonBuilder instance for chaining
   */
  setCustomId(customId: string): this {
    this.button.setCustomId(customId);
    return this;
  }

  /**
   * Set the label of the button
   * @param label - The button label
   * @returns The ButtonBuilder instance for chaining
   */
  setLabel(label: string): this {
    this.button.setLabel(label);
    return this;
  }

  /**
   * Set the style of the button
   * @param style - The button style
   * @returns The ButtonBuilder instance for chaining
   */
  setStyle(style: ButtonStyle): this {
    this.button.setStyle(style);
    return this;
  }

  /**
   * Set the emoji of the button
   * @param emoji - The emoji
   * @returns The ButtonBuilder instance for chaining
   */
  setEmoji(emoji: string): this {
    this.button.setEmoji(emoji);
    return this;
  }

  /**
   * Set the URL for link buttons
   * @param url - The URL
   * @returns The ButtonBuilder instance for chaining
   */
  setURL(url: string): this {
    this.button.setURL(url);
    return this;
  }

  /**
   * Set whether the button is disabled
   * @param disabled - Whether the button is disabled
   * @returns The ButtonBuilder instance for chaining
   */
  setDisabled(disabled: boolean = true): this {
    this.button.setDisabled(disabled);
    return this;
  }

  /**
   * Create a primary button
   * @param customId - The custom ID
   * @param label - The button label
   * @returns The ButtonBuilder instance for chaining
   */
  asPrimary(customId: string, label: string): this {
    return this.setCustomId(customId).setLabel(label).setStyle(ButtonStyle.Primary);
  }

  /**
   * Create a secondary button
   * @param customId - The custom ID
   * @param label - The button label
   * @returns The ButtonBuilder instance for chaining
   */
  asSecondary(customId: string, label: string): this {
    return this.setCustomId(customId).setLabel(label).setStyle(ButtonStyle.Secondary);
  }

  /**
   * Create a success button
   * @param customId - The custom ID
   * @param label - The button label
   * @returns The ButtonBuilder instance for chaining
   */
  asSuccess(customId: string, label: string): this {
    return this.setCustomId(customId).setLabel(label).setStyle(ButtonStyle.Success);
  }

  /**
   * Create a danger button
   * @param customId - The custom ID
   * @param label - The button label
   * @returns The ButtonBuilder instance for chaining
   */
  asDanger(customId: string, label: string): this {
    return this.setCustomId(customId).setLabel(label).setStyle(ButtonStyle.Danger);
  }

  /**
   * Create a link button
   * @param url - The URL
   * @param label - The button label
   * @returns The ButtonBuilder instance for chaining
   */
  asLink(url: string, label: string): this {
    return this.setURL(url).setLabel(label).setStyle(ButtonStyle.Link);
  }

  /**
   * Build the final Discord.js ButtonBuilder
   * @returns The Discord.js ButtonBuilder instance
   */
  build(): DiscordButtonBuilder {
    return this.button;
  }

  /**
   * Get the JSON representation of the button
   * @returns The JSON data
   */
  toJSON(): any {
    return this.button.toJSON();
  }
}
