const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
  },
  biography: {
    type: String
  },
  specialties: {
    type: [String]
  },
  linkedin: {
    type: String
  },
  twitter: {
    type: String
  },
  facebook: {
    type: String
  },
  experience: [
    {
      title: {
        type: String,
        required: true
      },
      company: {
        type: String
      },
      location: {
        type: String
      },
      from_date: {
        type: Date
      },
      to_date: {
        type: Date
      },
      is_current: {
        type: Boolean,
        default: false
      },
      description: {
        type: String
      }
    }
  ],
  profile_image_id: String
});

module.exports = mongoose.model("profile", ProfileSchema);
