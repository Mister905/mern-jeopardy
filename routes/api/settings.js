const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");

const Profile = require("../../models/Profile");
const User = require("../../models/User");

// @route DELETE api/settings/delete-profile
// @desc Delete Profile
// @access Private
router.delete("/delete-profile", auth, async (req, res) => {
  try {
    // Delete profile
    await Profile.findOneAndRemove({ user: req.user.id });
    // Update user's has_profile field
    await User.findOneAndUpdate({_id: req.user.id},{$set:{has_profile: false}}); 
    res.json({ msg: "Profile Successfully Deleted" });
  } catch (error) {
    res.status(500).send("Server Error");
  }
});

// @route DELETE api/settings/delete-account
// @desc Delete account
// @access Private
router.delete("/delete-account", auth, async (req, res) => {
  try {
    // Delete account
    await User.findOneAndRemove({ _id: req.user.id });
    res.json({ msg: "Account Successfully Deleted" });
  } catch (error) {
    res.status(500).send("Server Error");
  }
});

module.exports = router;