import {
  ChatInputCommandInteraction,
  EmbedBuilder,
  SlashCommandBuilder,
} from "discord.js";

export const data = new SlashCommandBuilder()
  .setName("commands")
  .setDescription("Replies with the avalible commands");

const embed = new EmbedBuilder()
  .setTitle("Commands")
  .setDescription(
    "`/todoadd <text>` Add a todo\n`/todoremove <text>` Remove a todo\n`/todos` Show all todos\n`/help` Open the help menu\n`/commands` Show all avalible"
  );

export async function execute(interaction: ChatInputCommandInteraction) {
  await interaction.reply({ embeds: [embed], ephemeral: true });
}
