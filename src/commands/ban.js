import { SlashCommandBuilder } from '@discordjs/builders';

const banCommand = new SlashCommandBuilder()
    .setName('ban')
    .setDescription('Bans a user!')
    .addSubcommandGroup(subcommandGroup =>
        subcommandGroup
            .setName('ban_group')
            .setDescription('Ban group')
            .addSubcommand(subcommand =>
                subcommand
                    .setName('temp')
                    .setDescription('Temporarily bans a user')
                    .addUserOption(option =>
                        option.setName('target')
                            .setDescription('The user to ban')
                            .setRequired(true)
                    )
                    .addStringOption(option =>
                        option.setName('reason')
                            .setDescription('The reason for the ban')
                            .setRequired(true)
                    )
            ).addSubcommand(subcommand =>
                subcommand
                    .setName('perm')
                    .setDescription('Permanently bans a user')
                    .addUserOption(option =>
                        option.setName('target')
                            .setDescription('The user to ban')
                            .setRequired(true)
                    )
                    .addStringOption(option =>
                        option.setName('reason')
                            .setDescription('The reason for the ban')
                            .setRequired(true)
                    )
            )
        );


export default banCommand.toJSON();