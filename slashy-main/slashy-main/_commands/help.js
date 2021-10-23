const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'help',
    description: 'helpful information about the bot',
    commandOptions: null,
    global: true,
    async execute(interaction, int) {
        try {
            const help = new MessageEmbed()
                .setDescription(`commands here pls`)
                .setColor("RANDOM")
            int.reply({ embeds: [help] });
        } catch (err) {
            const errorEmbed = new MessageEmbed()
                .setDescription(`Error: ${err}`)
                .setColor("RED")
            int.reply({ embeds: [errorEmbed] });
        }
    }
}