//Return 'g' if guild is selected
//Returm 'm' if member is selected

const {
	SlashCommandBuilder,
	EmbedBuilder,
	ButtonBuilder,
	ButtonStyle,
	ActionRowBuilder,
	ModalBuilder,
	TextInputBuilder,
	TextInputStyle,
} = require("discord.js");
const Guild = require("../../schemas/guild");
const mongoose = require("mongoose");
const {
	trig_default_color,
	trig_caution_color,
	trig_sus_thumbnail,
	trig_happyhug_thumbnail,
	trig_noting_thumbnail,
} = require("../../assets.json");

export function mOg(str) {
    const memberOrGuild_message = new EmbedBuilder()
        .setTitle('Hello bot admin')
        .setDescription(`Do you want your Personal or the Server's ` + str +"?");
    const memberButton = new ButtonBuilder()
        .setCustomId("member")
        .setLabel("Personal " + str)
        .setStyle(ButtonStyle.Secondary);
    const imageButton = new ButtonBuilder()
        .setCustomId("guild")
        .setLabel("Server " + str)
        .setStyle(ButtonStyle.Secondary);
    const mOgActions = new ActionRowBuilder().addComponents(memberButton, imageButton);

    message.channel.send({ embeds: [memberOrGuild_message], components: [mOgActions], ephemeral: hidden });
    //memberORguild = ?;
    client.once('interactionCreate', async interaction => {
        if (interaction.customId === 'member')
            return "m";
        if (interaction.customId === 'guild')
            return "g";
    });
}

export function int_member_is_admin(guildProfile){
    let member_is_admin = false;
    //Check Membeer IDs
    if (interaction.member.permissions.has(PermissionFlagsBits.Administrator))
        member_is_admin = true;
    else if (guildProfile.guildAdmimMemberIds.find(interaction.user.id))
        member_is_admin = true;
    //Check Role IDs
    else {
        for (let r in guildProfile.guildAdminRoleIds) {
            if (interaction.member.roles.cache.has(r)) {
                member_is_admin = true;
                break;
            }
        }
    }
    return member_is_admin;
}