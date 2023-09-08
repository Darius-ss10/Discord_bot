import { SlashCommandBuilder } from '@discordjs/builders';

const rolesCommand = new SlashCommandBuilder()
    .setName('addrole')
    .setDescription('Adds a role to a user!')
    .addRoleOption(option =>
        option.setName('newrole')
            .setDescription('Add a role to a user')
            .setRequired(true)
        )


export default rolesCommand.toJSON();