//Send intro to channel
//send trigger to channel

const {
	SlashCommandBuilder,
	EmbedBuilder,
	ButtonBuilder,
	ButtonStyle,
	ActionRowBuilder,
	ModalBuilder,
	TextInputBuilder,
	TextInputStyle,
    ChannelType,
} = require("discord.js");
const Member = require("../../schemas/member");
const Guild = require("../../schemas/guild");
const mongoose = require("mongoose");
const {
	trig_default_color,
	trig_caution_color,
	trig_sus_thumbnail,
	trig_happyhug_thumbnail,
	trig_noting_thumbnail,
} = require("../../assets.json");
let member_is_admin = false;
let memberORguild = "m";
import { mOg } from '../internal/build';

module.exports = {
	data: new SlashCommandBuilder()
		.setName("send")
		.setDescription(
			"Send Intro or Triggers to a Channel."
		)
		.addStringOption((option) =>
			option
				.setName("intro or triggers")
				.setDescription("Display Intro or Trigger")
                .setRequired(true)
                .addChoices(
                    {name: 'intro', value:'intro'},
                    {name: 'trigger', value: 'trigger'}
                )
		)
		.addChannelOption((option) =>
			option
				.setName("channel")
				.setDescription("Channel to send to")
                .setRequired(false)
                .addChannelTypes(ChannelType.GuildText)
		),
	async execute(interaction, client) {
        const choice = interaction.options.getString('type');
        const channel = interaction.options.getChannel('channel') || interaction.channel;

        if (choice === 'intro') {
            //Send
        
        channel.send();
        } else if (choice === 'trigger') {
            //Send
        }
    },
};