import Team from "../../../../../models/team";
import Logo from "../../../../../models/logo";
import dbConnect from "../../../../../lib/dbConnect";
import { errorHandler, validators } from "../../../../../lib/errorHandler";
import { getPublisher, trigger } from "../../../../../pusher/publisher";
import { updateSyncForMatches } from "../../../../../services/standingsSync-service";

export default async function handler(req, res) {
  const { method } = req;
  const publisher = getPublisher();
  await dbConnect();

  switch (method) {
    case "PATCH": {
      try {
        await validators.attach(req, res, [
          validators.queryParams.queryParam("id", "cv id is required"),
        ]);
        const { id } = req.query;
        const team = await Team.findById(id);
        if (!team) {
          res.status(400).json({ status: "record not found", data: null });
          return;
        }
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
