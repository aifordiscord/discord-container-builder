/**
 * Basic Plan Selector Example - Recreating the original example with simplified API
 * This example demonstrates how to use discord-container-builder to create
 * the same plan selector from the original Discord.js v2 Components example.
 */

import {
  ContainerBuilder,
  TextDisplayBuilder,
  SeparatorBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  StringSelectMenuBuilder,
  ButtonStyle,
  SeparatorSpacingSize,
  MessageFlags,
} from '../src/index';

// Method 1: Using the original verbose API (but still simplified)
export function createPlanSelectorVerbose() {
  const container = new ContainerBuilder()
    .addTextDisplayComponents(
      new TextDisplayBuilder().setContent("**📋 Plan Selector**\nChoose a plan below:")
    )
    .addSeparatorComponents(
      new SeparatorBuilder()
        .setSpacing(SeparatorSpacingSize.Small)
        .setDivider(true)
    )
    .addActionRowComponents(
      new ActionRowBuilder().addComponents(
        new ButtonBuilder()
          .setCustomId("plan_basic")
          .setLabel("Basic")
          .setStyle(ButtonStyle.Primary),
        new ButtonBuilder()
          .setCustomId("plan_premium")
          .setLabel("Premium")
          .setStyle(ButtonStyle.Success)
      ),
      new ActionRowBuilder().addComponents(
        new StringSelectMenuBuilder()
          .setCustomId("plan_dropdown")
          .setPlaceholder("Select a plan...")
          .addOptions([
            { label: "Basic", value: "basic", description: "Basic Plan" },
            { label: "Premium", value: "premium", description: "Premium Plan" },
          ])
      )
    );

  return container.build();
}

// Method 2: Using the simplified API with helper methods
export function createPlanSelectorSimplified() {
  const container = new ContainerBuilder()
    .addText("**📋 Plan Selector**\nChoose a plan below:")
    .addSeparator({ spacing: SeparatorSpacingSize.Small, divider: true })
    .addActionRow((row) => {
      row.addButton((button) => button.asPrimary("plan_basic", "Basic"))
         .addButton((button) => button.asSuccess("plan_premium", "Premium"));
    })
    .addActionRow((row) => {
      row.addSelectMenu((menu) => {
        menu.setCustomId("plan_dropdown")
            .setPlaceholder("Select a plan...")
            .addOptions([
              { label: "Basic", value: "basic", description: "Basic Plan" },
              { label: "Premium", value: "premium", description: "Premium Plan" },
            ]);
      });
    });

  return container.build();
}

// Method 3: Using the most simplified API
export function createPlanSelectorMostSimple() {
  const container = new ContainerBuilder()
    .addText("**📋 Plan Selector**\nChoose a plan below:")
    .addSeparator() // Uses default medium spacing with divider
    .addActionRow((row) => {
      row.addButtons([
        (button) => button.asPrimary("plan_basic", "Basic"),
        (button) => button.asSuccess("plan_premium", "Premium")
      ]);
    })
    .addActionRow((row) => {
      row.addSelectMenu((menu) => {
        menu.setCustomId("plan_dropdown")
            .setPlaceholder("Select a plan...")
            .setOptions([
              { label: "Basic", value: "basic", description: "Basic Plan" },
              { label: "Premium", value: "premium", description: "Premium Plan" },
            ]);
      });
    });

  return container.build();
}

// Usage in a Discord.js bot command
export function setupDiscordBot() {
  const { Client, GatewayIntentBits } = require("discord.js");
  const client = new Client({ intents: [GatewayIntentBits.Guilds] });

  client.once("ready", () => {
    console.log(`✅ Logged in as ${client.user.tag}`);
  });

  client.on("interactionCreate", async (interaction: any) => {
    if (interaction.isChatInputCommand() && interaction.commandName === "plan") {
      // Use any of the methods above
      const container = createPlanSelectorSimplified();

      await interaction.reply({
        components: [container],
        flags: MessageFlags.IsComponentsV2,
      });
    }

    // Handle component interactions
    if (interaction.isButton()) {
      await interaction.reply({
        content: `You selected the **${interaction.customId.replace("plan_", "")}** plan!`,
        ephemeral: true,
      });
    }
    if (interaction.isStringSelectMenu()) {
      await interaction.reply({
        content: `You selected from dropdown: **${interaction.values[0]}**!`,
        ephemeral: true,
      });
    }
  });

  // Get token from environment variable
  const token = process.env.DISCORD_TOKEN;
  if (!token) {
    throw new Error("DISCORD_TOKEN environment variable is required");
  }

  client.login(token);
}
