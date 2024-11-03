const { Schema, model } = require("mongoose");
const affirmationSchema = new Schema({
    _id: Schema.Types.ObjectId,
    affirmationId: Number,
    affirmationTitle: String,
    affirmationDescription: String,
    affirmationThumbnail: String
});

module.exports = model("Affirmation", affirmationSchema, "Affirmations");