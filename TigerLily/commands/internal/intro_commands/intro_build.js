const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const Member = require('../../../schemas/member');
const mongoose = require('mongoose');
const { trig_default_color, trig_caution_color,
	 trig_sus_thumbnail, trig_happyhug_thumbnail, trig_noting_thumbnail } = require('../../../assets.json');