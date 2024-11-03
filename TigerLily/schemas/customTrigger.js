const { Schema, model } = require("mongoose");
const customTriggerSchema = new Schema({
    _id: Schema.Types.ObjectId,
    memberId: String,
    guildId: String,
    triggerName: String,
    triggerDescription: String,
    triggerHelp: String
});


module.exports = model("CustomTrigger", customTriggerSchema, "CustomTriggers");