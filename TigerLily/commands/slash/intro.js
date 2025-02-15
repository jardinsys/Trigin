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
let isCreating = false;
let member_is_admin = false;
let newmessage_string = "";
let memberORguild = "m";

let displayName = "";
let pronouns = "";
let color = "";
let desc = "";
let custom_title = "";
let header = "";
let footer = "";
let thumbnail = "";
let banner = "";
let header_icon = "";
let footer_icon = "";
let title = "";

import { mOg } from "../internal/build";

function make_display(diplay_card) {
	display_card.setDescription(desc).setColor(color);
	if (thumbnail) display_card.setThumbnail(thumbnail);
	if (hasPremium) {
		if (custom_title) title = custom_title;
		if (banner) display_card.setImage(banner);
		if (footer && footer_icon) {
			display_card.setFooter({
				iconURL: footer_icon,
				text: footer,
			});
		} else if (footer && !footer_icon) {
			display_card.setFooter({
				text: footer,
			});
		} else if (!footer && footer_icon) {
			display_card.setFooter({
				iconURL: footer_icon,
			});
		}

		if (header && header_icon) {
			display_card.setAuthor({
				iconURL: header_icon,
				text: header,
			});
		} else if (header && !header_icon) {
			display_card.setAuthor({
				text: header,
			});
		} else if (!header && header_icon) {
			display_card.setAuthor({
				iconURL: header_icon,
			});
		}
	}
	display_card.setTitle(title);
	return display_card;
}

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
				.setDescription("Just displays the intro, no editing")
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

		const guildProfile = await Guild.findOne({
			guildId: interaction.guild.id,
		});

		if (!guildProfile) {
			guildProfile = await new Guild({
				_id: mongoose.Types.ObjectId(),
				guildId: interaction.guild.id,
				guildSponserCount: 0,
			});
		}

		member_is_admin = int_member_is_admin(guildProfile);

		const memberProfile = await Member.findOne({
			memberId: interaction.user.id,
		});

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
			message.channel.send({ embeds: [newuser_message], ephemeral: hidden });
		}

		if (member_is_admin) {
			//Make Button Options for Guild or Individal option
			memberORguild = mOg("Intro");
		}

		const hasPremium = memberProfile.memberPremiumCount > 0 ? true : false;
		const hasSponser = guildProfile.guildSponserCount > 0 ? true : false;

		/*EDITING m*/
		if (memberORguild == "m") {
			let mode = isCreating ? "create" : "edit";

			displayName = memberProfile.memberDisplayName;
			pronouns = memberProfile.memberPronouns;
			color = memberProfile.memberIntroDisplayColor;
			desc = memberProfile.memberIntroDescription;
			custom_title = memberProfile.memberIntroCustomTitle;
			header = memberProfile.memberIntroHeader;
			footer = memberProfile.memberIntroFooter;
			thumbnail = memberProfile.memberIntroDisplayThumbnail;
			banner = memberProfile.memberIntroDisplayBanner;
			header_icon = memberProfile.memberIntroHeaderIcon;
			footer_icon = memberProfile.memberIntroFooterIcon;
			title = `${displayName}*(${pronouns})* Intro!`;

			function make_form(intromodal) {
				if (!hasPremium) {
					const displayNameInput = TextInputBuilder()
						.setCustomId("displayNameInput")
						.setLabel("What is your name?")
						.setStyle(TextInputStyle.Short)
						.setValue(displayName);
					const pronounsInput = TextInputBuilder()
						.setCustomId("pronounsInput")
						.setLabel("What are your pronouns?")
						.setStyle(TextInputStyle.Short)
						.setValue(pronouns);
					const colorInput = TextInputBuilder()
						.setCustomId("colorInput")
						.setLabel("What color do you want your intro to be?")
						.setStyle(TextInputStyle.Short)
						.setValue(color);
					const descInput = TextInputBuilder()
						.setCustomId("descInput")
						.setLabel("What is your intro?")
						.setStyle(TextInputStyle.Paragraph)
						.setValue(desc);

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
						.setValue(displayName);
					const pronounsInput = TextInputBuilder()
						.setCustomId("pronounsInput")
						.setLabel("What are your pronouns?")
						.setStyle(TextInputStyle.Short)
						.setValue(pronouns);
					const colorInput = TextInputBuilder()
						.setCustomId("colorInput")
						.setLabel("What color do you want your intro to be?")
						.setStyle(TextInputStyle.Short)
						.setValue(color);
					const titleInput = TextInputBuilder()
						.setCustomId("titleInput")
						.setLabel("What do you want your title to be?")
						.setStyle(TextInputStyle.Short)
						.setValue(custom_title);
					const descInput = TextInputBuilder()
						.setCustomId("descInput")
						.setLabel("What is your intro?")
						.setStyle(TextInputStyle.Paragraph)
						.setValue(desc);
					const headerInput = TextInputBuilder()
						.setCustomId("headerInput")
						.setLabel(
							"What is your intro's header (small text above the title)?"
						)
						.setStyle(TextInputStyle.Paragraph)
						.setValue(header);
					const footerInput = TextInputBuilder()
						.setCustomId("footerInput")
						.setLabel(
							"What is your intro's footer (small text below your main intro)?"
						)
						.setStyle(TextInputStyle.Paragraph)
						.setValue(footer);

					const PremiumMemberActions = new ActionRowBuilder().addComponents(
						displayNameInput,
						pronounsInput,
						colorInput,
						titleInput,
						descInput,
						headerInput,
						footerInput
					);
					intromodal.addComponents(PremiumMemberActions);
				}
			}

			//Display Only
			if (display_on && !isCreating) {
				//introdisplay.js
				const display = new EmbedBuilder();
				make_display(display);
				message.channel.send({ embeds: [display], ephemeral: hidden });
				return;
			}

			const intro_message = new EmbedBuilder()
				.setTitle("Lets " + mode + " your intro!")
				.setDescription(
					`To ` + mode + ` your introduction, please use the buttons below!`
				)
				.setColor(trig_default_color)
				.setThumbnail(trig_noting_thumbnail)
				.setFooter({ text: "(Affirmation here)" });

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
			const imageButton = new ButtonBuilder()
				.setCustomId("images")
				.setLabel("Upload Images")
				.setStyle(ButtonStyle.Secondary);
			const saveButton = new ButtonBuilder()
				.setCustomId("save")
				.setLabel("Save")
				.setStyle(ButtonStyle.Primary);
			const editActions = new ActionRowBuilder().addComponents(
				editButton,
				imageButton,
				saveButton
			);

			const introEditor = await message.channel.send({
				embeds: [intro_message, intro_edit],
				components: [editActions],
				ephemeral: hidden,
			});

			const intromodal = new ModalBuilder()
				.setCustomId("introModal")
				.setTitle(`Your Intro!`);
			make_form(intromodal);

			client.on("interactionCreate", async (interaction) => {
				if (interaction.customId === "edit") {
					await interaction.showModal(intromodal);

					client.on("interactionCreate", async (interaction) => {
						if (!interaction.isModalSubmit()) return;

						if (interaction.customId === "introModal") {
							displayName =
								interaction.field.getTextInputValue("displayNameInput");
							pronouns = interaction.field.getTextInputValue("pronounsInput");
							color = interaction.field.getTextInputValue("colorInput");
							desc = interaction.field.getTextInputValue("descInput");

							if (hasPremium) {
								custom_title =
									interaction.field.getTextInputValue("titleInput");
								header = interaction.field.getTextInputValue("headerInput");
								footer = interaction.field.getTextInputValue("footerInput");
							}

							//Update display
							make_display(intro_edit);
							introEditor = await sentMessage.edit({
								embeds: [intro_message, intro_edit],
								components: [editActions],
								ephemeral: hidden,
							});
							//Update Modal
							make_form(intromodal);
						}
					});
				}

				if (interaction.customId === "images") {
					//Add thumbnail

					//for Premium, add thumbnail, banner, header icon, footer icon
					
					// Call image schema
				}

				if (interaction === "save") {
					memberProfile.memberDisplayName = displayName;
					memberProfile.memberPronouns = pronouns;
					memberProfile.memberIntroDisplayColor = color;
					memberProfile.memberIntroDescription = desc;
					memberProfile.memberIntroCustomTitle = custom_title;
					memberProfile.memberIntroHeader = header;
					memberProfile.memberIntroFooter = footer;
					memberProfile.memberIntroDisplayThumbnail = thumbnail;
					memberProfile.memberIntroDisplayBanner = banner;
					memberProfile.memberIntroHeaderIcon = header_icon;
					memberProfile.memberIntroFooterIcon = footer_icon;

					await memberProfile
						.save()
						.then(() => {
							console.log("Profile updated successfully!");
						})
						.catch((err) => {
							console.error("Error updating profile:", err);
						});

					const save_message = new EmbedBuilder()
						.setDescription(
							"Use the command `/send` to send to a channel you want!"
						)
						.setFooter({ text: "(Affirmation here)" });
				}
			});
		} else if (memberORguild == "g") {

			displayName = guildProfile.guildDisplayName;
			color = guildProfile.guildIntroDisplayColor;
			desc = guildProfile.guildIntroDescription;
			custom_title = guildProfile.guildIntroCustomTitle;
			header = guildProfile.guildIntroHeader;
			footer = guildProfile.guildIntroFooter;
			thumbnail = guildProfile.guildIntroDisplayThumbnail;
			banner = guildProfile.guildIntroDisplayBanner;
			header_icon = guildProfile.guildIntroHeaderIcon;
			footer_icon = guildProfile.guildIntroFooterIcon;
			title = `${guildProfile.guildDisplayName} Intro!`;

			//Make guild display
			//         - guildintrodisplay.js
		}

		//check premium
		//check sponsor
		//check messages
	},
};
