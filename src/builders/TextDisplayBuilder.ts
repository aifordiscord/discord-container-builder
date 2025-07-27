import { TextDisplayBuilder as DiscordTextDisplayBuilder } from 'discord.js';

/**
 * Simplified TextDisplayBuilder that provides a cleaner API for creating text display components
 */
export class TextDisplayBuilder {
  private readonly textDisplay: DiscordTextDisplayBuilder;

  constructor() {
    this.textDisplay = new DiscordTextDisplayBuilder();
  }

  /**
   * Set the content of the text display
   * @param content - The text content to display
   * @returns The TextDisplayBuilder instance for chaining
   */
  setContent(content: string): this {
    this.textDisplay.setContent(content);
    return this;
  }

  /**
   * Set bold text content
   * @param content - The text content to display in bold
   * @returns The TextDisplayBuilder instance for chaining
   */
  setBoldContent(content: string): this {
    return this.setContent(`**${content}**`);
  }

  /**
   * Set italic text content
   * @param content - The text content to display in italics
   * @returns The TextDisplayBuilder instance for chaining
   */
  setItalicContent(content: string): this {
    return this.setContent(`*${content}*`);
  }

  /**
   * Set code text content
   * @param content - The text content to display as code
   * @returns The TextDisplayBuilder instance for chaining
   */
  setCodeContent(content: string): this {
    return this.setContent(`\`${content}\``);
  }

  /**
   * Set multiline content with automatic formatting
   * @param lines - Array of text lines
   * @returns The TextDisplayBuilder instance for chaining
   */
  setLines(lines: string[]): this {
    return this.setContent(lines.join('\n'));
  }

  /**
   * Add an emoji prefix to the content
   * @param emoji - The emoji to prefix
   * @param content - The text content
   * @returns The TextDisplayBuilder instance for chaining
   */
  setEmojiContent(emoji: string, content: string): this {
    return this.setContent(`${emoji} ${content}`);
  }

  /**
   * Build the final Discord.js TextDisplayBuilder
   * @returns The Discord.js TextDisplayBuilder instance
   */
  build(): DiscordTextDisplayBuilder {
    return this.textDisplay;
  }

  /**
   * Get the JSON representation of the text display
   * @returns The JSON data
   */
  toJSON(): any {
    return this.textDisplay.toJSON();
  }
}
