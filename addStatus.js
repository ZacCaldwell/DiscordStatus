const { Client, Intents } = require("discord.js");
const config = require('./config.json')
const status = require('./models/savedStatus')
const thing = require('./main.js')

const client = new Client({
    intents: ["GUILDS", 'GUILD_MESSAGES', 'GUILD_MEMBERS', 'DIRECT_MESSAGES'],
    partials: ['CHANNEL', 'MESSAGE', 'REACTION'],
});

client.on("ready", () => {
    client.user.setActivity("You have been warned...", {
        type: "PLAYING",
    });
    console.log("Bot online");
});

client.on("messageCreate", (message) => {
    if (message.channelId !== config.channelID) return;
    if (message.author.bot) return;
    if (message.content === '!nextstatus') {
        thing.updateStatus()
        message.reply('Status has been refreshed')
        return
    }
    let newData = new status({
        status: message.content
    })
    newData.save();
    message.reply('Added status to queue')
});

client.login(config.botToken);