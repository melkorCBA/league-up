import mongoose from "mongoose";
import { TOSS_STATUS, BATFIRST_STATUS, WIN_STATUS } from "../lib/util";

const MatchTeamSchema = new mongoose.Schema({
  team: { type: mongoose.Types.ObjectId, ref: "Team" },
  runs: {
    type: Number,
    default: 0,
  },
  wickets: {
    type: Number,
    default: 0,
  },
  overs: {
    type: Number,
    default: 0.0,
  },
});

const MatchSchema = new mongoose.Schema(
  {
    team1: {
      type: MatchTeamSchema,
      required: true,
    },
    team2: {
      type: MatchTeamSchema,
      required: true,
    },
    toss: {
      type: String, // 0 - toss yet to be, 1 - team 1 won, 2 - team 2 won
      enum: TOSS_STATUS.ALL_TO_ARRAY,
      message: "{VALUE} is not supported",
      default: "0",
    },
    bat1st: {
      type: String, // 0 - yet to be, 1 - team 1 bat 1st, 2 - team 2 bat 1st
      enum: BATFIRST_STATUS.ALL_TO_ARRAY,
      message: "{VALUE} is not supported",
      default: "0",
    },
    won: {
      type: String, // -1  - yet to be 0 - draw, 1 - team 1 won, 2 - team 2 won
      enum: WIN_STATUS.ALL_TO_ARRAY,
      message: "{VALUE} is not supported",
      default: "-1",
    },
    isSynced: {
      type: Boolean,
      default: false,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },

    lockedForSync: {
      type: Boolean,
      default: false,
    },

    winMargin: {
      type: String,
      default: "",
      // accpected format: 5 Wickets, 13 runs, 2 Wickets (DLS)
    },
  },
  { timestamps: true }
);

export default mongoose.models.Match || mongoose.model("Match", MatchSchema);
