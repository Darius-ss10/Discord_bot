import { config } from 'dotenv';
import { Client, GatewayIntentBits, Routes } from 'discord.js';
import { REST } from '@discordjs/rest';

config();

const TOKEN = process.env.DISCORD_BOT_TOKEN;
const CLIENT_ID = process.env.DISCORD_CLIENT_ID;
const GUILD_ID = process.env.DISCORD_GUILD_ID;

const client = new Client({ 
    intents: [
        GatewayIntentBits.Guilds, 
        GatewayIntentBits.GuildMessages, 
        GatewayIntentBits.MessageContent] 
    });

const rest = new REST({ version: '10' }).setToken(TOKEN);

client.on('ready', () => {
  console.info(`Logged in as ${client.user.tag}!`);
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === 'ping') {
        const city = interaction.options.get('city').value;
        const day = interaction.options.get('day').value;
        await interaction.reply(`Pong ${city} on ${day}!`);
    }
});

async function main() {
    const commands = [{
        name: 'ping',
        description: 'Pings a city on a specific day!',
        options: [{
            name: 'city',
            type: 3,
            description: 'Choose a city',
            required: true,
            choices: [
                {
                    name: 'Paris',
                    value: 'Paris'
                },
                {
                    name: 'Rome',
                    value: 'Rome'
                },
                {
                    name: 'London',
                    value: 'London'
                }
            ]
        },
        {   
            name: 'day',
            type: 3,
            description: 'Choose a day',
            required: true,
            choices: [
                {
                    name: 'Monday',
                    value: 'Monday'
                },
                {
                    name: 'Tuesday',
                    value: 'Tuesday'
                },
                {
                    name: 'Wednesday',
                    value: 'Wednesday'
                }
            ]
        }]
    }];


    try {
        console.log('Started refreshing application (/) commands.');
        await rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), { 
            body: commands
        });

        client.login(TOKEN);

    } catch (error) {
        console.error(error);
    }
}

main();