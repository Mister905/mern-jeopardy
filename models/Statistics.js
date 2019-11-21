const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StatisticsSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    correct_responses: {
        type: Number
    },
    incorrect_responses: {
        type: Number
    },
    games_played: {
        type: Number
    },
    career_earnings: {
        type: Number
    }
});

module.exports = mongoose.model("statistics", StatisticsSchema);