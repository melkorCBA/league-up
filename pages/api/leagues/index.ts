import League from "../../../models/league";
import User from "../../../models/user";

import dbConnect from "../../../lib/dbConnect";
import { errorHandler, validators } from "../../../lib/errorHandler";
import { getPublisher, trigger } from "../../../pusher/publisher";

import mongoose from "mongoose";
import {
  UserMiddleware,
  checkUserAccess,
  getUserData,
} from "../../../lib/middleware";
import { Unauthorized } from "../../../lib/errors";

export default async function handler(req, res) {
  const { method } = req;
  const publisher = getPublisher();
  await dbConnect();

  switch (method) {
    case "GET": {
      try {
        // get userDashboard
        await validators.attach(req, res, [
          // validators.headers.header("authorization", "Auth header is missing"),
        ]);

        UserMiddleware(req, res);
        const currentUser = await getUserData({ req, res }, "leagues");
        const leagueInViewId = currentUser.leagueInView;

        const userLeagues = currentUser.leagues;
        const leagues = [];

        for (const league of userLeagues) {
          const { _id, name } = league;
          if (
            league["_id"].equals(new mongoose.Types.ObjectId(leagueInViewId))
          ) {
            leagues.push({ _id, name, default: true });
            continue;
          }

          leagues.push({ _id, name, default: false });
        }
        res.status(200).json({ data: leagues });
      } catch (err) {
        errorHandler(err, res);
      }

      break;
    }
    case "POST": {
      try {
        await validators.attach(req, res, [
          validators.body.field("leagueName", "league name is missing"),
        ]);

        UserMiddleware(req, res);
        const currentUser = await getUserData({ req, res });

        const { leagueName } = req.body;
        const league = await new League({ name: leagueName });
        await league.save();
        currentUser.leagues.push(league["_id"]);
        await currentUser.save();
        res.status(201).json({ data: league });
      } catch (err) {
        errorHandler(err, res);
      }

      break;
    }
    case "PATCH": {
      try {
        await validators.attach(req, res, [
          validators.body.field("leagueName", "league name is required"),
          validators.body.field("leagueId", "league id is required"),
        ]);
        const { leagueName, leagueId } = req.body;
        UserMiddleware(req, res);
        const hasAccessToLeague = await checkUserAccess.hasLeagueAccess(
          leagueId,
          { req, res }
        );
        if (!hasAccessToLeague) {
          throw new Unauthorized(
            "User doesn't have access to the default league set"
          );
        }
        const league = await League.findById(leagueId);
        league["name"] = leagueName;

        await league.save();
        trigger(publisher, null);
        res.status(201).json({ status: "created", data: league });
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
