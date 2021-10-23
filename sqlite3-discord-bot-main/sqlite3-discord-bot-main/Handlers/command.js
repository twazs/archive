module.exports = (client) => {

    /* Commands Here */
    client.commands.set('unblacklist', require("../Commands/Owner/unblacklist.js"));
    client.commands.set('blacklist', require("../Commands/Owner/blacklist.js"));
    client.commands.set('eg', require("../Commands/General/example.js"));
}