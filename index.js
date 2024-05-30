require('dotenv').config();
const fs = require('fs');
const { Client, Collection, Intents } = require('discord.js');

const discordBotClient = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]
});

discordBotClient.commands = new Collection();

try {
    const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
    for (const fileName of commandFiles) {
        const commandModule = require(`./commands/${fileName}`);
        discordBotClient.commands.set(commandModule.data.name, commandModule);
    }
} catch (error) {
    console.error("Error loading commands: ", error);
}

try {
    const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));
    for (const eventName of eventFiles) {
        const eventModule = require(`./events/${eventName}`);
        
        if (eventModule.once) {
            discordBotClient.once(eventModule.name, (...args) => eventModule.execute(...args).catch(error => console.error(error)));
        } else {
            discordBotClient.on(eventModule.name, (...args) => eventModule.execute(...args).catch(error => console.error(error)));
        }
    }
} catch (error) {
    console.error("Error loading events: ", error);
}

discordBotClient.login(process.env.DISCORD_TOKEN).catch(error => {
    console.error("Error logging in: ", error);
});

discordBotClient.on('error', error => console.error('Discord client error: ', error));
discordBotClient.on('unhandledRejection', error => console.error('Unhandled promise rejection: ', error));