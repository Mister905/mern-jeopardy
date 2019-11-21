const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");

const Statistics = require("../../models/Statistics");

// @route POST api/statistics/response
// @desc Update User's Response Stats e.g. correct/incorrect
// @access Private
router.post("/response", auth, async (req, res) => {
  const { response } = req.body;

  if (response === "correct") {
    try {
      let statistics = await Statistics.findOneAndUpdate(
        {
          user: req.user.id
        },
        {
          $inc: {
            correct_responses: 1
          }
        }
      );
      return res.json(statistics);
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Server Error");
    }
  } else {
    try {
      let statistics = await Statistics.findOneAndUpdate(
        {
          user: req.user.id
        },
        {
          $inc: {
            incorrect_responses: 1
          }
        }
      );
      return res.json(statistics);
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Server Error");
    }
  }
});

// @route POST api/statistics/game_over
// @desc Update Stats for Games Played and Career Earnings
// @access Private
router.post("/game-over", auth, async (req, res) => {
  const { final_earnings } = req.body;

  try {
    let statistics = await Statistics.findOneAndUpdate(
      {
        user: req.user.id
      },
      {
        $inc: {
          games_played: 1,
          career_earnings: final_earnings
        }
      }
    );
    return res.json(statistics);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server Error");
  }
});

// @route GET api/statistics/active
// @desc Get statistics of active user
// @access Private
router.get("/active", auth, async (req, res) => {
  try {
    const statistics = await Statistics.findOne({ user: req.user.id });
    if (!statistics) {
      return res.status(400).json({ msg: "Statistics not found" });
    }
    res.json(statistics);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// @route GET api/statistics/player/:user_id
// @desc Get statistics of other player
// @access Private
router.get("/player/:user_id", auth, async (req, res) => {
  try {
    const statistics = await Statistics.findOne({ user: req.params.user_id });
    if (!statistics) {
      return res.status(400).json({ msg: "Statistics not found" });
    }
    res.json(statistics);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
