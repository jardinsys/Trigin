const { Schema, model } = require("mongoose");
const { mainDB } = require("../dbTigerConnections");
const imageSchema = new Schema({
    _id: Schema.Types.ObjectId,
    memberOrGuild: String,
    introOrTrigger: String,
    imageType: String,
    filename: { type: String, required: true },
    image_data: { type: Buffer, required: true }
});

module.exports = mainDB.model("Image", imageSchema, "Images");