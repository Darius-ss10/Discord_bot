import { SlashCommandBuilder } from '@discordjs/builders';

const pingCommand = new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Pings a city on a specific day!')
        /*
        .addStringOption(option =>
            option.setName('city')
                .setDescription('Choose a city')
                .setRequired(true)
                .setChoices({
                    name: 'New York',
                    value: 'New York'
                },
                {
                    name: 'London',
                    value: 'London'
                },
                {
                    name: 'Paris',
                    value: 'Paris'
                })
            )
        .addStringOption(option =>
            option.setName('day')
                .setDescription('Choose a day')
                .setRequired(true)
                .setChoices({
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
                })
            );
            */


export default pingCommand.toJSON();