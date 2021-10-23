const Discord = require("discord.js");

module.exports = (client, message) => {
    try {

        let help = new Discord.MessageEmbed()
            .setDescription(`${message.author.tag}, please refer to the [documentation](https://github.com/Tazhys/)`)
            .setColor(client.colors.RED)
        message.channel.send(help)

        let notice = new Discord.MessageEmbed()
            .setDescription(`${message.author.tag}, once you have setup the bot you can safely remove this command`)
            .setColor(client.colors.GREEN)
        message.channel.send(notice)

    } catch (err) {
        client.logger(err, "error")
        let errorEmbed = new Discord.MessageEmbed()
            .setAuthor(`An error has occured`, client.icons.erroricon)
            .setDescription(err)
            .setColor(client.colors.RED)
        message.channel.send(errorEmbed)
    }
}