const Discord = require("discord.js");

module.exports = (client, message) => {
    if (message.author.bot) return;
    if (message.channel.type === "dm") {
        client.logger(`${message.author.tag} has sent you a message... (${message.content})`, "dmMessage")
        let personDM = new Discord.MessageEmbed()
            .setAuthor(`Messaged Received`, message.author.displayAvatarURL({ type: "gif" }))
            .setDescription(`${message.author.tag}, I have sent your message to the owners`)
            .setColor(client.colors.GREEN)
        return message.channel.send(personDM)
    }

    if (message.content.indexOf(client.config.prefix) !== 0) return;

    const args = message.content.slice(client.config.prefix.length).trim().split(/ +/g);

    const command = args.shift().toLowerCase();

    if (!client.commands.has(command)) {
        client.logger(`${message.author.tag} tried executing a command that doesn't exist`, "unknownCommand")
        let unknownCMD = new Discord.MessageEmbed()
            .setAuthor(`Unknown Command`, message.author.displayAvatarURL({ type: "gif" }))
            .setDescription(`${message.author.tag}, that's not a command i recognize :(`)
            .setColor(client.colors.RED)
        return message.channel.send(unknownCMD)
    }

    client.commands.get(command)(client, message, args)

    client.logger(`${message.author.tag} has executed the command ${command} in ${message.guild.name}`, "command")
}