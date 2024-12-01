//Return 'g' if guild is selected
//Returm 'm' if member is selected
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
        .setDescription(`Do you want to edit your Personal or the Server's ` + str);
    const memberButton = new ButtonBuilder()
        .setCustomId("member")
        .setLabel("Edit or Display Personal " + str)
        .setStyle(ButtonStyle.Secondary);
    const imageButton = new ButtonBuilder()
        .setCustomId("guild")
        .setLabel("Edit or Display Server " + str)
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