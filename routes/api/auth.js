const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
// AUTH MIDDLEWARE
const auth = require("../../middleware/auth");
// EXPRESS-VALIDATOR
const { check, validationResult } = require("express-validator");
const { body } = require("express-validator");
const sanitize = require('mongo-sanitize');

const User = require("../../models/User");
const Statistics = require("../../models/Statistics");

// @route POST api/auth
// @desc Get Active User
// @access Public
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// @route GET api/auth/:user_id
// @desc Get Active User
// @access Public
router.get("/:user_id", auth, async (req, res) => {
  try {
    const user_id = req.params.user_id;
    const user = await User.findById(user_id).select("-password");
    res.json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// @route POST api/auth/register
// @desc Register User
// @access Public
router.post(
  "/register",
  [
    check("first_name", "First name is required")
      .not()
      .isEmpty()
      .trim()
      .escape(),
    check("last_name", "Last name is required")
      .not()
      .isEmpty()
      .trim()
      .escape(),
    check("email", "A valid email is required").isEmail(),
    check("password", "Password must contain 6 or more characters").isLength({
      min: 6
    }),
    body("password2").custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Password confirmation does not match password");
      }
      // Indicates the success of this synchronous custom validator
      return true;
    })
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { first_name, last_name, email, password } = req.body;

    try {
      let user = await User.findOne({ email });
      // If account already exists
      if (user) {
        res
          .status(400)
          .json({ errors: [{ msg: "Account with email already exists" }] });
      } else {

        const new_user = new User({
          first_name,
          last_name,
          email,
          password,
          has_profile: false
        });

        // Salt and hash password before saving in database
        bcrypt.genSalt(13, (err, salt) => {
          bcrypt.hash(new_user.password, salt, (err, hash) => {
            if (err) throw err;
            new_user.password = hash;
            // Save New User in DB
            new_user.save(async (err, user) => {
              // Create statistic record for new user
              const statistics_build = {};

              statistics_build.user = user._id;

              statistics_build.correct_responses = 0;

              statistics_build.incorrect_responses = 0;

              statistics_build.games_played = 0;

              statistics_build.career_earnings = 0;

              try {
                const statistics = new Statistics(statistics_build);
                await statistics.save();
              } catch (error) {
                console.log(error.message);
                res.status(500).send("Server Error");
              }
            });
          });
        });

        return res.json({ msg: "User Successfully Registered" });
      }
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
router.post(
  "/login",
  [
    check("email", "A valid email is required").isEmail(),
    check("password", "Password is required")
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    var clean_email = await sanitize(email);

    try {
      let user = await User.findOne({ email: clean_email });

      if (!user) {
        return res.status(400).json({ errors: [{ msg: "Login Failed" }] });
      }

      // Check password
      bcrypt.compare(password, user.password).then(isMatch => {
        if (isMatch) {
          // Create JWT Payload
          const payload = {
            user: {
              id: user.id,
              name: user.name
            }
          };

          // Sign token
          jwt.sign(
            payload,
            config.get("jwt_secret"),
            {
              expiresIn: 3600 // 1 hour in seconds
            },
            (err, token) => {
              if (err) throw err;
              res.json({ token });
            }
          );
        } else {

          return res.status(400).json({ msg: "Login failed" });
        }
      });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }
);

module.exports = router;
