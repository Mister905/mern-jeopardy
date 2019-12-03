const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");
const path = require("path");
const crypto = require("crypto");
const mongoose = require("mongoose");
const multer = require("multer");
const GridFsStorage = require("multer-gridfs-storage");
const config = require("config");

// MODELS
const Profile = require("../../models/Profile");
const User = require("../../models/User");

const mongo_URI = config.get("mongo_URI");

const conn = mongoose.createConnection(mongo_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// init gfs
let gfs;
conn.once("open", () => {
  // init stream
  gfs = new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: "profile-images"
  });
});

// Create storage engine
const storage = new GridFsStorage({
  url: mongo_URI,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString("hex") + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: "profile-images"
        };
        resolve(fileInfo);
      });
    });
  }
});

const upload = multer({ storage });

// @route GET api/profile/profile-image/:profile_image_id
router.get("/profile-image/:profile_image_id", (req, res) => {
  let ObjectId = require("mongodb").ObjectID;

  const file = gfs
    .find({
      _id: ObjectId(req.params.profile_image_id)
    })
    .toArray((err, files) => {
      if (!files || files.length === 0) {
        return res.status(404).json({
          err: "no files exist"
        });
      }
      gfs.openDownloadStream(ObjectId(req.params.profile_image_id)).pipe(res);
    });
});

// @route GET api/profile/active
// @desc Get profile of active user
// @access Private
router.get("/active", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id
    }).populate("user", ["name"]);
    if (!profile) {
      return res.status(400).json({ msg: "Profile not found" });
    }
    res.json(profile);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// @route POST api/profile/create
// @desc Create User Profile
// @access Private
router.post(
  "/create",
  [
    auth,
    [
      check("biography", "Biography is required")
        .not()
        .isEmpty()
        .trim()
        .escape(),
      check("linkedin")
        .trim()
        .escape(),
      check("twitter")
        .trim()
        .escape(),
      check("facebook")
        .trim()
        .escape(),
      check("specialties")
        .trim()
        .escape()
    ],
    upload.single("profile_image")
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { biography, linkedin, twitter, facebook, specialties } = req.body;

    // Build profile object
    const profile_build = {};

    profile_build.user = req.user.id;

    profile_build.biography = biography;

    if (linkedin) {
      profile_build.linkedin = linkedin;
    } else {
      profile_build.linkedin = "https://www.linkedin.com";
    }

    if (twitter) {
      profile_build.twitter = twitter;
    } else {
      profile_build.twitter = "https://www.twitter.com";
    }

    if (facebook) {
      profile_build.facebook = facebook;
    } else {
      profile_build.facebook = "https://www.facebook.com";
    }

    if (specialties) {
      profile_build.specialties = specialties
        .split(",")
        .map(specialty => specialty.trim());
    }
    if (req.file) {
      profile_build.profile_image_id = req.file.id;
    } else {
      const default_profile_image_id = "5dd2c2557218982918041fd2";
      profile_build.profile_image_id = default_profile_image_id;
    }

    try {
      let profile = new Profile(profile_build);
      await profile.save();
      await User.updateOne({ _id: req.user.id }, { has_profile: true });
      res.json(profile);
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route POST api/profile/update
// @desc Update User Profile
// @access Private
router.post(
  "/update",
  [
    auth,
    [
      check("biography", "Biography is required")
        .trim()
        .escape(),
      check("linkedin")
        .trim()
        .escape(),
      check("twitter")
        .trim()
        .escape(),
      check("facebook")
        .trim()
        .escape(),
      check("specialties")
        .trim()
        .escape()
    ],
    upload.single("profile_image")
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { biography, linkedin, twitter, facebook, specialties } = req.body;

    // Build profile object
    const profile_build = {};

    profile_build.user = req.user.id;

    profile_build.biography = biography;

    if (linkedin) profile_build.linkedin = linkedin;

    if (facebook) profile_build.facebook = facebook;

    if (twitter) profile_build.twitter = twitter;

    if (specialties) {
      profile_build.specialties = specialties
        .split(",")
        .map(specialty => specialty.trim());
    }

    if (req.file) {
      profile_build.profile_image_id = req.file.id;
    }

    try {
      let profile = await Profile.findOne({ user: req.user.id });

      if (profile) {
        // Update Profile
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profile_build },
          { new: true }
        );

        return res.json(profile);
      }
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route GET api/profile/all
// @desc Get all profiles
// @access Private
router.get("/all", auth, async (req, res) => {
  try {
    const profiles = await Profile.find().populate("user", ["name"]);
    res.json(profiles);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// @route GET api/profile/get_profile_by_profile_id/:profile_id
// @desc Get profile by profile ID
// @access Private
router.get("/get_profile_by_profile_id/:profile_id", auth, async (req, res) => {
  try {
    const profile_id = req.params.profile_id;
    const profile = await Profile.findOne({ _id: profile_id });

    if (!profile) return res.status(400).json({ msg: "Profile not found" });

    res.json(profile);
  } catch (error) {
    if (error.kind == "ObjectId") {
      return res.status(400).json({ msg: "Profile not found" });
    }
    res.status(500).send("Server Error");
  }
});

// @route GET api/profile/get_profile_by_user_id/:user_id
// @desc Get profile by user ID
// @access Private
router.get("/get_profile_by_user_id/:user_id", auth, async (req, res) => {
  try {
    const user_id = req.params.user_id;
    const profile = await Profile.findOne({ user: user_id });

    if (!profile) return res.status(400).json({ msg: "Profile not found" });

    res.json(profile);
  } catch (error) {
    if (error.kind == "ObjectId") {
      return res.status(400).json({ msg: "Profile not found" });
    }
    res.status(500).send("Server Error");
  }
});

// @route DELETE api/profile/experience/:experience_id
// @desc Delete Profile Experience
// @access Private
router.delete("/experience/:experience_id", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    // Get Remove Index
    const remove_index = profile.experience
      .map(item => item.id)
      .indexOf(req.params.experience_id);

    profile.experience.splice(remove_index, 1);

    await profile.save();

    res.json(profile);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
