import Team from "../../../models/team";
import Match from "../../../models/match";

import dbConnect from "../../../lib/dbConnect";
import { errorHandler, validators } from "../../../lib/errorHandler";
import { syncSatndings } from "../../../services/standingsSync-service";
import { getPublisher, trigger } from "../../../pusher/publisher";
import {
  UserMiddleware,
  checkUserAccess,
  getUserData,
} from "../../../lib/middleware";
import { Unauthorized } from "../../../lib/errors";

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "GET": {
      try {
        await validators.attach(req, res, [
          validators.queryParams.queryParam("id", "match id is required"),
        ]);
        UserMiddleware(req, res);
        const { id } = req.query;
        // check user has acces to specified team - league in users's league list ?
        const hasAccessToMatch = await checkUserAccess.hasMatchAccess(id, {
          req,
          res,
        });
        if (!hasAccessToMatch) {
          throw new Unauthorized("User doesn't have access to the match!");
        }
        const match = await Match.findById(id)
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

        res.status(200).json({ data: match });
      } catch (err) {
        errorHandler(err, res);
      }

      break;
    }
    case "PATCH": {
      try {
        const publisher = getPublisher();
        await validators.attach(req, res, [
          validators.queryParams.queryParam("id", "match id is required"),
        ]);
        UserMiddleware(req, res);
        const { id } = req.query;
        // check user has acces to specified team - league in users's league list ?
        const hasAccessToMatch = await checkUserAccess.hasMatchAccess(id, {
          req,
          res,
        });
        if (!hasAccessToMatch) {
          throw new Unauthorized("User doesn't have access to the match!");
        }
        const match = await Match.findById(id)
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

        const {
          team1,
          team2,
          toss,
          bat1st,
          won,
          lockedForSync,
          winMargin,
          isDeleted,
        } = req.body;
        const payload = {
          toss,
          bat1st,
          won,
          lockedForSync,
          winMargin,
          isDeleted,
        };

        Object.keys(payload).forEach((key) => {
          if (payload[key] !== undefined) {
            match[key] = payload[key];
          }
        });

        if (team1) {
          ["runs", "wickets", "overs"].forEach(
            (k) => (match["team1"][k] = team1[k])
          );
        }
        if (team2) {
          ["runs", "wickets", "overs"].forEach(
            (k) => (match["team2"][k] = team2[k])
          );
        }
        const { isSynced } = req.body;
        const sendPushNofification = await syncSatndings(
          isSynced,
          match,
          match.team1["team"],
          match.team2["team"]
        );
        await match.save();
        if (sendPushNofification) trigger(publisher);
        res.status(201).json({
          status: "updated",
          data: match,
          syncStatus: sendPushNofification,
        });
      } catch (err) {
        errorHandler(err, res);
      }

      break;
    }

    case "DELETE": {
      try {
        const publisher = getPublisher();
        await validators.attach(req, res, [
          validators.queryParams.queryParam("id", "match id is required"),
        ]);
        UserMiddleware(req, res);
        const { id } = req.query;
        // check user has acces to specified team - league in users's league list ?
        const hasAccessToMatch = await checkUserAccess.hasMatchAccess(id, {
          req,
          res,
        });
        if (!hasAccessToMatch) {
          throw new Unauthorized("User doesn't have access to the match!");
        }
        const match = await Match.findById(id)
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
        if (!match) {
          res.status(400).json({ status: "record not found", data: null });
          return;
        }

        match["isDeleted"] = true;
        match["lockedForSync"] = true;
        // remove from the standings
        syncSatndings(false, match, match.team1["team"], match.team2["team"]);
        await match.save();
        res.status(201).json({ status: "deleted", data: match });
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
