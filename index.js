require('dotenv').config();
const fs = require('fs');
const { Client, Collection, Intents } = require('discord.js');

const discordBotClient = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]
});

discordBotClient.commands = new Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const fileName of commandFiles) {
    const commandModule = require(`./commands/${fileName}`);
    discordBotClient.commands.set(commandModule.data.name, commandModule);
}

const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));
for (const eventName of eventFiles) {
    const eventModule = require(`./events/${eventName}`);
    if (eventModule.once) {
        discordBotClient.once(eventModule.name, (...args) => eventModule.execute(...urlargs));
    } else {
        discordBotClient.on(eventModule.name, (...args) => eventModule.execute(...args));
    }
}

discordBotClient.login(process.env.DISCORD_TOKEN);