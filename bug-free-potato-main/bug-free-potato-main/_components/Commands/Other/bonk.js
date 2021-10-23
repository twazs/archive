const Discord = require("discord.js");
const fetch = require("node-fetch")

module.exports = async(client, message, args) => {
    try {

        if (!args[0]) {
            let userNaN = new Discord.MessageEmbed()
                .setAuthor(`Invalid User`, client.icons.erroricon)
                .setDescription(`Please enter a to user bonk!`)
                .setColor(client.colors.RED)
            message.channel.send(userNaN)
        }

        let bonkAPI = await fetch("https://api.client.gg/bonk.php").then(response => response.text());
        let inputUser = message.guild.member(message.mentions.users.first())

        let bonkUser = new Discord.MessageEmbed()
            .setDescription(`***${message.author.username} bonked ${inputUser.user.username}***`)
            .setImage(bonkAPI)
            .setColor(client.colors.GREEN)
        message.channel.send(bonkUser)

    } catch (err) {
        client.logger(err, "error")
        let errorEmbed = new Discord.MessageEmbed()
            .setAuthor(`An error has occured`, client.icons.erroricon)
            .setDescription(err)
            .setColor(client.colors.RED)
        message.channel.send(errorEmbed)
    }
}