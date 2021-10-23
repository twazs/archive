const Discord = require("discord.js");
const fetch = require("node-fetch");

module.exports = async(client, member, message) => {

    let leaveAPI = await fetch(`https://api.nooder.gg/cry.php`).then(response => response.text());

    if (member.user.bot) {
        let botLeft = new Discord.MessageEmbed()
            .setAuthor(`Bot Left`, client.icons.greenrightarrow)
            .setDescription(`${member.user.tag} Left the server!`)
            .setImage(leaveAPI)
            .setColor(client.colors.GREEN)
            .setFooter(`${member.guild.name} is powered by ${client.config.botname}`)
        client.channels.cache.filter(c => c.id === client.customChannels.welcome).map(channel => channel.send(botLeft))
    } else {
        let memberLeft = new Discord.MessageEmbed()
            .setAuthor(`Member Left!`, client.icons.greenrightarrow)
            .setDescription(`${member.user.tag} Left the server!`)
            .setImage(leaveAPI)
            .setColor(client.colors.GREEN)
            .setFooter(`We're now at ${member.guild.memberCount} server members!`)
        client.channels.cache.filter(c => c.id === client.customChannels.welcome).map(channel => channel.send(memberLeft))
    }
}