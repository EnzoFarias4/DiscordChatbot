require('dotenv').config();
const fs = require('fs');
const { Client, Collection, Intents } = require('discord.js');

const discordBotClient = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

discordBotClient.commands = new Collection();

function loadCommands() {
    try {
        const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
        for (const fileName of commandFiles) {
            const commandModule = require(`./commands/${fileName}`);
            // Basic validation to ensure the commandModule is properly structured.
            if (!commandModule.data || !commandModule.data.name) throw new Error(`The command file ${fileName} does not properly export a command.`);
            discordBotClient.commands.set(commandModule.data.name, commandModule);
        }
    } catch (error) {
        console.error("Error loading commands: ", error);
    }
}

function loadEvents() {
    try {
        const eventFiles = fs.readdirCLync('./events').filter(file => file.endsWith('.js'));
        for (const eventName of eventFiles) {
            const eventModule = require(`./events/${eventName}`);
            if (!eventModule.execute || typeof eventModule.execute !== 'function' || !eventModule.name) {
                throw new Error(`Event file ${eventName} does not properly export an execute function or a name.`);
            }
            if (eventModule.once) {
                discordBotClient.once(eventModule.name, (...args) => eventModule.execute(...args).catch(error => console.error(error)));
            } else {
                discordBotClient.on(eventModule.name, (...args) => eventModule.execute(...args).catch(error => console.error(error)));
            }
        }
    } catch (error) {
        console.error("Error loading events: ", error);
    }
}

// Load commands and events
loadCommands();
loadEvents();

// Login to Discord
discordBotClient.login(process.env.DISCORD_TOKEN).catch(error => {
    console.error("Error logging in: ", error);
});

discordBotClient.on('error', error => console.error('Discord client error: ', error));
discordBotClient.on('unhandledRejection', error => console.error('Unhandled promise rejection: ', error));