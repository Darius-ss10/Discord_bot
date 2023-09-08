import { config } from 'dotenv';
import { Client, GatewayIntentBits, Routes, SelectMenuBuilder } from 'discord.js';
import { REST } from '@discordjs/rest';
import pingCommand from './commands/ping.js';
import rolesCommand from './commands/roles.js';
import usersCommand from './commands/user.js';
import channelsCommand from './commands/channel.js';    
import banCommand from './commands/ban.js';
import { ActionRowBuilder, StringSelectMenuBuilder } from '@discordjs/builders';

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
    if (interaction.isChatInputCommand()) {
        if (interaction.commandName === 'ping') {
            const actionRowComponent = new ActionRowBuilder().setComponents(
                new SelectMenuBuilder()
                    .setCustomId('cities')
                    .setOptions([
                        {
                            label: 'Paris',
                            description: 'The city of love',
                            value: 'Paris',
                        },
                        {
                            label: 'New York',
                            description: 'The city that never sleeps',
                            value: 'New York',
                        },
                        {
                            label: 'London',
                            description: 'The capital of England',
                            value: 'London',
                        }
                    ])
            );
            const actionRowComponent2 = new ActionRowBuilder().setComponents(
                new SelectMenuBuilder()
                    .setCustomId('day')
                    .setOptions([
                        {
                            label: 'Monday',
                            description: 'The first day of the week',
                            value: 'Monday',
                        },
                        {
                            label: 'Tuesday',
                            description: 'The second day of the week',
                            value: 'Tuesday',
                        },
                        {
                            label: 'Wednesday',
                            description: 'The third day of the week',
                            value: 'Wednesday',
                        }
                    ])
            );
            interaction.reply({components: [actionRowComponent.toJSON(), actionRowComponent2.toJSON()] });
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
        } else if (interaction.commandName === 'ban') {
            // ban the user
            const user = interaction.options.getUser('target');
            await interaction.reply(`User: ${user}`);
        }
    } else if (interaction.isSelectMenu()) {
        if (interaction.customId === 'cities') {
            const city = interaction.values[0];
            await interaction.reply(`City: ${city}`);
        } else if (interaction.customId === 'day') {
            const day = interaction.values[0];
            await interaction.reply(`Day: ${day}`);
        }
        
    }

});

async function main() {

    const commands = [
        pingCommand, 
        rolesCommand, 
        usersCommand, 
        channelsCommand, 
        banCommand
    ];


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