import mongoose from "mongoose";
import { CONSTANTS } from "../lib/util";
const { VIEWS } = CONSTANTS;
/* PetSchema will correspond to a collection in your MongoDB database. */
const ViewSchema = new mongoose.Schema({
  view: {
    type: String, // std - standings view, premat - before match view for currentMatch, mat - on going match view for currentMatch, postmat - after match view for currentMatch,
    enum: [
      VIEWS.STANDINGS,
      VIEWS.MATCH_VIEWS.PRE_MATCH,
      VIEWS.MATCH_VIEWS.ON_MATCH,
      VIEWS.MATCH_VIEWS.POST_MATCH,
    ],
    message: "{VALUE} is not supported",
    default: "std",
  },

  name: {
    type: String,
    default: "new view",
  },
  viewThumbnailURL: {
    type: String,
    default: "https://melkorwebjobstorage.blob.core.windows.net/web/logo0.png",
  },
});
export default mongoose.models.View || mongoose.model("View", ViewSchema);
