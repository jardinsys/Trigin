const { Schema, model } = require("mongoose");
const { mainDB } = require("../dbSugarConnections");
const tipSchema = new Schema({
    _id: Schema.Types.ObjectId,
    tipId: Number,
    tipTitle: String,
    tipDescription: String,
    tipThumbnail: String
});

module.exports = mainDB.model("Tip", tipSchema, "Tips");