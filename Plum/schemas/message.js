const { Schema, model } = require("mongoose");
const messageSchema = new Schema({
    _id: Schema.Types.ObjectId,
    messageForGuild: Boolean,
    messageTitle: String,
    messageDescription: String,
    messageDate: Date,
    messageThumbnail: String,
    messageBanner: String,
    messageHeader: String,
    messageHeaderIcon: String,
    messageFooter: String,
    messageFooterIcon: String,
});

module.exports = model("Message", messageSchema, "Messages");