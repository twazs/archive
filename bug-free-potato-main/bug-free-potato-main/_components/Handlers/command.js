module.exports = (client) => {

    try {
        /* Main Commands */
        client.commands.set('help', require("../Commands/Main/help.js"));

        /* Owner Commands */
        client.commands.set('eval', require("../Commands/Owner/eval.js"));
        client.commands.set('sudo', require("../Commands/Owner/sudo.js"));

    } catch (err) {
        client.logger(err, "error")
    }
}