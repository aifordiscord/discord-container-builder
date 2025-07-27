import { 
  ActionRowBuilder as DiscordActionRowBuilder,
  ButtonBuilder as DiscordButtonBuilder,
  StringSelectMenuBuilder as DiscordStringSelectMenuBuilder,
} from 'discord.js';
import { ButtonBuilder } from './ButtonBuilder';
import { StringSelectMenuBuilder } from './StringSelectMenuBuilder';

/**
 * Simplified ActionRowBuilder that provides a cleaner API for creating action row components
 */
export class ActionRowBuilder {
  private readonly actionRow: DiscordActionRowBuilder;

  constructor() {
    this.actionRow = new DiscordActionRowBuilder();
  }

  /**
   * Add components to the action row
   * @param components - Button or SelectMenu components
   * @returns The ActionRowBuilder instance for chaining
   */
  addComponents(...components: (ButtonBuilder | StringSelectMenuBuilder | DiscordButtonBuilder | DiscordStringSelectMenuBuilder)[]): this {
    const discordComponents = components.map(component => {
      if (component instanceof ButtonBuilder || component instanceof StringSelectMenuBuilder) {
        return component.build();
      }
      return component;
    });
    this.actionRow.addComponents(...discordComponents);
    return this;
  }

  /**
   * Add a button with simplified API
   * @param callback - Function to configure the button
   * @returns The ActionRowBuilder instance for chaining
   */
  addButton(callback: (button: ButtonBuilder) => void): this {
    const button = new ButtonBuilder();
    callback(button);
    return this.addComponents(button);
  }

  /**
   * Add multiple buttons with simplified API
   * @param configs - Array of button configurations
   * @returns The ActionRowBuilder instance for chaining
   */
  addButtons(configs: Array<(button: ButtonBuilder) => void>): this {
    configs.forEach(config => this.addButton(config));
    return this;
  }

  /**
   * Add a select menu with simplified API
   * @param callback - Function to configure the select menu
   * @returns The ActionRowBuilder instance for chaining
   */
  addSelectMenu(callback: (menu: StringSelectMenuBuilder) => void): this {
    const menu = new StringSelectMenuBuilder();
    callback(menu);
    return this.addComponents(menu);
  }

  /**
   * Build the final Discord.js ActionRowBuilder
   * @returns The Discord.js ActionRowBuilder instance
   */
  build(): DiscordActionRowBuilder {
    return this.actionRow;
  }

  /**
   * Get the JSON representation of the action row
   * @returns The JSON data
   */
  toJSON(): any {
    return this.actionRow.toJSON();
  }
}
