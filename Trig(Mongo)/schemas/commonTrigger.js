const { Schema, model } = require("mongoose");
const commonTriggerSchema = new Schema({
    _id: Schema.Types.ObjectId,
    triggerName: String,
    triggerDescription: String,
    triggerHelp: String
});

module.exports = model("CommonTrigger", commonTriggerSchema, "CommonTriggers");