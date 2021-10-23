const Eris = require("eris");
const { token, botname } = require("./config.json");

let client = new Eris.CommandClient(token, {}, {
    owner: ['Tazhys#3902'],
    description: 'speed coding bot',
    prefix: "@mention",
    autoReconnect: true,
    defaultHelpCommand: false,
    ignoreSelf: true,
    ignoreBots: true
});

client.on("ready", () => {
    console.log(`${botname} is now reporting for duty!`);
    client.editStatus(null, {name: `something here`, type: 0});
});

client.registerCommand('merp', (msg) => {
    msg.channel.createMessage(`Hi der, i have merped you!`)
});

client.connect();