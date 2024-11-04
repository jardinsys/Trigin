const { Schema, model } = require("mongoose");
const { sucreDB } = require("../bot.js");
const commonTriggerSchema = new Schema({
    _id: Schema.Types.ObjectId,
    triggerName: String,
    triggerDescription: String,
    triggerHelp: String
});

module.exports = sucreDB.model("CommonTrigger", commonTriggerSchema, "CommonTriggers");