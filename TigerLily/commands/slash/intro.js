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

		const guildProfile = await Guild.findOne({
			guildId: interaction.guild.id,
		});
		const memberProfile = await Member.findOne({
			memberId: interaction.user.id,
		});
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
			const memberOrGuild_message = new EmbedBuilder()
				.setTitle('Hello bot admin')
				.setDescription(`Do you want to edit your personal or the server's intro?`);
			const memberButton = new ButtonBuilder()
				.setCustomId("member")
				.setLabel("Edit Personal Intro")
				.setStyle(ButtonStyle.Secondary);
			const imageButton = new ButtonBuilder()
				.setCustomId("guild")
				.setLabel("Edit Server Intro")
				.setStyle(ButtonStyle.Secondary);
			const mOgActions = new ActionRowBuilder().addComponents(memberButton, imageButton);

			message.channel.send({ embeds: [memberOrGuild_message], components: [mOgActions], ephemeral: hidden });
			//memberORguild = ?;
			client.once('interactionCreate', async interaction => {
				if (interaction.customId === 'member')
					memberORguild = "m";
				if (interaction.customId === 'guild')
					memberORguild = "g";
			});
		}

		const hasPremium = memberProfile.memberPremiumCount > 0 ? true : false;
		const hasSponser = guildProfile.guildSponserCount > 0 ? true : false;

		/*EDITING m*/
		if (memberORguild == "m") {
			let mode = isCreating ? "create" : "edit";

			let displayName = memberProfile.memberDisplayName;
			let pronouns = memberProfile.memberPronouns;
			let color = memberProfile.memberIntroDisplayColor;
			let desc = memberProfile.memberIntroDescription;
			let custom_title = memberProfile.memberIntroCustomTitle;
			let header = memberProfile.memberIntroHeader;
			let footer = memberProfile.memberIntroFooter;
			let thumbnail = memberProfile.memberIntroDisplayThumbnail;
			let banner = memberProfile.memberIntroDisplayBanner;
			let header_icon = memberProfile.memberIntroHeaderIcon;
			let footer_icon = memberProfile.memberIntroFooterIcon;

			function make_display(diplay_card) {
				//Display the intro in its current state for an individal member
				let title = `${displayName}*(${pronouns})* Intro!`;
				display_card
					.setDescription(desc)
					.setColor(color);
				if (thumbnail)
					display_card.setThumbnail(thumbnail);
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
						.setLabel("What is your intro's header (small text above the title)?")
						.setStyle(TextInputStyle.Paragraph)
						.setValue(header);
					const footerInput = TextInputBuilder()
						.setCustomId("footerInput")
						.setLabel("What is your intro's footer (small text below your main intro)?")
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
			const imageButton = new ButtonBuilder()
				.setCustomId("images")
				.setLabel("Upload Images")
				.setStyle(ButtonStyle.Secondary);
			const saveButton = new ButtonBuilder()
				.setCustomId("save")
				.setLabel("Save")
				.setStyle(ButtonStyle.Primary);
			const editActions = new ActionRowBuilder().addComponents(
				editButton, imageButton, saveButton
			);

			const introEditor = await message.channel.send({
				embeds: [intro_message, intro_edit],
				components: [editActions],
				ephemeral: hidden
			});

			const intromodal = new ModalBuilder()
				.setCustomId("introModal")
				.setTitle(`Your Intro!`);
			make_form(intromodal);

			client.on('interactionCreate', async interaction => {
				if (interaction.customId === 'edit') {
					await interaction.showModal(intromodal);

					client.on('interactionCreate', async interaction => {
						if (!interaction.isModalSubmit()) return;

						if (interaction.customId === 'introModal') {
							displayName = interaction.field.getTextInputValue('displayNameInput');
							pronouns = interaction.field.getTextInputValue('pronounsInput');
							color = interaction.field.getTextInputValue('colorInput');
							desc = interaction.field.getTextInputValue('descInput');

							if (hasPremium) {
								custom_title = interaction.field.getTextInputValue('titleInput');
								header = interaction.field.getTextInputValue('headerInput');
								footer = interaction.field.getTextInputValue('footerInput');
							}

							//Update display
							make_display(intro_edit);
							introEditor = await sentMessage.edit({
								embeds: [intro_message, intro_edit],
								components: [editActions],
								ephemeral: hidden
							});
							//Update Modal
							make_form(intromodal);
						}
					});
				}

				if (interaction.customId === 'images') {
					//Add thumbnail

					//for Premium, add thumbnail, banner, header icon, footer icon

					// Call image schema
				}

				if (interaction === 'save') {
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

					await memberProfile.save()
						.then(() => {
							console.log('Profile updated successfully!');
						})
						.catch(err => {
							console.error('Error updating profile:', err);
						});
				}
			});


		} else if (memberORguild == "g") {

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

			//Make guild display
			//         - guildintrodisplay.js
		}
	},
};
