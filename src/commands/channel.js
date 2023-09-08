import { SlashCommandBuilder } from '@discordjs/builders';

const channelsCommand = new SlashCommandBuilder()
    .setName('channels')
    .setDescription('channels cmd')
    .addChannelOption(option =>
        option.setName('channel')
            .setDescription('channel')
            .setRequired(true)
        )
    .addBooleanOption(option => 
        option.setName('deletemsgs')
        .setDescription('delete messages?')
        .setRequired(true)
        )
    .addIntegerOption(option => 
        option.setName('numberofmsgs')
        .setDescription('number of messages to delete')
    )
    .addAttachmentOption(option =>
        option.setName('attachment')
        .setDescription('attachment')
        );


export default channelsCommand.toJSON();