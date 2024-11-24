const { Schema, model } = require("mongoose");
const { mainDB } = require("../dbTigerConnections");
const memberSchema = new Schema({
    _id: Schema.Types.ObjectId,
    memberId: String,
    memberDisplayName: String,
    memberPronouns: String,
    memberPremiumCount: Number,
    memberPremiumEndTimeStamp: Number,
    memberAutoPremium: Boolean,
    memberSponsorsToGive: Number,
    memberAutoSponsors: [Schema.Types.ObjectId],
    memberRecentMessages: [Schema.Types.ObjectId],

    //Trigger
    memberTriggerDisplayBanner: String, // $$
    memberTriggerDisplayThumbnail: String, 
    memberTriggerDisplayColor: String,
    memberTriggerDescription: String,
    memberTriggerGroups: [Schema.Types.ObjectId], 
    memberTriggerDefaultBullet: String,
    memberTriggerCustomTitle: String, // $$
    memberTriggerFooter: String, // $$
    memberTriggerFooterIcon: String, // $$
    memberTriggerHeader: String, // $$
    memberTriggerHeaderIcon: String, // $$
    memberTriggerGuildSent:[String], //$$

    //Intro
    memberIntroDisplayBanner: String, // $$
    memberIntroDisplayThumbnail: String, 
    memberIntroDisplayColor: String,
    memberIntroDescription: String,
    memberIntroCustomTitle: String, // $$
    memberIntroFooter: String, // $$
    memberIntroFooterIcon: String, // $$
    memberIntroHeader: String, // $$
    memberIntroHeaderIcon: String, // $$
    memberIntroFieldTitles: [String], // $$
    memberIntroFieldDescs: [String], // $$
    memberIntroGuildSent:[String] //$$

});

module.exports = mainDB.model("Member", memberSchema, "Members");