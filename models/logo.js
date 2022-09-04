import mongoose from "mongoose";

/* PetSchema will correspond to a collection in your MongoDB database. */
const LogoSchema = new mongoose.Schema({
  logoURL: {
    type: String,
    default: "https://melkorwebjobstorage.blob.core.windows.net/web/logo0.png",
  },

  isUsed: {
    type: Boolean,
    default: false,
  },
});
export default mongoose.models.Logo || mongoose.model("Logo", LogoSchema);
