const chalk = require("chalk");
const sql = require("sqlite3");
const Logger = require("../Utils/logger.js");
const database = new sql.Database("./Database/bot.sqlite");

try {
    Logger(chalk.green(`Initialized`), "database")

    const databaseInit = new Date();
    const tables = {
        blacklist: [
            "id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL",
            "userID TEXT NOT NULL",
            "moderator TEXT NOT NULL",
            "reason TEXT NOT NULL"
        ]
    };

    for (let table in tables) {

        database.run(`CREATE TABLE ${table} (${tables[table].join(", ")})`, () => {
            const readyTime = new Date();
            const TimeTookToLoad = Math.floor((readyTime - databaseInit) / 1000);
            Logger(`Database Took` + chalk.blueBright(` ${TimeTookToLoad}`) + ` second(s) to load table` + chalk.green(` ${table}`), "database")
        });
    }

} catch (err) {
    throw new Error(err.stack)
}

module.exports = database;