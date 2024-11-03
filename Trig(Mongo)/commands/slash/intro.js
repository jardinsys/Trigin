const { SlashCommandBuilder, EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');
const Member = require('../../schemas/member');
const mongoose = require('mongoose');
const { trig_default_color, trig_caution_color,
	 trig_sus_thumbnail, trig_happyhug_thumbnail, trig_noting_thumbnail } = require('../../assets.json');
let isCreating = false;

function make_display(diplay_card){ //Display the intro in its current state for an individal member
	let title = `${memberProfile.memberDisplayName}*(${memberProfile.memberPronouns})* Intro!`;
	display_card.setDescription(memberProfile.memberIntroDescription)
		.setColor(memberProfile.memberIntroDisplayColor)
		.setThumbnail(memberProfile.memberIntroDisplayThumbnail);
		if (hasPremium){
		if(memberProfile.memberIntroCustomTitle){title = memberProfile.memberIntroCustomTitle;}
		if(memberProfile.memberIntroDisplayBanner){
			display_card.setImage(memberProfile.memberIntroDisplayBanner);
		}
		if(memberProfile.memberIntroFooter && memberProfile.memberIntroFooterIcon){
			display_card.setFooter({
				iconURL: memberProfile.memberIntroFooterIcon,
				text: memberProfile.memberIntroFooter
			});
		} else if(memberProfile.memberIntroFooter && !memberProfile.memberIntroFooterIcon){
			display_card.setFooter({
				text: memberProfile.memberIntroFooter
			});
		} else if(!memberProfile.memberIntroFooter && memberProfile.memberIntroFooterIcon){
			display_card.setFooter({
				iconURL: memberProfile.memberIntroFooterIcon
			});
		}
		if(memberProfile.memberIntroHeader && memberProfile.memberIntroHeaderIcon){
			display_card.setAuthor({
				iconURL: memberProfile.memberIntroHeaderIcon,
				text: memberProfile.memberIntroHeader
			});
		} else if(memberProfile.memberIntroHeader && !memberProfile.memberIntroHeaderIcon){
			display_card.setAuthor({
				text: memberProfile.memberIntroHeader
			});
		} else if(!memberProfile.memberIntroHeader && memberProfile.memberIntroHeaderIcon){
			display_card.setAuthor({
				iconURL: memberProfile.memberIntroHeaderIcon
			});
		}
	}
	display_card.setTitle(title);
	return display_card;
}

//Make guild display

// (currently a single command, make a button mene option)
module.exports = {
	data: new SlashCommandBuilder()
		.setName('intro')
		.setDescription('Create, Edit, or Display an introduction for yourself (or guild if your an admin).')
		.addBooleanOption(option =>
			option.setName('display only')
			.setDescription('Just display your intro, no editing'))
		.addBooleanOption(option =>
			option.setName('hidden')
			.setDescription('Only you see what we do here privately')),
	async execute(interaction, client) {
		let display_on = interaction.options.getBoolean('display only');
		let hidden = interaction.options.getBoolean('hidden');
		let memberProfile = await Member.findOne({memberId: interaction.user.id})

		//Make Button Options for Guild or Individal option
		if (!display_on){
			;
		}


		/*CREATION INTRO*/
		if (!memberProfile){
			memberProfile = await new Member({
				_id: mongoose.Types.ObjectId(),
				memberId: interaction.user.id,
				memberPremium: false
			});
		 await memberProfile.save().catch(console.error);
		 isCreating = true;
		 const newuser_message = new EmbedBuilder()
		 	.setTitle(`Looks like you're new here...'`)
			.setDescription('Welcome to TrigIn!....(continue description)') 
			.setColor(trig_caution_color)
			.setThumbnail(trig_sus_thumbnail)
			.setTimestamp(Date.now())
			.setFooter({
				iconURL: trig_happyhug_thumbnail,
				text: 'Nice to meet you and Stay Safe!'
			});
			message.channel.send({embeds: [newuser_message]});
		}

		const hasPremium = memberProfile.memberPremium;
		
		if (display_on && (!isCreating)){
			//introdisplay.js
			const display = new EmbedBuilder();
			make_display(display);
			message.channel.send({embeds: [display]});
			return;
		}

		/*EDITING*/
		if (isCreating){let mode = 'create';}else{let mode = 'edit';}
		const intro_message = new EmbedBuilder()
			.setTitle('Lets '+mode+' your intro!')
			.setDescription(`To `+mode+` your introduction, please use the buttons below!`)
			.setColor(trig_default_color)
			.setThumbnail(trig_noting_thumbnail)
			.setFooter({text: '(affirmation goes here)'});

		const intro_edit = new EmbedBuilder();
		if (isCreating){
			intro_edit.setDescription(`*(You don't have an intro yet)*`);
		} else {
			make_display(intro_edit);
		}

		const editButton = new ButtonBuilder()
			.setCustomId('edit')
			.setLabel('Edit Intro')
			.setStyle(ButtonStyle.Secondary);
		const saveButton = new ButtonBuilder()
			.setCustomId('save')
			.setLabel('Save')
			.setStyle(ButtonStyle.Primary);
		const editActions = new ActionRowBuilder()
			.addComponents(editButton,saveButton)

		const introEditor = await message.channel.send({
			embeds: [intro_message,intro_edit],
			components: [editActions]
		});

		const intromodal = new ModalBuilder()
			.setCustomId('introModal')
			.setTitle(`Your Intro!`);
		const displayNameInput = TextInputBuilder()
			.setCustomId('displayNameInput')
			.setLabel('What is your name?')
			.setStyle(TextInputStyle.Short);
		const pronounsInput = TextInputBuilder()
			.setCustomId('pronounsInput')
			.setLabel('What are your pronouns?')
			.setStyle(TextInputStyle.Short);
		const colorInput = TextInputBuilder()
			.setCustomId('colorInput')
			.setLabel('What color do you want your intro to be?')
			.setStyle(TextInputStyle.Short);
		const descInput = TextInputBuilder()
			.setCustomId('descInput')
			.setLabel('What color do you want your intro to be?')
			.setStyle(TextInputStyle.Paragraph);
	},
};

//         - guildintrodisplay.js