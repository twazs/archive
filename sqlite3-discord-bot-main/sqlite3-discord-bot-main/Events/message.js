const Discord = require("discord.js");

module.exports = (client, message) => {
    if (message.author.bot) return;
    if (message.channel.type === "dm") return;

    if (message.content.indexOf(client.config.prefix) !== 0) return;

    const args = message.content.slice(client.config.prefix.length).trim().split(/ +/g);

    const command = args.shift().toLowerCase();

    if (!client.commands.has(command)) return;

    client.database.get(`SELECT * FROM blacklist WHERE userID = "${message.author.id}"`, (err, r) => {
        if (err) console.log(err)
        if (r) {
            let blacklistedUserEmbed = new Discord.MessageEmbed()
                .setAuthor(`Access Denied`)
                .setDescription(`***${message.author.tag}, you are blacklisted***`)
                .setColor("RED")
            message.channel.send(blacklistedUserEmbed)
        } else {
            client.commands.get(command)(client, message, args)
        }
    })
    client.logger(`${message.author.tag} has executed the command ${command}`, "command")
}