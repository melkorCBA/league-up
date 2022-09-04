import mongoose from "mongoose";

/* PetSchema will correspond to a collection in your MongoDB database. */
const LeagueSchema = new mongoose.Schema({
  name: {
    type: String,
    default: "Standing 2022",
  },
});
export default mongoose.models.League || mongoose.model("League", LeagueSchema);
