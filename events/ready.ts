import { Events, ActivityType } from "discord.js";

export const name = Events.ClientReady;

export const execute = async (client) => {
  console.log(`Logged in as ${client.user.tag}`);
  client.user.setActivity("DM me to use Mod Mail!", {
    type: ActivityType.Watching,
  });
};
