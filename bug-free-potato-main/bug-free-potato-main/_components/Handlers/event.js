module.exports = (client, message) => {

    try {

        /* Core Events */
        client.on("message", (message) => require("../Events/message.js")(client, message));
        client.on("ready", () => require("../Events/ready.js")(client, message));

        /* Guild Events */
        client.on("guildMemberAdd", (member) => require("../Events/guildMemberAdd.js")(client, member, message));
        client.on("guildMemberRemove", (member) => require("../Events/guildMemberRemove.js")(client, member));

    } catch (err) {
        client.logger(err, "error")
    }
}