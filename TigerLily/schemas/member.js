const { Schema, model } = require("mongoose");
const memberSchema = new Schema({
    _id: Schema.Types.ObjectId,
    memberId: String,
    memberDisplayName: String,
    memberPronouns: String,
    memberPremium: Boolean,
    memberPremiumTimeStamp: Number,
    memberPremiumEndTimeStamp: Number,
    memberSponsorsToGive: Number,
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
    memberIntroFieldDescs: [String] // $$
});

module.exports = model("Member", memberSchema, "Members");