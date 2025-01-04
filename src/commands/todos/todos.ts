import {
  ChatInputCommandInteraction,
  EmbedBuilder,
  MessageFlags,
  SlashCommandBuilder,
} from "discord.js";
import { getTodos } from "../../../lib/pb";

export const data = new SlashCommandBuilder()
  .setName("todos")
  .setDescription("All your todos");

export async function execute(interaction: ChatInputCommandInteraction) {
  const todos = getTodos(Number(interaction.user.id));

  const embed = new EmbedBuilder().setTitle("Todos");
  (await todos).forEach((todo) => {
    embed.addFields([{ name: " ", value: "`" + todo, inline: false }]);
  });

  await interaction.reply({ embeds: [embed], flags: MessageFlags.Ephemeral });
}
