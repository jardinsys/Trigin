const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('rawr')
		.setDescription('RAWR! (this is like a ping)'),
	async execute(interaction) {
		await interaction.reply('RAWR!');
	},
};