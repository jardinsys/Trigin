const { Schema, model } = require("mongoose");
const { sucreDB } = require("../dbTigerConnections");
const affirmationSchema = new Schema({
    _id: Schema.Types.ObjectId,
    affirmationId: Number,
    affirmationTitle: String,
    affirmationDescription: String,
    affirmationThumbnail: String
});

module.exports = sucreDB.model("CommonAffirmation", commonAffirmationSchema, "CommonAffirmations");