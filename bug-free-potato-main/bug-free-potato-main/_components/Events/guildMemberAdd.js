const Discord = require("discord.js");
const fetch = require("node-fetch");

module.exports = async(client, member, message) => {

    let welcomeAPI = await fetch(`https://api.nooder.gg/wave.php`).then(response => response.text());

    if (member.user.bot) {
        let botJoined = new Discord.MessageEmbed()
            .setAuthor(`Bot Joined`, client.icons.greenrightarrow)
            .setDescription(`${member.user.tag} joined the server!`)
            .setImage(welcomeAPI)
            .setColor(client.colors.GREEN)
            .setFooter(`${member.guild.name} is powered by ${client.config.botname}`)
        client.channels.cache.filter(c => c.id === client.customChannels.welcome).map(channel => channel.send(botJoined))
    } else {
        let memberJoined = new Discord.MessageEmbed()
            .setAuthor(`Member Joined!`, client.icons.greenrightarrow)
            .setDescription(`${member.user.tag} joined the server!`)
            .setImage(welcomeAPI)
            .setColor(client.colors.GREEN)
            .setFooter(`We're now at ${member.guild.memberCount} server members!`)
        client.channels.cache.filter(c => c.id === client.customChannels.welcome).map(channel => channel.send(memberJoined))
    }
}