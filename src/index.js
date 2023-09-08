import { config } from 'dotenv';
import { Client, GatewayIntentBits, Routes } from 'discord.js';
import { REST } from '@discordjs/rest';
import pingCommand from './commands/ping.js';
import rolesCommand from './commands/roles.js';
import usersCommand from './commands/user.js';
import channelsCommand from './commands/channel.js';    

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
    } else if (interaction.commandName === 'addrole') {
        const role = interaction.options.getRole('newrole');
        await interaction.reply(`Role: ${role}!`);
    } else if (interaction.commandName === 'users') {
        // tag the user
        const user = interaction.options.getUser('user');
        await interaction.reply(`User: ${user}`);
    } else if (interaction.commandName === 'channels') {
        // tag the channel
        const channel = interaction.options.getChannel('channel');
        await interaction.reply(`Channel: ${channel}`);
    }
});

async function main() {

    const commands = [pingCommand, rolesCommand, usersCommand, channelsCommand];


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