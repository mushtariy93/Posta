const { Schema, model } = require("mongoose");

const postSchema = new Schema(
    {
        title: { type: String, required: true },
        post_text: { type: String, required: true },
        author: { type: String, required: true },
    },
    {
        versionKey: false,
    }
);

module.exports = model("User", postSchema);
