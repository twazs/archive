const Discord = require("discord.js");

module.exports = async(client, message, args) => {
    try {
        if (!client.config.developers.includes(message.author.id)) {
            let userAccess = new Discord.MessageEmbed()
                .setAuthor(`Access Denied`)
                .setDescription(`${message.author.tag}, you don't have developer access.`)
                .setColor("RED")
            message.channel.send(userAccess)
        }
        if (client.config.developers.includes(message.author.id)) {

            let invalidInput = new Discord.MessageEmbed()
                .setAuthor(`Invalid Arguments`)
                .setDescription(`Please provide the correct arguments!`)
                .setColor("RED")
            if (!args[0]) return message.channel.send(invalidInput)

            const blacklistTarget = message.guild.member(message.mentions.users.first()) || message.guild.members.cache.get(args[0]);
            let blacklistReason = args.slice(1).join(" ");
            if (!blacklistReason) blacklistReason = `No reason specified`;

            let targetNotFound = new Discord.MessageEmbed()
                .setAuthor(`Invalid User`)
                .setDescription(`Please provide a valid user!`)
                .setColor("RED")
            if (!blacklistTarget) return message.channel.send(targetNotFound)

            await client.database.get(`SELECT * FROM blacklist WHERE userID = ?`, blacklistTarget.id, async(err, r) => {
                if (err) return console.log(err);

                let userExist = new Discord.MessageEmbed()
                    .setAuthor(`Blacklist Error`)
                    .setDescription(`That user is already blacklisted!`)
                    .setColor("RED")
                if (r) return message.channel.send(userExist)

                await client.database.run(`INSERT INTO blacklist (userID, moderator, reason) VALUES (?, ?, ?)`, blacklistTarget.id, message.author.tag, blacklistReason, async(err) => {
                    if (err) return console.log(err);

                    let blacklistedUser = new Discord.MessageEmbed()
                        .setAuthor(`User Blacklisted`)
                        .setDescription(`***${blacklistTarget.user.username} was blacklisted***`)
                        .setColor("GREEN")
                    message.channel.send(blacklistedUser)
                });
            });
        }
    } catch (err) {
        client.logger(err, "error")
        let errorEmbed = new Discord.MessageEmbed()
            .setAuthor(`An error has occured`)
            .setDescription(err)
            .setColor("RED")
        message.channel.send(errorEmbed)
    }
}