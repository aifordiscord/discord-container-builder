import {
  ContainerBuilder as DiscordContainerBuilder,
  TextDisplayBuilder as DiscordTextDisplayBuilder,
  SeparatorBuilder as DiscordSeparatorBuilder,
  ActionRowBuilder as DiscordActionRowBuilder,
  MessageActionRowComponentBuilder,
} from 'discord.js';
import { TextDisplayBuilder } from './TextDisplayBuilder';
import { SeparatorBuilder } from './SeparatorBuilder';
import { ActionRowBuilder } from './ActionRowBuilder';

/**
 * Simplified ContainerBuilder that provides a cleaner API for creating Discord.js v2 Container components
 */
export class ContainerBuilder {
  private container: DiscordContainerBuilder;

  constructor() {
    this.container = new DiscordContainerBuilder();
  }

  /**
   * Add text display components to the container
   * @param components - TextDisplayBuilder instances or raw Discord TextDisplayBuilders
   * @returns The ContainerBuilder instance for chaining
   */
  addTextDisplayComponents(...components: (TextDisplayBuilder | DiscordTextDisplayBuilder)[]): this {
    const discordComponents = components.map(component => 
      component instanceof TextDisplayBuilder ? component.build() : component
    );
    this.container.addTextDisplayComponents(...discordComponents);
    return this;
  }

  /**
   * Add separator components to the container
   * @param components - SeparatorBuilder instances or raw Discord SeparatorBuilders
   * @returns The ContainerBuilder instance for chaining
   */
  addSeparatorComponents(...components: (SeparatorBuilder | DiscordSeparatorBuilder)[]): this {
    const discordComponents = components.map(component => 
      component instanceof SeparatorBuilder ? component.build() : component
    );
    this.container.addSeparatorComponents(...discordComponents);
    return this;
  }

  /**
   * Add action row components to the container
   * @param components - ActionRowBuilder instances or raw Discord ActionRowBuilders
   * @returns The ContainerBuilder instance for chaining
   */
  addActionRowComponents(...components: (ActionRowBuilder | DiscordActionRowBuilder<MessageActionRowComponentBuilder>)[]): this {
    const discordComponents = components.map(component => 
      component instanceof ActionRowBuilder ? component.build() : component
    );
    // Type assertion needed because our ActionRowBuilder is designed for message components
    this.container.addActionRowComponents(...(discordComponents as any));
    return this;
  }

  /**
   * Add a text display with simplified API
   * @param content - The text content to display
   * @returns The ContainerBuilder instance for chaining
   */
  addText(content: string): this {
    return this.addTextDisplayComponents(new TextDisplayBuilder().setContent(content));
  }

  /**
   * Add a separator with simplified API
   * @param options - Optional separator configuration
   * @returns The ContainerBuilder instance for chaining
   */
  addSeparator(options?: { spacing?: any; divider?: boolean }): this {
    const separator = new SeparatorBuilder();
    if (options?.spacing) separator.setSpacing(options.spacing);
    if (options?.divider !== undefined) separator.setDivider(options.divider);
    return this.addSeparatorComponents(separator);
  }

  /**
   * Add an action row with simplified API
   * @param callback - Function to configure the action row
   * @returns The ContainerBuilder instance for chaining
   */
  addActionRow(callback: (row: ActionRowBuilder) => void): this {
    const row = new ActionRowBuilder();
    callback(row);
    return this.addActionRowComponents(row);
  }

  /**
   * Build the final Discord.js ContainerBuilder
   * @returns The Discord.js ContainerBuilder instance
   */
  build(): DiscordContainerBuilder {
    return this.container;
  }

  /**
   * Get the JSON representation of the container
   * @returns The JSON data
   */
  toJSON(): any {
    return this.container.toJSON();
  }
}
