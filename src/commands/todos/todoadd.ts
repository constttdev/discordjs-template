import {
  ChatInputCommandInteraction,
  EmbedBuilder,
  MessageFlags,
  SlashCommandBuilder,
} from "discord.js";

import { addTodo } from "../../../lib/pb";

export const data = new SlashCommandBuilder()
  .setName("todoadd")
  .setDescription("Used to add a todo")

  .addStringOption((option) =>
    option.setName("todo").setDescription("The todo to add")
  );

export async function execute(interaction: ChatInputCommandInteraction) {
  const todo = interaction.options.getString("todo");

  try {
    await addTodo(String(todo), Number(interaction.user.id), false);
    const embedWorked = new EmbedBuilder()
      .setColor("#008000")
      .setTitle("Todo added!")
      .setDescription("Added `" + todo + "` to todos");
    await interaction.reply({
      embeds: [embedWorked],
      flags: MessageFlags.Ephemeral,
    });
  } catch (error) {
    const embedError = new EmbedBuilder()
      .setColor("#FF0000")
      .setTitle("Error!")
      .setDescription("An error ecured where creating the Todo")
      .setFields({ name: "Error", value: "`" + error + "`", inline: false });
    await interaction.reply({
      embeds: [embedError],
      flags: MessageFlags.Ephemeral,
    });
    console.log(error);
  }
}
