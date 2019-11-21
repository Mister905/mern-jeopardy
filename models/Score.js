const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ScoreSchema = new Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    username: {
        type: String
    },
    score: {
        type: Number
    }
});

module.exports = mongoose.model("score", ScoreSchema);