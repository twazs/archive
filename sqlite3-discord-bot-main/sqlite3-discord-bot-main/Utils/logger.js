const colors = require("colors");

module.exports = function(logMessage, type = "info") {

    let logString;
    let logFormatting;

    switch (type) {
        case "gateway":
            logString = colors.white(logMessage)
            logFormatting = colors.bgGreen(colors.white(colors.bold("[ GATEWAY ]")));
            break;
        case "command":
            logString = colors.white(logMessage)
            logFormatting = colors.bgGreen(colors.white(colors.bold("[ COMMAND ]")));
            break;
        case "event":
            logString = colors.white(logMessage)
            logFormatting = colors.bgGreen(colors.white(colors.bold("[ EVENTS ]")));
            break;
        case "database":
            logString = colors.white(logMessage)
            logFormatting = colors.bgBlue(colors.white(colors.bold("[ DATABASE ]")));
            break;
        case "error":
            logString = colors.white(logMessage)
            logFormatting = colors.bgRed(colors.white(colors.bold("[ ERROR ]")));
            break;
        case "warn":
            logString = colors.white(logMessage)
            logFormatting = colors.bgYellow(colors.white(colors.bold("[ WARN ]")));
            break;
    }
    console.log(logFormatting, logString);
}