import { 
  SeparatorBuilder as DiscordSeparatorBuilder,
  SeparatorSpacingSize 
} from 'discord.js';

/**
 * Simplified SeparatorBuilder that provides a cleaner API for creating separator components
 */
export class SeparatorBuilder {
  private separator: DiscordSeparatorBuilder;

  constructor() {
    this.separator = new DiscordSeparatorBuilder();
  }

  /**
   * Set the spacing of the separator
   * @param spacing - The spacing size
   * @returns The SeparatorBuilder instance for chaining
   */
  setSpacing(spacing: SeparatorSpacingSize): this {
    this.separator.setSpacing(spacing);
    return this;
  }

  /**
   * Set whether to show a divider line
   * @param divider - Whether to show a divider
   * @returns The SeparatorBuilder instance for chaining
   */
  setDivider(divider: boolean): this {
    this.separator.setDivider(divider);
    return this;
  }

  /**
   * Set small spacing
   * @returns The SeparatorBuilder instance for chaining
   */
  setSmallSpacing(): this {
    return this.setSpacing(SeparatorSpacingSize.Small);
  }

  /**
   * Set medium spacing (alias for large spacing since Medium doesn't exist)
   * @returns The SeparatorBuilder instance for chaining
   */
  setMediumSpacing(): this {
    return this.setSpacing(SeparatorSpacingSize.Large);
  }

  /**
   * Set large spacing
   * @returns The SeparatorBuilder instance for chaining
   */
  setLargeSpacing(): this {
    return this.setSpacing(SeparatorSpacingSize.Large);
  }

  /**
   * Create a divider with small spacing
   * @returns The SeparatorBuilder instance for chaining
   */
  asDivider(): this {
    return this.setDivider(true).setSmallSpacing();
  }

  /**
   * Create a spacer without divider
   * @param size - The spacing size (defaults to large)
   * @returns The SeparatorBuilder instance for chaining
   */
  asSpacer(size: SeparatorSpacingSize = SeparatorSpacingSize.Large): this {
    return this.setDivider(false).setSpacing(size);
  }

  /**
   * Build the final Discord.js SeparatorBuilder
   * @returns The Discord.js SeparatorBuilder instance
   */
  build(): DiscordSeparatorBuilder {
    return this.separator;
  }

  /**
   * Get the JSON representation of the separator
   * @returns The JSON data
   */
  toJSON(): any {
    return this.separator.toJSON();
  }
}
