const {
    Intents,
    Client,
    Collection
} = require("discord.js");
const { token, name, dapiPost } = require("./_settings/config.json")
const fs = require("fs");
const client = new Client({
    disableMentions: 'everyone',
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]
});
client.commands = new Collection();
global.client = client;

client.on("ready", async() => {

    console.log(`${name} is now logged in!`)

    const cFiles = fs.readdirSync('./_commands/').filter(file => file.endsWith('.js'));
    for (const file of cFiles) {
        const command = require(`./_commands/${file}`);

        if (command.global === true) {
            if (dapiPost) {
                client.api.applications(client.user.id).commands.post({
                    data: {
                        name: command.name,
                        description: command.description,
                        options: command.commandOptions,
                    }
                })
                console.log(`Posting: [ ${command.name} from ${file} (${command.global ? "global" : "guild"}) ]`)
            }
            client.commands.set(command.name, command);
        }
    }
    let cmdArrGlobal = await client.api.applications(client.user.id).commands.get()
    cmdArrGlobal.forEach(element => {
        console.log(`Successfully Loaded: [ ${element.name} (${element.id}) ]`)
    });
});

client.ws.on('INTERACTION_CREATE', async interaction => {
    if (!client.commands.has(interaction.data.name)) return;
    try {
        client.on('interactionCreate', async(int) => {
            client.commands.get(interaction.data.name).execute(interaction, int);
        })
    } catch (error) {
        console.log(`Error Occured => ${interaction.data.name} : ${error.message}`)
        console.log(error.stack)
        client.api.interactions(interaction.id, interaction.token).callback.post({
            data: {
                type: 4,
                data: {
                    content: `Sorry, there was an error executing that command!`
                }
            }
        })
    }
})

client.login(token)