const { Schema, model } = require("mongoose");
const { mainDB } = require("../dbTigerConnections");
const guildTriggerGroupSchema = new Schema({
    _id: Schema.Types.ObjectId,
    guildId: String,
    guildTriggerGroupName: String,
    guildTriggerEmoji: String,
    guildTriggerList: [String],
    guildTriggerIdList: [Schema.Types.ObjectId],
    guildTriggerIsCustom: [Bool], 
    guildTriggerGroupBullet: String
});

module.exports = mainDB.model("GuildTriggerGroup", guildTriggerGroupSchema, "GuildTriggerGroups");