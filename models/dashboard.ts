import { Types, Schema, model, models } from "mongoose";
import { CONSTANTS } from "../lib/util";
const { VIEWS } = CONSTANTS;

interface IDashBoard {
  view?: string;
  currentMatch?: Types.ObjectId;
  league?: Types.ObjectId;
}

const DashBoardSchema = new Schema<IDashBoard>({
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

  currentMatch: {
    type: Schema.Types.ObjectId,
    ref: "Match",
  },
  league: { type: Schema.Types.ObjectId, ref: "League" },
});
export default models.DashBoard || model("DashBoard", DashBoardSchema);
