import Team from "../../../../models/team";
import Logo from "../../../../models/logo";
import dbConnect from "../../../../lib/dbConnect";
import { errorHandler, validators } from "../../../../lib/errorHandler";
import { getPublisher, trigger } from "../../../../pusher/publisher";
import { CHANNELS, EVENTS } from "../../../../pusher/constants";

export default async function handler(req, res) {
  const { method } = req;
  const publisher = getPublisher();
  await dbConnect();

  switch (method) {
    case "GET": {
      try {
        await validators.attach(req, res, [
          validators.queryParams.queryParam("id", "cv id is required"),
        ]);
        const { id } = req.query;
        const team = await Team.findById(id);
        res.status(200).json({ data: team });
      } catch (err) {
        errorHandler(err, res);
      }

      break;
    }
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
        const {
          teamName,
          abrev,
          logoURL,
          pld,
          win,
          draw,
          loss,
          pts,
          nr,
          isQualified,
          isActive,
          runsScored,
          runsConceded,
          oversFaced,
          oversBowled,
        } = req.body;
        const payload = {
          teamName,
          abrev,
          logoURL,
          pld,
          win,
          draw,
          loss,
          pts,
          nr,
          isQualified,
          isActive,
          runsScored,
          runsConceded,
          oversFaced,
          oversBowled,
        };
        Object.keys(payload).forEach((key) => {
          if (payload[key] !== undefined) {
            team[key] = payload[key];
          }
        });

        await team.save();
        trigger(publisher, {
          channelName: CHANNELS.STANDING_BOARD,
          eventName: EVENTS.UPDATE_TEAMS,
        });
        res.status(200).json({ status: "updated", data: team });
      } catch (err) {
        errorHandler(err, res);
      }

      break;
    }

    case "DELETE": {
      try {
        await validators.attach(req, res, [
          validators.queryParams.queryParam("id", "cv id is required"),
        ]);
        const { id } = req.query;
        const team = await Team.findById(id);
        if (!team) {
          res.status(200).json({ status: "record not found", data: null });
          return;
        }

        const logoId = team["logoID"];
        await Team.deleteOne({ _id: id });
        trigger(publisher, {
          channelName: CHANNELS.STANDING_BOARD,
          eventName: EVENTS.UPDATE_TEAMS,
        });
        // deattch logo
        if (logoId) {
          const logo = await Logo.findById(logoId);
          logo["isUsed"] = false;
          await logo.save();
        }

        res.status(200).json({ status: "deleted", data: team });
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
