const { Schema, model } = require("mongoose");
const { mainDB } = require("../dbTigerConnections");
const guildSchema = new Schema({
    _id: Schema.Types.ObjectId,
    guildId: { type: String, required: true },
    guildDisplayName: String,
    guildSponserCount: Number,
    guildSponserEndTimeStamp: Number,
    guildAdminRoleIds:[String],
    guildAdminMemberIds: [String],
    guildMemberTriggerChannel: String,
    guildMemberIntroChannel: String,
    guildTriggerMessageID:String,
    guildIntroMessageID: String,

    //Trigger
    guildTriggerDisplayBanner: String, // $$
    guildTriggerDisplayThumbnail: String, 
    guildTriggerDisplayColor: String,
    guildTriggerDescription: String,
    guildTriggerGroups: [Schema.Types.ObjectId],
    guildTriggerDefaultBullet: String,
    guildTriggerCustomTitle: String, // $$
    guildTriggerFooter: String, // $$
    guildTriggerFooterIcon: String, // $$
    guildTriggerHeader: String, // $$
    guildTriggerHeaderIcon: String, // $$
    guildTriggerFieldTitle: String, // $$

    //Intro
    guildIntroDisplayBanner: String, // $$
    guildIntroDisplayThumbnail: String, 
    guildIntroDisplayColor: String,
    guildIntroDescription: String,
    guildIntroCustomTitle: String, // $$
    guildIntroFooter: String, // $$
    guildIntroFooterIcon: String, // $$
    guildIntroHeader: String, // $$
    guildIntroHeaderIcon: String, // $$
    guildIntroFieldTitle: String // $$
});

module.exports = mainDB.model("Guild", guildSchema, "Guilds");