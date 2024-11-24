const { Schema, model } = require("mongoose");
const { sucreDB } = require("../dbSugarConnections");
const commonTriggerSchema = new Schema({
    _id: Schema.Types.ObjectId,
    triggerName: String,
    triggerDescription: String,
    triggerHelp: String
});

module.exports = sucreDB.model("CommonTrigger", commonTriggerSchema, "CommonTriggers");