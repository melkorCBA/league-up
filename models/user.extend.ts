import { Model, Types } from "mongoose";
import { ILeague } from "./league";

export const findLeagueById = function (
  leagueId: Types.ObjectId
): Model<ILeague> {
  return this.leagues.find((l) => l.equals(leagueId));
};
export const hasLeagueAccess = function (leagueId: Types.ObjectId): boolean {
  return this.leagues.find((l) => l.equals(leagueId)) ? true : false;
};
