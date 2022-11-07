import { mathAction } from "../lib/util";
import Match from "../models/match";
const syncMatch = (undo, match, team1, team2) => {
  const op = undo ? "-" : "+";

  team1["runsScored"] = mathAction(
    team1["runsScored"],
    match.team1["runs"],
    op
  );
  team2["runsScored"] = mathAction(
    team2["runsScored"],
    match.team2["runs"],
    op
  );

  team1["runsConceded"] = mathAction(
    team1["runsConceded"],
    match.team2["runs"],
    op
  );
  team2["runsConceded"] = mathAction(
    team2["runsConceded"],
    match.team1["runs"],
    op
  );

  team1["oversFaced"] = mathAction(
    team1["oversFaced"],
    match.team1["overs"],
    op
  );
  team2["oversFaced"] = mathAction(
    team2["oversFaced"],
    match.team2["overs"],
    op
  );

  team1["oversBowled"] = mathAction(
    team1["oversBowled"],
    match.team2["overs"],
    op
  );
  team2["oversBowled"] = mathAction(
    team2["oversBowled"],
    match.team1["overs"],
    op
  );

  team1["pld"] = mathAction(team1["pld"], 1, op);
  team2["pld"] = mathAction(team2["pld"], 1, op);

  switch (match["won"]) {
    case "1":
      team1["win"] = mathAction(team1["win"], 1, op);
      team2["loss"] = mathAction(team2["loss"], 1, op);
      team1["pts"] = mathAction(team1["pts"], 2, op);
      break;
    case "2":
      team2["win"] = mathAction(team2["win"], 1, op);
      team1["loss"] = mathAction(team1["loss"], 1, op);
      team2["pts"] = mathAction(team2["pts"], 2, op);
      break;
    case "0":
      team1["draw"] = mathAction(team1["draw"], 1, op);
      team2["draw"] = mathAction(team2["draw"], 1, op);
      team1["pts"] = mathAction(team1["pts"], 1, op);
      team2["pts"] = mathAction(team2["pts"], 1, op);
      break;
    default:
      break;
  }
};

const isMatchSyncedForTeams = (matchId, team1, team2) => {
  const isSyncedInTeam1 = team1.syncedMatches.includes(matchId);
  const isSyncedInTeam2 = team2.syncedMatches.includes(matchId);
  return isSyncedInTeam1 && isSyncedInTeam2;
};

const syncSatndings = async (sync, match, team1, team2) => {
  if (!match || !team1 || !team2) return false;
  if (!match.lockedForSync && !match.isDeleted) return false;
  if (!match.isSynced && !sync && !match.isDeleted) return false;
  if (match.isSynced && sync && !match.isDeleted) return false;

  const isSyncedForTeams = isMatchSyncedForTeams(match._id, team1, team2);

  // sync
  if (sync && !match.isSynced && !isSyncedForTeams) {
    syncMatch(false, match, team1, team2);
    match["isSynced"] = true;
    // add to synced matches
    if (team1.syncedMatches) {
      team1.syncedMatches.push(match["_id"]);
    }
    if (team2.syncedMatches) {
      team2.syncedMatches.push(match["_id"]);
    }
  }

  // un-scync
  if (!sync && match.isSynced && isSyncedForTeams) {
    syncMatch(true, match, team1, team2);
    match["isSynced"] = false;
    // removed from synced matches
    if (team1.syncedMatches && team1.syncedMatches.length > 0) {
      team1.syncedMatches = team1.syncedMatches.filter(
        (mId) => !mId.equals(match["_id"])
      );
    }
    if (team2.syncedMatches && team2.syncedMatches.length > 0) {
      team2.syncedMatches = team2.syncedMatches.filter(
        (mId) => !mId.equals(match["_id"])
      );
    }
  }

  await team1.save();
  await team2.save();
  await match.save();
  return true;
};

const updateSyncForMatch = async (matchId, status) => {
  const match = await Match.findById(matchId)
    .populate({
      path: "team1",
      populate: {
        path: "team",
        model: "Team",
      },
    })
    .populate({
      path: "team2",
      populate: {
        path: "team",
        model: "Team",
      },
    });

  if (!match) return false;

  const team1 = match.team1.team;
  const team2 = match.team2.team;
  return syncSatndings(status, match, team1, team2);
};

const updateSyncForMatches = async (matchIds, status) => {
  for (const id of matchIds) {
    await updateSyncForMatch(id, status);
  }
};

export { syncSatndings, updateSyncForMatches };
