const Discord = require("discord.js");

module.exports = async(client) => {
    client.logger(`${client.config.botname} is now online serving welcome and goodbye messages`, "gateway")
    client.user.setActivity(`people use my commands`, { type: "WATCHING" })
}