const Discord = require('discord.js')

module.exports = (client, message, args) => {

    if (!client.config.owners.includes(message.author.id)) {
        let userAccess = new Discord.MessageEmbed()
            .setDescription(`${message.author.tag}, you don't have owner access.`)
            .setColor(client.colors.RED)
        message.channel.send(userAccess)
    }
    if (client.config.owners.includes(message.author.id)) {

        const clean = (text) => {
            if (typeof(text) === 'string') {
                return text.replace(/`/g, '`' + String.fromCharCode(8203)).replace(/@/g, '@' + String.fromCharCode(8203))
            } else {
                return text
            }
        }
        try {
            const code = args.join(' ')
            let evaled = eval(code)

            if (typeof evaled !== 'string') {
                evaled = require('util').inspect(evaled, {
                    depth: 0
                })
            }

            if (evaled.includes(client.token || client.config.discord.token)) {
                evaled = evaled.replace(client.token, 'Failed much, Stop trying to get my bot token.')
            } else {
                message.channel.send(`${clean(evaled)}`, {
                    code: 'fix'
                })
            }
        } catch (err) {
            console.log(err)
            err = err.toString()
            if (err.includes(client.token || config.token)) {
                err = err.replace(client.token, 'REDACTED!')
            }
            message.channel.send(`\`ERROR\` \`\`\`fix\n${clean(err)}\n\`\`\``).catch(console.error);
        }
    }
}