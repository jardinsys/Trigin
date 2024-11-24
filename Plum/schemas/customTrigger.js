const { Schema, model } = require("mongoose");
const { mainDB } = require("../dbPlumConnections");
const customTriggerSchema = new Schema({
    _id: Schema.Types.ObjectId,
    memberId: String,
    guildId: String,
    triggerName: String,
    triggerDescription: String,
    triggerHelp: String
});


module.exports = mainDB.model("CustomTrigger", customTriggerSchema, "CustomTriggers");