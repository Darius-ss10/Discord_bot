import { config } from 'dotenv';
import { Client, GatewayIntentBits, ModalBuilder, Routes, SelectMenuBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder, InteractionType, ButtonBuilder, ButtonStyle } from 'discord.js';
import { REST } from '@discordjs/rest';
import pingCommand from './commands/ping.js';
import rolesCommand from './commands/roles.js';
import usersCommand from './commands/user.js';
import channelsCommand from './commands/channel.js';    
import banCommand from './commands/ban.js';
import registerCommand from './commands/register.js';
import buttonCommand from './commands/button.js';

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

client.on('messageCreate', async message => {
    if (message.author.bot) return;

    await message.channel.send({ content: 'Hello, world!', components: [
        new ActionRowBuilder().setComponents(
            new ButtonBuilder()
                .setCustomId('button1')
                .setLabel('Click me!')
                .setStyle(ButtonStyle.Primary),
            new ButtonBuilder()
                .setCustomId('button2')
                .setLabel('Click me too!')
                .setStyle(ButtonStyle.Primary),
            new ButtonBuilder()
                .setLabel('Click me three!')
                .setStyle(ButtonStyle.Link)
                .setURL('https://www.google.com')
                
        )
    ]})
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
        } else if (interaction.commandName === 'register') {
            const modal = new ModalBuilder()
                .setTitle('Register')
                .setCustomId('register')
                .setComponents(
                    new ActionRowBuilder().setComponents(
                        new TextInputBuilder()
                            .setLabel('name')
                            .setCustomId('name')
                            .setStyle(TextInputStyle.Short)
                    ),
                    new ActionRowBuilder().setComponents(
                        new TextInputBuilder()
                            .setLabel('email')
                            .setCustomId('email')
                            .setStyle(TextInputStyle.Short)
                    ),
                    new ActionRowBuilder().setComponents(
                        new TextInputBuilder()
                            .setLabel('comment')
                            .setCustomId('comment')
                            .setStyle(TextInputStyle.Paragraph)
                    )
                );

            interaction.showModal(modal);
        } else if (interaction.commandName === 'button') {
            interaction.reply({ 
                content: 'Click the button!', components: [
                    new ActionRowBuilder().setComponents(
                        new ButtonBuilder()
                            .setCustomId('button1')
                            .setLabel('Click me!')
                            .setStyle(ButtonStyle.Primary),
                        new ButtonBuilder()
                            .setCustomId('button2')
                            .setLabel('Click me too!')
                            .setStyle(ButtonStyle.Primary),
                        new ButtonBuilder()
                            .setLabel('Click me three!')
                            .setStyle(ButtonStyle.Link)
                            .setURL('https://www.google.com')
                            
                    )
                ] 
            });
        }
    } else if (interaction.isSelectMenu()) {
        if (interaction.customId === 'cities') {
            const city = interaction.values[0];
            await interaction.reply(`City: ${city}`);
        } else if (interaction.customId === 'day') {
            const day = interaction.values[0];
            await interaction.reply(`Day: ${day}`);
        }
        
    } else if (interaction.type === InteractionType.ModalSubmit) {
        if (interaction.customId === 'register') {
            const name = interaction.fields.getTextInputValue('name');
            const email = interaction.fields.getTextInputValue('email');
            const comment = interaction.fields.getTextInputValue('comment');
            await interaction.reply(`Name: ${name}, Email: ${email}, Comment: ${comment}`);
        }
    } else if (interaction.isButton()) {
        if (interaction.customId === 'button1') {
            await interaction.reply('Button 1 clicked!');
        } else if (interaction.customId === 'button2') {
            await interaction.reply('Button 2 clicked!');
        }
    }

});

async function main() {

    const commands = [
        pingCommand, 
        rolesCommand, 
        usersCommand, 
        channelsCommand, 
        banCommand,
        registerCommand,
        buttonCommand
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