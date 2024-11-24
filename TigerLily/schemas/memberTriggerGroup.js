const { Schema, model } = require("mongoose");
const { mainDB } = require("../dbTigerConnections");
const memberTriggerGroupSchema = new Schema({
    _id: Schema.Types.ObjectId,
    memberId: String,
    memberTriggerGroupName: String,
    memberTriggerEmoji: String,
    memberTriggerList: [String],
    memberTriggerIdList: [Schema.Types.ObjectId],
    memberTriggerIsCustom: [Bool],
    memberTriggerGroupBullet: String,
});

module.exports = mainDB.model("MemberTriggerGroup", memberTriggerGroupSchema, "MemberTriggerGroups");