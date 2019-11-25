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

let ObjectId = require('mongodb').ObjectID;

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

module.exports = router;
