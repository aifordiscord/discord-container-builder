import { SeparatorBuilder } from '../src';
import { SeparatorSpacingSize } from 'discord.js';

describe('SeparatorBuilder', () => {
  let separator: SeparatorBuilder;

  beforeEach(() => {
    separator = new SeparatorBuilder();
  });

  test('should create a new SeparatorBuilder instance', () => {
    expect(separator).toBeInstanceOf(SeparatorBuilder);
  });

  test('should set spacing', () => {
    separator.setSpacing(SeparatorSpacingSize.Large);
    expect(separator.toJSON()).toBeDefined();
  });

  test('should set divider', () => {
    separator.setDivider(true);
    expect(separator.toJSON()).toBeDefined();
  });

  test('should set small spacing', () => {
    separator.setSmallSpacing();
    expect(separator.toJSON()).toBeDefined();
  });

  test('should set medium spacing', () => {
    separator.setMediumSpacing();
    expect(separator.toJSON()).toBeDefined();
  });

  test('should set large spacing', () => {
    separator.setLargeSpacing();
    expect(separator.toJSON()).toBeDefined();
  });

  test('should create as divider', () => {
    separator.asDivider();
    expect(separator.toJSON()).toBeDefined();
  });

  test('should create as spacer', () => {
    separator.asSpacer(SeparatorSpacingSize.Large);
    expect(separator.toJSON()).toBeDefined();
  });

  test('should support method chaining', () => {
    const result = separator.setSpacing(SeparatorSpacingSize.Small).setDivider(true);
    expect(result).toBe(separator);
  });

  test('should build a valid Discord.js SeparatorBuilder', () => {
    separator.setSpacing(SeparatorSpacingSize.Large);
    const discordSeparator = separator.build();
    
    expect(discordSeparator).toBeDefined();
    expect(discordSeparator.toJSON).toBeDefined();
  });
});
