const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");
var sanitize = require("mongo-sanitize");

const Profile = require("../../models/Profile");

// @route PUT api/experience
// @desc Create Experience
// @access Private
router.post(
  "/create",
  auth,
  [
    check("title", "Title is required")
      .not()
      .isEmpty(),
    check("company", "Company is required")
      .not()
      .isEmpty(),
    check("from_date", "From date is required")
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      title,
      company,
      location,
      from_date,
      to_date,
      is_current,
      description
    } = req.body;

    // The sanitize function will strip out any keys that start with '$' in the input,
    // so you can pass it to MongoDB without worrying about malicious users overwriting
    // query selectors.
    var title_clean = sanitize(title);
    var company_clean = sanitize(company);
    var location_clean = sanitize(location);
    var description_clean = sanitize(description);

    const new_experience = {
      title_clean,
      company_clean,
      location_clean,
      from_date,
      to_date,
      is_current,
      description_clean
    };

    try {
      const profile = await Profile.findOne({ user: req.user.id });
      /* The unshift() method adds one or more elements to the beginning of an array and returns the new length of the array */
      profile.experience.unshift(new_experience);
      await profile.save();
      res.json(profile);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route PUT api/experience/:exp_id/update
// @desc Update Experience Record
// @access Private
router.put(
  "/:exp_id/update",
  auth,
  [
    check("title", "Title is required")
      .not()
      .isEmpty(),
    check("company", "Company is required")
      .not()
      .isEmpty(),
    check("from_date", "From date is required")
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const exp_id = req.params.exp_id;

    const {
      company,
      title,
      location,
      from_date,
      to_date,
      is_current,
      description
    } = req.body;

    var company_clean = sanitize(company);
    var title_clean = sanitize(title);
    var location_clean = sanitize(location);
    var description_clean = sanitize(description);

    // Build experience object
    const experience_build = {};

    experience_build.company = company_clean;

    experience_build.title = title_clean;

    experience_build.location = location_clean;

    experience_build.from_date = from_date;

    if (to_date) experience_build.to_date = to_date;

    experience_build.is_current = is_current;

    if (description) experience_build.description = description_clean;

    try {
      const profile = await Profile.findOne({ user: req.user.id });
      const profile_id = profile._id;

      await Profile.updateOne(
        { _id: profile_id, "experience._id": exp_id },
        { $set: { "experience.$": experience_build } }
      );

      res.status(200).send("Success");
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route DELETE api/experience/:exp_id/delete
// @desc Delete Experience Record
// @access Private
router.delete("/:exp_id/delete", auth, async (req, res) => {
  try {
    let profile = await Profile.findOne({ user: req.user.id });

    await profile.updateOne({
      $pull: { experience: { _id: req.params.exp_id } }
    });
    res.json(profile);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

router.get("/get-experience", auth, async (req, res) => {
  try {
    let experience = await Profile.findOne({ user: req.user.id }, "experience");

    experience = experience.experience;

    experience.sort(function(a, b) {
      return b.from_date - a.from_date;
    });

    res.json(experience);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

router.get("/get-experience/:profile_id", auth, async (req, res) => {
  try {
    const profile_id = req.params.profile_id;
    let experience = await Profile.findOne({ _id: profile_id }).populate(
      "user",
      ["name"]
    );

    experience = experience.experience;

    experience.sort(function(a, b) {
      return b.from_date - a.from_date;
    });

    res.json(experience);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

router.get("/get-experience-item/:exp_id", auth, async (req, res) => {
  const { exp_id } = req.params;

  try {
    const profile = await Profile.findOne({ user: req.user.id });

    if (!profile) {
      return res.status(400).json({ msg: "Profile not found" });
    }

    const { experience } = profile;

    for (let i = 0; i < experience.length; i++) {
      const element = experience[i];
      if (element._id == exp_id) {
        res.json(element);
      }
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
