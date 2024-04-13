import mongoose from "mongoose";

/* PetSchema will correspond to a collection in your MongoDB database. */
const LeagueSchema = new mongoose.Schema({
  name: {
    type: String,
    default: `LeagueUp ${new Date().getFullYear()}`,
  },
});
export default mongoose.models.League || mongoose.model("League", LeagueSchema);
