import Team from "../../models/team";
import Match from "../../models/match";

import dbConnect from "../../lib/dbConnect";
import { errorHandler, validators } from "../../lib/errorHandler";

export default async function handler(req, res) {
  const { method } = req;
  await dbConnect();
  switch (method) {
    case "GET": {
      try {
        await validators.attach(req, res, [
          // validators.headers.header("authorization", "Auth header is missing"),
        ]);
        // implement thease steps
        // 1.get user associated with the Token
        // 2.get the users's default league, if no specific league requested (no league as a query param)
        // 3.check user has acces to specified league - league in users's league list ?
        // 4.filter teams for specified leagues
        const defaultLeagueId = "6341100e204ce73751b4bb4b";
        const leagueId = req.query["leagueId"] ?? defaultLeagueId;
        const matches = await Match.find({ isDeleted: false, league: leagueId })
          .lean()
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
          })
          .sort({
            createdAt: "asc",
          });

        matches.forEach((match) => {
          const team1Abr = match.team1.team.abrev;
          const team2Abr = match.team2.team.abrev;
          const matchKey = `${team1Abr} VS ${team2Abr} - ${match._id}`;
          match["matchKey"] = matchKey;
        });

        res.status(200).json({ data: matches });
      } catch (err) {
        errorHandler(err, res);
      }

      break;
    }
    case "POST": {
      try {
        // implement thease steps
        // 1.get user associated with the Token
        // 2.get the users's default league, if no specific league requested (no league as a query param)
        // 3.check user has acces to specified league - league in users's league list ?
        // 4.filter teams for specified leagues
        const defaultLeagueId = "6341100e204ce73751b4bb4b";
        const leagueId = req.query["leagueId"] ?? defaultLeagueId;

        await validators.attach(req, res, [
          validators.body.field("team1Id", "team1 id is required"),
          validators.body.field("team2Id", "team2 id is required"),
          validators.compare.bodyFields(
            "team1Id",
            "team2Id",
            (f1, f2) => f1 !== f2,
            "same team cannot be the both opponents"
          ),
        ]);

        const { team1Id, team2Id } = req.body;
        const team1 = await Team.findById(team1Id);
        if (!team1) {
          res
            .status(400)
            .json({ message: "team 1 is does not exsists", success: false });
        }
        const team2 = await Team.findById(team2Id);
        if (!team2) {
          res
            .status(400)
            .json({ message: "team 1 is does not exsists", success: false });
        }

        const match = new Match({
          team1: {
            team: team1,
          },
          team2: {
            team: team2,
          },
          league: leagueId,
        });
        await match.save();

        res.status(201).json({ status: "created", match: match });
      } catch (err) {
        errorHandler(err, res);
      }

      break;
    }

    default:
      res.status(400).json({ success: false });
      break;
  }
}
