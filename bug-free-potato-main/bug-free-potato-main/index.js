const Discord = require("discord.js");
const client = new Discord.Client({
    fetchAllMembers: true,
    fetchAllChannels: true
});

/* Collectors / Configuration */
client.customChannels = require("./_components/Settings/channels.json");
client.config = require("./_components/Settings/config.json");
client.commands = new Discord.Collection();
client.footer = `Something here :D`;

/* Handlers */
require("./_components/Handlers/command.js")(client);
require("./_components/Handlers/event.js")(client);

/* Utils */
client.colors = require("./_components/Utils/colors.json");
client.emoji = require("./_components/Utils/emojis.json");
client.icons = require("./_components/Utils/icons.json");
client.logger = require("./_components/Utils/logger.js");

/* Error Controlling */
client.on("error", (error) => client.logger(error, "error"));
client.on("warn", (warn) => client.logger(warn, "warn"));

process.on('unhandledRejection', (error) => {
    client.logger("[UNHANDLED REJECTION] " + (error.stack == undefined ? error.stack : error.stack), "warn");
});

process.on('uncaughtException', (err) => {
    client.logger("[UNCAUGHT EXCEPTION] " + (err.stack == undefined ? err : err.stack), "error");
});

client.login(client.config.token);