const {
	SlashCommandBuilder,
	EmbedBuilder,
	ButtonBuilder,
	ButtonStyle,
	ActionRowBuilder,
	ModalBuilder,
	TextInputBuilder,
	TextInputStyle,
	Guild,
} = require("discord.js");
const Member = require("../../schemas/member");
const mongoose = require("mongoose");
const {
	trig_default_color,
	trig_caution_color,
	trig_sus_thumbnail,
	trig_happyhug_thumbnail,
	trig_noting_thumbnail,
} = require("../../assets.json");
let isCreating = false;
let member_is_admin = false;
let newmessage_string = "";
let memberORguild = "m";

// (currently a single command, make a button mene option)
module.exports = {
	data: new SlashCommandBuilder()
		.setName("intro")
		.setDescription(
			"Create, Edit, or Display an introduction for yourself (or guild if your an admin)."
		)
		.addBooleanOption((option) =>
			option
				.setName("display only")
				.setDescription("Just display your personal intro, no editing")
		)
		.addBooleanOption((option) =>
			option
				.setName("hidden")
				.setDescription("Only you see what we do here privately")
		),
	async execute(interaction, client) {
		let display_on = interaction.options.getBoolean("display only");
		let hidden = interaction.options.getBoolean("hidden");
		//Check Admin in server
		let guildProfile = await Guild.findOne({
			guildId: interaction.guild.id,
		});
		let memberProfile = await Member.findOne({
			memberId: interaction.user.id,
		});
		//Check Membeer IDs
		if (guildProfile.guildAdmimMemberIds.find(interaction.user.id))
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

		/*CREATION INTRO*/
		if (!memberProfile) {
			memberProfile = await new Member({
				_id: mongoose.Types.ObjectId(),
				memberId: interaction.user.id,
				memberPremiumCount: 0,
			});
			await memberProfile.save().catch(console.error);
			isCreating = true;

			if (member_is_admin) {
				newmessage_string = "If....(continue)";
			} else {
				newmessage_string = "Welcome to TrigIn!....(continue description)";
			}

			const newuser_message = new EmbedBuilder()
				.setTitle(`Looks like you're new here...'`)
				.setDescription(newmessage_string)
				.setColor(trig_caution_color)
				.setThumbnail(trig_sus_thumbnail)
				.setTimestamp(Date.now())
				.setFooter({
					iconURL: trig_happyhug_thumbnail,
					text: "Nice to meet you and Stay Safe!",
				});
			message.channel.send({ embeds: [newuser_message] });
			//Make Button Options for Guild or Individal option
			//memberORguild = ?;
		}

		const hasPremium = memberProfile.memberPremiumCount > 0 ? true : false;
		const hasSponser = guildProfile.guildSponserCount > 0 ? true : false;

		function make_display(diplay_card) {
			//Display the intro in its current state for an individal member
			let title = `${memberProfile.memberDisplayName}*(${memberProfile.memberPronouns})* Intro!`;
			display_card
				.setDescription(memberProfile.memberIntroDescription)
				.setColor(memberProfile.memberIntroDisplayColor)
				.setThumbnail(memberProfile.memberIntroDisplayThumbnail);
			if (hasPremium) {
				if (memberProfile.memberIntroCustomTitle) {
					title = memberProfile.memberIntroCustomTitle;
				}
				if (memberProfile.memberIntroDisplayBanner) {
					display_card.setImage(memberProfile.memberIntroDisplayBanner);
				}
				if (
					memberProfile.memberIntroFooter &&
					memberProfile.memberIntroFooterIcon
				) {
					display_card.setFooter({
						iconURL: memberProfile.memberIntroFooterIcon,
						text: memberProfile.memberIntroFooter,
					});
				} else if (
					memberProfile.memberIntroFooter &&
					!memberProfile.memberIntroFooterIcon
				) {
					display_card.setFooter({
						text: memberProfile.memberIntroFooter,
					});
				} else if (
					!memberProfile.memberIntroFooter &&
					memberProfile.memberIntroFooterIcon
				) {
					display_card.setFooter({
						iconURL: memberProfile.memberIntroFooterIcon,
					});
				}
				if (
					memberProfile.memberIntroHeader &&
					memberProfile.memberIntroHeaderIcon
				) {
					display_card.setAuthor({
						iconURL: memberProfile.memberIntroHeaderIcon,
						text: memberProfile.memberIntroHeader,
					});
				} else if (
					memberProfile.memberIntroHeader &&
					!memberProfile.memberIntroHeaderIcon
				) {
					display_card.setAuthor({
						text: memberProfile.memberIntroHeader,
					});
				} else if (
					!memberProfile.memberIntroHeader &&
					memberProfile.memberIntroHeaderIcon
				) {
					display_card.setAuthor({
						iconURL: memberProfile.memberIntroHeaderIcon,
					});
				}
			}
			display_card.setTitle(title);
			return display_card;
		}

		function make_guild_display(diplay_card) {
			//Display the intro in its current state for an individal member
			let title = `${guildProfile.guildDisplayName} Intro!`;
			display_card
				.setDescription(guildProfile.guildIntroDescription)
				.setColor(guildProfile.guildIntroDisplayColor)
				.setThumbnail(guildProfile.guildIntroDisplayThumbnail);
			if (hasSponser) {
				if (guildProfile.guildIntroCustomTitle) {
					title = guildProfile.guildIntroCustomTitle;
				}
				if (guildProfile.guildIntroDisplayBanner) {
					display_card.setImage(guildProfile.guildIntroDisplayBanner);
				}
				if (
					guildProfile.guildIntroFooter &&
					guildProfile.guildIntroFooterIcon
				) {
					display_card.setFooter({
						iconURL: guildProfile.guildIntroFooterIcon,
						text: guildProfile.guildIntroFooter,
					});
				} else if (
					guildProfile.guildIntroFooter &&
					!guildProfile.guildIntroFooterIcon
				) {
					display_card.setFooter({
						text: guildProfile.guildIntroFooter,
					});
				} else if (
					!guildProfile.guildIntroFooter &&
					guildProfile.guildIntroFooterIcon
				) {
					display_card.setFooter({
						iconURL: guildProfile.guildIntroFooterIcon,
					});
				}
				if (
					guildProfile.guildIntroHeader &&
					guildProfile.guildIntroHeaderIcon
				) {
					display_card.setAuthor({
						iconURL: guildProfile.guildIntroHeaderIcon,
						text: guildProfile.guildIntroHeader,
					});
				} else if (
					guildProfile.guildIntroHeader &&
					!guildProfile.guildIntroHeaderIcon
				) {
					display_card.setAuthor({
						text: guildProfile.guildIntroHeader,
					});
				} else if (
					!guildProfile.guildIntroHeader &&
					guildProfile.guildIntroHeaderIcon
				) {
					display_card.setAuthor({
						iconURL: guildProfile.guildIntroHeaderIcon,
					});
				}
			}
			display_card.setTitle(title);
			return display_card;
		}

		if (display_on && !isCreating) {
			//introdisplay.js
			const display = new EmbedBuilder();
			make_display(display);
			message.channel.send({ embeds: [display] });
			return;
		}

		/*EDITING m*/
		if (memberORguild == "m") {
			let mode = isCreating ? "create" : "edit";

			const intro_message = new EmbedBuilder()
				.setTitle("Lets " + mode + " your intro!")
				.setDescription(
					`To ` + mode + ` your introduction, please use the buttons below!`
				)
				.setColor(trig_default_color)
				.setThumbnail(trig_noting_thumbnail)
				.setFooter({ text: "(affirmation goes here)" });

			const intro_edit = new EmbedBuilder();
			if (isCreating) {
				intro_edit.setDescription(`*(You don't have an intro yet)*`);
			} else {
				make_display(intro_edit);
			}

			const editButton = new ButtonBuilder()
				.setCustomId("edit")
				.setLabel("Edit Intro")
				.setStyle(ButtonStyle.Secondary);
			const saveButton = new ButtonBuilder()
				.setCustomId("save")
				.setLabel("Save")
				.setStyle(ButtonStyle.Primary);
			const editActions = new ActionRowBuilder().addComponents(
				editButton,
				saveButton
			);

			const introEditor = await message.channel.send({
				embeds: [intro_message, intro_edit],
				components: [editActions],
			});

			const intromodal = new ModalBuilder()
				.setCustomId("introModal")
				.setTitle(`Your Intro!`);

			if (!hasPremium) {
				const displayNameInput = TextInputBuilder()
					.setCustomId("displayNameInput")
					.setLabel("What is your name?")
					.setStyle(TextInputStyle.Short)
					.setValue(memberProfile.memberDisplayName);
				const pronounsInput = TextInputBuilder()
					.setCustomId("pronounsInput")
					.setLabel("What are your pronouns?")
					.setStyle(TextInputStyle.Short)
					.setValue(memberProfile.memberPronouns);
				const colorInput = TextInputBuilder()
					.setCustomId("colorInput")
					.setLabel("What color do you want your intro to be?")
					.setStyle(TextInputStyle.Short)
					.setValue(memberProfile.memberIntroDisplayColor);
				const descInput = TextInputBuilder()
					.setCustomId("descInput")
					.setLabel("What is your intro?")
					.setStyle(TextInputStyle.Paragraph)
					.setValue(memberProfile.memberIntroDescription);

				const nonPremiumMemberActions = new ActionRowBuilder().addComponents(
					displayNameInput,
					pronounsInput,
					colorInput,
					descInput
				);
				intromodal.addComponents(nonPremiumMemberActions);
			} else {
				const displayNameInput = TextInputBuilder()
					.setCustomId("displayNameInput")
					.setLabel("What is your name?")
					.setStyle(TextInputStyle.Short)
					.setValue(memberProfile.memberDisplayName);
				const pronounsInput = TextInputBuilder()
					.setCustomId("pronounsInput")
					.setLabel("What are your pronouns?")
					.setStyle(TextInputStyle.Short)
					.setValue(memberProfile.memberPronouns);
				const colorInput = TextInputBuilder()
					.setCustomId("colorInput")
					.setLabel("What color do you want your intro to be?")
					.setStyle(TextInputStyle.Short)
					.setValue(memberProfile.memberIntroDisplayColor);
				const titleInput = TextInputBuilder()
					.setCustomId("titleInput")
					.setLabel("What do you want your title to be?")
					.setStyle(TextInputStyle.Short)
					.setValue(memberProfile.memberIntroCustomTitle);
				const descInput = TextInputBuilder()
					.setCustomId("descInput")
					.setLabel("What is your intro?")
					.setStyle(TextInputStyle.Paragraph)
					.setValue(memberProfile.memberIntroDescription);
				const headerInput = TextInputBuilder()
					.setCustomId("headerInput")
					.setLabel("What is your intro's header (small text above the title)?")
					.setStyle(TextInputStyle.Paragraph)
					.setValue(memberProfile.memberIntroHeader);
				const footerInput = TextInputBuilder()
					.setCustomId("footerInput")
					.setLabel(
						"What is your intro's footer (small your main intro + sections)?"
					)
					.setStyle(TextInputStyle.Paragraph)
					.setValue(memberProfile.memberIntroFooter);

				const nonPremiumMemberActions = new ActionRowBuilder().addComponents(
					displayNameInput,
					pronounsInput,
					colorInput,
					titleInput,
					descInput,
					headerInput,
					footerInput
				);
				intromodal.addComponents(nonPremiumMemberActions);
			}
		} else if (memberORguild == "g") {
			//Make guild display
			//         - guildintrodisplay.js
		}
	},
};
