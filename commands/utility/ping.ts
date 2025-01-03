import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import { EmbedBuilder } from "discord.js";

const creditsEmbed = new EmbedBuilder()
  .setColor("#ca2bff")
  .setTitle("Ping Command")
  .setDescription("Pong!")
  .setTimestamp()
  .setFooter({ text: "made by example" });

export const data = new SlashCommandBuilder()
  .setName("ping")
  .setDescription("Replies with Pong");

export async function execute(interaction: ChatInputCommandInteraction) {
  await interaction.reply({ embeds: [creditsEmbed], ephemeral: true });
}
