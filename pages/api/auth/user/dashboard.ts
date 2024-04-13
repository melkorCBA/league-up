import User from "../../../../models/user";
import DashBoard from "../../../../models/dashboard";

import dbConnect from "../../../../lib/dbConnect";
import { errorHandler, validators } from "../../../../lib/errorHandler";
import { UserMiddleware, CookieSession } from "../../../../lib/middleware";
import { BadRequest, NotFound, Forbidden } from "../../../../lib/errors";
import { getPublisher, trigger } from "../../../../pusher/publisher";

export default async function handler(req, res) {
  const { method } = req;
  await dbConnect();
  const publisher = getPublisher();

  switch (method) {
    case "GET": {
      try {
        UserMiddleware(req, res);
        const currentUserId = CookieSession.get("currentUser", { req, res });
        const existingUser = await User.findById(currentUserId);
        if (!existingUser) {
          throw new BadRequest("Invalid User!.");
        }
        const { leagueInView: leagueInViewId } = existingUser;
        // get dashboard
        const dashboard = await DashBoard.findOne({ league: leagueInViewId });
        if (!dashboard) {
          throw new NotFound();
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
          validators.body.field("leagueInViewId", "leagueInView is required"),
        ]);
        UserMiddleware(req, res);
        const currentUserId = CookieSession.get("currentUser", { req, res });
        const existingUser = await User.findById(currentUserId);
        if (!existingUser) {
          throw new BadRequest("Invalid User!.");
        }
        const { leagueInViewId } = req.body;
        if (!existingUser.hasLeagueAccess(leagueInViewId)) {
          throw new Forbidden("User does not have to access to this league");
        }
        existingUser.leagueInView = leagueInViewId;
        await existingUser.save();
        trigger(publisher, null , 'dashboard', 'DASHBOARD_updateLeagueInView');
        // get dashboard
        const dashboard = await DashBoard.findOne({ league: leagueInViewId });
        if (!dashboard) {
          throw new NotFound();
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
