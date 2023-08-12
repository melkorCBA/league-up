import { Schema, models, model, Model } from "mongoose";

export interface ILeague {
  name: string;
}
const LeagueSchema = new Schema<ILeague>({
  name: {
    type: String,
    default: `LeagueUp ${new Date().getFullYear()}`,
  },
});
export default (models.League ||
  model("League", LeagueSchema)) as Model<ILeague>;
