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
        const matches = await Match.find({ isDeleted: false })
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

        res.status(200).json({ data: matches });
      } catch (err) {
        errorHandler(err, res);
      }

      break;
    }
    case "POST": {
      try {
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
