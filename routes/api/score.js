const express = require("express");
const router = express.Router();
const auth = require('../../middleware/auth');
const Score = require('../../models/Score');

// @route POST api/score/new-score
// @desc Create New Game Score Record
// @access Private
router.post('/new-score', auth, async (req, res) => {

    const { user_id, final_earnings } = req.body;

    const score_build = {};

    score_build.user_id = user_id;

    score_build.score = final_earnings;

    try {
        const score = new Score(score_build);
        await score.save();
        return res.json(score);
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Server Error');
    }    
});

// @route POST api/score/get-high-scores
// @desc Get Top 10 High Scores
// @access Private
router.get('/get-high-scores', auth, async (req, res) => {
    const sort = { score: -1 };
    const high_scores = await Score.find().limit(10).sort(sort);
    return res.json(high_scores);
});

module.exports = router;