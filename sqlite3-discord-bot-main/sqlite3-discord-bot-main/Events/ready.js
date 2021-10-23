const Discord = require("discord.js");
const moment = require("moment");

module.exports = async(client) => {

    client.logger(`${client.config.botname} is now online serving ${client.guilds.cache.size} guilds`, "gateway")
    client.user.setActivity(`something`, { type: "PLAYING" })
}