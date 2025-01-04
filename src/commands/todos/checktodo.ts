import {
  ChatInputCommandInteraction,
  EmbedBuilder,
  MessageFlags,
  SlashCommandBuilder,
} from "discord.js";
import { checkTodo } from "../../../lib/pb";

export const data = new SlashCommandBuilder()
  .setName("checktodo")
  .addStringOption((option) =>
    option.setName("todo").setDescription("The todo to check")
  )
  .setDescription("Check a todo");

export async function execute(interaction: ChatInputCommandInteraction) {
  const todo = interaction.options.getString("todo");
  const embedChecked = new EmbedBuilder()
    .setTitle("Checked Todo")
    .setDescription("Successfully set the todo to **checked**");

  const embedUnchecked = new EmbedBuilder()
    .setTitle("Unchecked Todo")
    .setDescription("Successfully set the todo to **unchecked**");

  try {
    const result = await checkTodo(String(todo), Number(interaction.user.id));

    if (result.items.length > 0) {
      const todo = result.items[0];
      const embedToSend = todo.checked ? embedUnchecked : embedChecked;

      await interaction.reply({ embeds: [embedToSend] });
    } else {
      await interaction.reply({
        content: "No matching todo found for your request.",
        flags: MessageFlags.Ephemeral,
      });
    }
  } catch (error) {
    console.error(error);
    await interaction.reply({
      content: "An error occurred while checking the todo.",
      flags: MessageFlags.Ephemeral,
    });
  }
}
