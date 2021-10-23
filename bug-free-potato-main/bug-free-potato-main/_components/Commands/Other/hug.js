const Discord = require("discord.js");
const fetch = require("node-fetch")

module.exports = async(client, message, args) => {
    try {

        if (!args[0]) {
            let userNaN = new Discord.MessageEmbed()
                .setAuthor(`Invalid User`, client.icons.erroricon)
                .setDescription(`Please enter a to user hug!`)
                .setColor(client.colors.RED)
            message.channel.send(userNaN)
        }

        let hugAPI = await fetch("https://api.client.gg/hug.php").then(response => response.text());
        let inputUser = message.guild.member(message.mentions.users.first())

        let hugUser = new Discord.MessageEmbed()
            .setDescription(`***${message.author.username} hugged ${inputUser.user.username}***`)
            .setImage(hugAPI)
            .setColor(client.colors.GREEN)
        message.channel.send(hugUser)

    } catch (err) {
        client.logger(err, "error")
        let errorEmbed = new Discord.MessageEmbed()
            .setAuthor(`An error has occured`, client.icons.erroricon)
            .setDescription(err)
            .setColor(client.colors.RED)
        message.channel.send(errorEmbed)
    }
}