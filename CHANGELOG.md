# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2025-07-27

### Added
- Initial release of discord-container-builder
- Complete TypeScript implementation with full type definitions
- Core builder classes:
  - ContainerBuilder with simplified API methods
  - TextDisplayBuilder with formatting helpers
  - SeparatorBuilder with spacing shortcuts
  - ActionRowBuilder with component helpers
  - ButtonBuilder with style shortcuts
  - StringSelectMenuBuilder with option helpers
- Built-in utilities:
  - EMOJIS constant with 50+ predefined emojis
  - BUTTON_STYLES constant for quick style access
  - SeparatorSpacingSize enum for consistent spacing
- Comprehensive test suite with 28 passing tests
- Build system supporting both CommonJS and ES modules
- Complete documentation with API reference
- Three comprehensive bot examples:
  - basic-bot.js: Plan selector, user profiles, settings
  - advanced-bot.js: Shopping cart, music player, polls
  - game-lobby.js: Gaming lobby system, tournaments

### Features
- 60% reduction in boilerplate code compared to raw Discord.js v2 Components
- Chainable method API for intuitive component building
- Full Discord.js v14 compatibility
- Zero runtime dependencies (Discord.js as peer dependency)
- Tree-shakeable imports for optimal bundle size
- TypeScript-first design with IntelliSense support

### Documentation
- Comprehensive README with examples and migration guide
- API reference with detailed method documentation
- Installation guide with NPM publishing instructions
- Performance metrics and compatibility matrix
- FAQ section covering common use cases

### Developer Experience
- ESLint configuration with TypeScript rules
- Prettier formatting configuration
- Jest testing setup with coverage reporting
- Rollup build configuration for multiple output formats
- GitHub Actions workflows for CI/CD