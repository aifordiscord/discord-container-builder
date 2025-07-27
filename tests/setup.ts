// Jest setup file for discord-container-builder tests
// This file runs before each test suite

// Mock Discord.js components for testing
jest.mock('discord.js', () => ({
  ContainerBuilder: jest.fn().mockImplementation(() => ({
    addTextDisplayComponents: jest.fn().mockReturnThis(),
    addSeparatorComponents: jest.fn().mockReturnThis(),
    addActionRowComponents: jest.fn().mockReturnThis(),
    toJSON: jest.fn().mockReturnValue({}),
  })),
  TextDisplayBuilder: jest.fn().mockImplementation(() => ({
    setContent: jest.fn().mockReturnThis(),
    toJSON: jest.fn().mockReturnValue({}),
  })),
  SeparatorBuilder: jest.fn().mockImplementation(() => ({
    setSpacing: jest.fn().mockReturnThis(),
    setDivider: jest.fn().mockReturnThis(),
    toJSON: jest.fn().mockReturnValue({}),
  })),
  ActionRowBuilder: jest.fn().mockImplementation(() => ({
    addComponents: jest.fn().mockReturnThis(),
    toJSON: jest.fn().mockReturnValue({}),
  })),
  ButtonBuilder: jest.fn().mockImplementation(() => ({
    setCustomId: jest.fn().mockReturnThis(),
    setLabel: jest.fn().mockReturnThis(),
    setStyle: jest.fn().mockReturnThis(),
    setEmoji: jest.fn().mockReturnThis(),
    setURL: jest.fn().mockReturnThis(),
    setDisabled: jest.fn().mockReturnThis(),
    toJSON: jest.fn().mockReturnValue({}),
  })),
  StringSelectMenuBuilder: jest.fn().mockImplementation(() => ({
    setCustomId: jest.fn().mockReturnThis(),
    setPlaceholder: jest.fn().mockReturnThis(),
    setMinValues: jest.fn().mockReturnThis(),
    setMaxValues: jest.fn().mockReturnThis(),
    setDisabled: jest.fn().mockReturnThis(),
    addOptions: jest.fn().mockReturnThis(),
    setOptions: jest.fn().mockReturnThis(),
    toJSON: jest.fn().mockReturnValue({}),
  })),
  StringSelectMenuOptionBuilder: jest.fn().mockImplementation(() => ({
    setLabel: jest.fn().mockReturnThis(),
    setValue: jest.fn().mockReturnThis(),
    setDescription: jest.fn().mockReturnThis(),
    setEmoji: jest.fn().mockReturnThis(),
    setDefault: jest.fn().mockReturnThis(),
  })),
  ButtonStyle: {
    Primary: 1,
    Secondary: 2,
    Success: 3,
    Danger: 4,
    Link: 5,
  },
  SeparatorSpacingSize: {
    Small: 0,
    Medium: 1,
    Large: 2,
  },
  MessageFlags: {
    IsComponentsV2: 1 << 8,
  },
}));

// Global test configuration
beforeEach(() => {
  jest.clearAllMocks();
});