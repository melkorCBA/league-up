import League from "../../../models/league";

import dbConnect from "../../../lib/dbConnect";
import { errorHandler, validators } from "../../../lib/errorHandler";

import mongoose from "mongoose";
import { UserMiddleware, checkUserAccess } from "../../../lib/middleware";
import { Forbidden } from "../../../lib/errors";

export default async function handler(req, res) {
  const { method } = req;
  await dbConnect();

  switch (method) {
    case "GET": {
      try {
        // get userDashboard
        await validators.attach(req, res, [
          validators.queryParams.queryParam("id", "league id is required"),
        ]);
        const { id: leagueId } = req.query;
        UserMiddleware(req, res);
        const hasLeagueAccess = await checkUserAccess.hasLeagueAccess(
          leagueId,
          { req, res }
        );
        if (!hasLeagueAccess)
          throw new Forbidden(
            "User does not have access to the requested league"
          );
        const league = await League.findById(leagueId);
        res.status(200).json({ data: league });
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
