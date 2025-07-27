import { TextDisplayBuilder } from '../src';

describe('TextDisplayBuilder', () => {
  let textDisplay: TextDisplayBuilder;

  beforeEach(() => {
    textDisplay = new TextDisplayBuilder();
  });

  test('should create a new TextDisplayBuilder instance', () => {
    expect(textDisplay).toBeInstanceOf(TextDisplayBuilder);
  });

  test('should set content', () => {
    textDisplay.setContent('Test content');
    expect(textDisplay.toJSON()).toBeDefined();
  });

  test('should set bold content', () => {
    textDisplay.setBoldContent('Bold text');
    const json = textDisplay.toJSON();
    expect(json).toBeDefined();
  });

  test('should set italic content', () => {
    textDisplay.setItalicContent('Italic text');
    const json = textDisplay.toJSON();
    expect(json).toBeDefined();
  });

  test('should set code content', () => {
    textDisplay.setCodeContent('code text');
    const json = textDisplay.toJSON();
    expect(json).toBeDefined();
  });

  test('should set multiline content', () => {
    const lines = ['Line 1', 'Line 2', 'Line 3'];
    textDisplay.setLines(lines);
    expect(textDisplay.toJSON()).toBeDefined();
  });

  test('should set emoji content', () => {
    textDisplay.setEmojiContent('🎉', 'Celebration text');
    expect(textDisplay.toJSON()).toBeDefined();
  });

  test('should support method chaining', () => {
    const result = textDisplay.setContent('Test').setBoldContent('Bold');
    expect(result).toBe(textDisplay);
  });

  test('should build a valid Discord.js TextDisplayBuilder', () => {
    textDisplay.setContent('Test content');
    const discordTextDisplay = textDisplay.build();
    
    expect(discordTextDisplay).toBeDefined();
    expect(discordTextDisplay.toJSON).toBeDefined();
  });
});
