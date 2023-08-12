import { Types, Schema, model, models } from "mongoose";

interface ITeam {
  logoURL?: string;
  logoID?: Types.ObjectId;
  teamName: string;
  abrev: string;
  pld?: number;
  win?: number;
  draw?: number;
  loss?: number;
  isQualified?: number;
  isActive?: boolean;
  runsScored?: number;
  runsConceded?: number;
  oversFaced?: number;
  oversBowled?: number;
  league?: Types.ObjectId;
  syncedMatches: Types.ObjectId[];
}
const TeamSchema = new Schema<ITeam>({
  logoURL: {
    type: String,
    default: "https://melkorwebjobstorage.blob.core.windows.net/web/logo0.png",
  },
  logoID: {
    type: Schema.Types.ObjectId,
  },
  teamName: {
    type: String,
    required: [true, "Please provide a name for the team."],
    maxlength: [60, "team Name cannot be more than 60 characters"],
  },

  abrev: {
    type: String,
    required: [true, "Please provide a short name for the team."],
    maxlength: [5, "team abbr cannot be more than 5 characters"],
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
  isQualified: {
    type: Number,
    default: 0,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  runsScored: {
    type: Number,
    default: 0,
  },
  runsConceded: {
    type: Number,
    default: 0,
  },
  oversFaced: {
    type: Number,
    default: 0,
  },
  oversBowled: {
    type: Number,
    default: 0,
  },

  league: { type: Schema.Types.ObjectId, ref: "League" },

  syncedMatches: [
    {
      type: Schema.Types.ObjectId,
      ref: "Match",
    },
  ],
});

TeamSchema.set("toObject", { virtuals: true });
TeamSchema.set("toJSON", { virtuals: true });

TeamSchema.virtual("nr").get(function () {
  if (this.oversFaced == 0 || this.oversBowled == 0) return 0;
  return (
    this.runsScored / this.oversFaced - this.runsConceded / this.oversBowled
  );
});
TeamSchema.virtual("pts").get(function () {
  return this.win * 3 + this.draw;
});

export default models.Team || model("Team", TeamSchema);
