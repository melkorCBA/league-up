import User from "../../../../models/user";
import DashBoard from "../../../../models/dashboard";

import dbConnect from "../../../../lib/dbConnect";
import { errorHandler, validators } from "../../../../lib/errorHandler";
import { UserMiddleware, CookieSession } from "../../../../lib/middleware";
import { BadRequest, NotFound, Forbidden } from "../../../../lib/errors";
import { getPublisher, trigger } from "../../../../pusher/publisher";
import { CHANNELS, EVENTS } from "../../../../pusher/constants";

export default async function handler(req, res) {
  const { method } = req;
  await dbConnect();
  const publisher = getPublisher();

  switch (method) {
    case "GET": {
      try {
        UserMiddleware(req, res);
        const currentUserId = CookieSession.get("currentUser", { req, res });
        const exsistingUser = await User.findById(currentUserId);
        if (!exsistingUser) {
          throw new BadRequest("Invalid User!.");
        }
        const { leagueInView } = exsistingUser;
        // get dashboard
        const dashboard = await DashBoard.findOne({ league: leagueInView });
        if (!dashboard) {
          throw new NotFound("No dashboard set in view!.");
        }
        res.status(200).json({ status: "success!.", data: dashboard });
      } catch (err) {
        errorHandler(err, res);
      }

      break;
    }
    case "PATCH": {
      try {
        await validators.attach(req, res, [
          validators.body.field("leagueInView", "leagueInView is required"),
        ]);
        UserMiddleware(req, res);
        const currentUserId = CookieSession.get("currentUser", { req, res });
        const exsistingUser = await User.findById(currentUserId);
        if (!exsistingUser) {
          throw new BadRequest("Invalid User!.");
        }
        const { leagueInView } = req.body;
        if (!exsistingUser.hasLeagueAccess(leagueInView)) {
          throw new Forbidden("User does not have to access to this league");
        }
        exsistingUser.leagueInView = leagueInView;
        await exsistingUser.save();
        trigger(publisher, {
          channelName: CHANNELS.DASHBOARD,
          eventName: EVENTS.DASHBOARD.UPDATE_LEAGUE_IN_VIEW,
        });
        // get dashboard
        const dashboard = await DashBoard.findOne({ league: leagueInView });
        if (!dashboard) {
          throw new NotFound("No dashboard set in view!.");
        }
        res.status(201).json({ status: "success!.", data: dashboard });
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
