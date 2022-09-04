import mongoose from "mongoose";

/* PetSchema will correspond to a collection in your MongoDB database. */
const TeamSchema = new mongoose.Schema({
  logoURL: {
    type: String,
    default: "https://melkorwebjobstorage.blob.core.windows.net/web/logo0.png",
  },
  logoID: {
    type: mongoose.Types.ObjectId,
  },
  teamName: {
    /* The name of the company cv is generated for */

    type: String,
    required: [true, "Please provide a name for the team."],
    maxlength: [60, "team Name cannot be more than 60 characters"],
  },

  pld: {
    type: Number,
    default: 0,
  },
  win: {
    type: Number,
    default: 0,
  },
  draw: {
    type: Number,
    default: 0,
  },
  loss: {
    type: Number,
    default: 0,
  },
  pts: {
    type: Number,
    default: 0,
  },
  nr: {
    type: Number,
    default: 0.0,
  },
  isQualified: {
    type: Number,
    default: 0,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});

export default mongoose.models.Team || mongoose.model("Team", TeamSchema);
