const express = require("express");
const app = express();

//----------DISCORD-BOT-REQUIRED-STUFF----------//

const Discord = require("discord.js");
const { botoken, prefix } = require("./Configuration/botconfig.json")
const bot = new Discord.Client({
    fetchAllMembers: true,
    disableMentions: "everyone"
});

bot.on("ready", async() => {
    console.log("hi")
});

bot.on("message", async message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();
    const params = message.content.split(" ").slice(1);

    if (command === 'owner') {
        let botID = message.mentions.users.first() || bot.users.cache.get(params[0]);
        if (!botID) return message.channel.send(`no bot lol`);

        let ownerCMD = new Discord.MessageEmbed()
            .setDescription(`${botID.tag} is owned by someone lul`)
            .setColor("GREEN")
        message.channel.send(ownerCMD)
    }
});

bot.login(botoken)

//----------COMPONENTS---------- //
const middleware = require("./_components/middleware");

//----------EXPRESS---------- //
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views')
app.use(express.static(__dirname + '/public'))
app.use(express.static(__dirname + '/views'))
app.use(express.json());
app.use(express.urlencoded());

app.get('/', (req, res, next) => {
    res.render('index.ejs', {
        req: req,
        bot: bot
    });
});

try {
    app.use(middleware.notfound({ bot: bot }));
} catch (err) {
    app.use(middleware.internalError({ bot: bot }));
}

app.listen(8080);