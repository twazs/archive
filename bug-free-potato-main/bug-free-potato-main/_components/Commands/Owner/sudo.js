const Discord = require("discord.js")
const chalk = require("chalk");

module.exports = async(client, message, args) => {
    message.delete()
    if (!client.config.owners.includes(message.author.id)) {
        let userAccess = new Discord.MessageEmbed()
            .setDescription(`${message.author.tag}, you don't have owner access.`)
            .setColor(client.colors.RED)
        message.channel.send(userAccess)
    }
    if (client.config.owners.includes(message.author.id)) {
        try {

            let normalContent = args.join(" ")
            message.channel.send(normalContent, { disableEveryone: true })

        } catch (err) {
            client.logger(err, "error")
            let errorEmbed = new Discord.MessageEmbed()
                .setAuthor(`An error has occured`, client.icons.erroricon)
                .setDescription(err)
                .setColor(client.colors.RED)
            message.channel.send(errorEmbed)
        }
    }
}