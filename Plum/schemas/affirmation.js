const { Schema, model } = require("mongoose");
const { mainDB } = require("../dbPlumConnections");
const affirmationSchema = new Schema({
    _id: Schema.Types.ObjectId,
    affirmationId: Number,
    affirmationTitle: String,
    affirmationDescription: String,
    affirmationThumbnail: String
});

module.exports = mainDB.model("Affirmation", affirmationSchema, "Affirmations");