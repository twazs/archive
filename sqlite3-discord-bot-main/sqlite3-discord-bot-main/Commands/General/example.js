const Discord = require("discord.js");

module.exports = async(client, message) => {
    message.channel.send('hi')

    let embed = new Discord.MessageEmbed()
        .setDescription(`hi`)
        .setColor("GREEN")
    message.channel.send(embed)
}