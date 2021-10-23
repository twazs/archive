module.exports = (client, message) => {

    /* Core Events */
    client.on("message", (message) => require("../Events/message.js")(client, message));
    client.on("ready", () => require("../Events/ready.js")(client, message));
}