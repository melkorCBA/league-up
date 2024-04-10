import Team from "../../../../../models/team";
import Logo from "../../../../../models/logo";
import dbConnect from "../../../../../lib/dbConnect";
import { errorHandler, validators } from "../../../../../lib/errorHandler";
import { getPublisher, trigger } from "../../../../../pusher/publisher";
import { updateSyncForMatches } from "../../../../../services/standingsSync-service";
import {
  UserMiddleware,
  checkUserAccess,
  getUserData,
} from "../../../../../lib/middleware";
import { Unauthorized } from "../../../../../lib/errors";

export default async function handler(req, res) {
  const { method } = req;
  const publisher = getPublisher();
  await dbConnect();

  switch (method) {
    case "PATCH": {
      try {
        await validators.attach(req, res, [
          validators.queryParams.queryParam("id", "team id is required"),
        ]);
        UserMiddleware(req, res);
        const { id } = req.query;
        // check user has acces to specified team - league in users's league list ?S
        const hasAccessToTeam = await checkUserAccess.hasTeamAccess(id, {
          req,
          res,
        });
        if (!hasAccessToTeam) {
          throw new Unauthorized("User doesn't have access to the team!");
        }

        const team = await Team.findById(id);
        const { syncStatus } = req.body;

        const syncedMatchIds = team.syncedMatches;
        await updateSyncForMatches(syncedMatchIds, syncStatus);
        trigger(publisher);
        res.status(201).json({ status: "updated", data: team });
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
