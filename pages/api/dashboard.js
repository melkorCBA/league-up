import DashBoard from "../../models/dashboard";

import dbConnect from "../../lib/dbConnect";
import { errorHandler, validators } from "../../lib/errorHandler";
import { getPublisher, trigger } from "../../pusher/publisher";

import {
  UserMiddleware,
  checkUserAccess,
  getUserData,
} from "../../lib/middleware";

import { CHANNELS, EVENTS } from "../../pusher/constants";
import { Unauthorized } from "../../lib/errors";

export default async function handler(req, res) {
  const { method } = req;
  const publisher = getPublisher();
  await dbConnect();

  switch (method) {
    case "GET": {
      try {
        await validators.attach(req, res, [
          // validators.headers.header("authorization", "Auth header is missing"),
        ]);
        UserMiddleware(req, res);
        const currentUser = await getUserData({ req, res });
        const leagueId = req.query["leagueId"] ?? currentUser.defaultLeague;

        // check user has acces to specified league - league in users's league list ?
        const hasAccessToLeague = await checkUserAccess.hasLeagueAccess(
          leagueId,
          { req, res }
        );
        if (!hasAccessToLeague) {
          throw new Unauthorized(
            "User doesn't have access to the default league set"
          );
        }
        const dashBoard = await DashBoard.findOne({ league: leagueId });
        res.status(200).json({ data: dashBoard });
      } catch (err) {
        errorHandler(err, res);
      }

      break;
    }
    case "POST": {
      try {
        await validators.attach(req, res, [
          //
        ]);
        UserMiddleware(req, res);
        const currentUser = await getUserData({ req, res });
        const leagueId = req.query["leagueId"] ?? currentUser.defaultLeague;

        const hasAccessToLeague = await checkUserAccess.hasLeagueAccess(
          leagueId,
          { req, res }
        );
        if (!hasAccessToLeague) {
          throw new Unauthorized(
            "User doesn't have access to the default league set"
          );
        }
        const dashboard = new DashBoard({ league: leagueId });

        await dashboard.save();
        res.status(201).json({ status: "created", data: dashboard });
      } catch (err) {
        errorHandler(err, res);
      }

      break;
    }
    case "PATCH": {
      try {
        await validators.attach(req, res, [
          validators.body.anyfields(
            ["view", "currentMatch"],
            "view or currentMatch must be provided"
          ),
        ]);
        UserMiddleware(req, res);
        const currentUser = await getUserData({ req, res });
        const leagueId = req.query["leagueId"] ?? currentUser.defaultLeague;

        const hasAccessToLeague = await checkUserAccess.hasLeagueAccess(
          leagueId,
          { req, res }
        );
        if (!hasAccessToLeague) {
          throw new Unauthorized(
            "User doesn't have access to the default league set"
          );
        }

        const dashBoard = await DashBoard.findOne({ league: leagueId });
        if (!dashBoard) {
          res.status(400).json({ status: "record not found", data: null });
          return;
        }
        const { view, currentMatch } = req.body;

        const payload = { view, currentMatch, league: leagueId };

        Object.keys(payload).forEach((key) => {
          if (payload[key] !== undefined) {
            dashBoard[key] = payload[key];
          }
        });

        await dashBoard.save();
        trigger(publisher, {
          channelName: CHANNELS.DASHBOARD,
          eventName: EVENTS.UPDATE_DASHBOARD,
        });
        res.status(201).json({ status: "updated", data: dashBoard });
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
