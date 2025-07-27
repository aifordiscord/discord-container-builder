import { ContainerBuilder, TextDisplayBuilder, SeparatorBuilder, ActionRowBuilder } from '../src';
import { SeparatorSpacingSize } from 'discord.js';

describe('ContainerBuilder', () => {
  let container: ContainerBuilder;

  beforeEach(() => {
    container = new ContainerBuilder();
  });

  test('should create a new ContainerBuilder instance', () => {
    expect(container).toBeInstanceOf(ContainerBuilder);
  });

  test('should add text display components', () => {
    const textDisplay = new TextDisplayBuilder().setContent('Test content');
    container.addTextDisplayComponents(textDisplay);
    
    expect(container.toJSON()).toBeDefined();
  });

  test('should add separator components', () => {
    const separator = new SeparatorBuilder()
      .setSpacing(SeparatorSpacingSize.Small)
      .setDivider(true);
    
    container.addSeparatorComponents(separator);
    expect(container.toJSON()).toBeDefined();
  });

  test('should add action row components', () => {
    const actionRow = new ActionRowBuilder();
    container.addActionRowComponents(actionRow);
    
    expect(container.toJSON()).toBeDefined();
  });

  test('should support method chaining', () => {
    const result = container
      .addText('Hello World')
      .addSeparator({ spacing: SeparatorSpacingSize.Large, divider: true })
      .addActionRow((row) => {
        row.addButton((button) => {
          button.asPrimary('test_button', 'Test Button');
        });
      });

    expect(result).toBe(container);
    expect(container.toJSON()).toBeDefined();
  });

  test('should build a valid Discord.js ContainerBuilder', () => {
    container.addText('Test content');
    const discordContainer = container.build();
    
    expect(discordContainer).toBeDefined();
    expect(discordContainer.toJSON).toBeDefined();
  });

  test('should add text with simplified API', () => {
    container.addText('Simple text content');
    expect(container.toJSON()).toBeDefined();
  });

  test('should add separator with simplified API', () => {
    container.addSeparator({
      spacing: SeparatorSpacingSize.Large,
      divider: false
    });
    expect(container.toJSON()).toBeDefined();
  });

  test('should add action row with callback', () => {
    container.addActionRow((row) => {
      expect(row).toBeInstanceOf(ActionRowBuilder);
    });
    expect(container.toJSON()).toBeDefined();
  });
});
