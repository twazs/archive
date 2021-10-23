const Discord = require("discord.js");
const client = new Discord.Client({
    fetchAllMembers: true,
    fetchAllGuilds: true
});

/* Collections */
client.commands = new Discord.Collection()

/* Configuration */
client.config = require("./Settings/config.json");
client.database = require("./Database/sql.js");
client.footer = `something here.`;

/* Handlers */
require("./Handlers/command.js")(client);
require("./Handlers/event.js")(client);

/* Utils */
client.logger = require("./Utils/logger.js");

/* Error Controlling */
client.on("error", (error) => client.logger(error, "error"));
client.on("warn", (warn) => client.logger(warn, "warn"));

process.on('unhandledRejection', (error) => {
    client.logger("[UNHANDLED REJECTION] " + (error.stack == undefined ? error.stack : error.stack), "warn");
});

process.on('uncaughtException', (err) => {
    client.logger("[UNCAUGHT EXCEPTION] " + (err.stack == undefined ? err : err.stack), "error");
});

client.login(client.config.token)