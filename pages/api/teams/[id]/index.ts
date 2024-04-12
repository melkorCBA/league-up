import Team from "../../../../models/team";
import Logo from "../../../../models/logo";
import dbConnect from "../../../../lib/dbConnect";
import { errorHandler, validators } from "../../../../lib/errorHandler";
import { getPublisher, trigger } from "../../../../pusher/publisher";
import {
  UserMiddleware,
  checkUserAccess,
  getUserData,
} from "../../../../lib/middleware";
import { Unauthorized } from "../../../../lib/errors";

export default async function handler(req, res) {
  const { method } = req;
  const publisher = getPublisher();
  await dbConnect();

  switch (method) {
    case "GET": {
      try {
        await validators.attach(req, res, [
          validators.queryParams.queryParam("id", "team id is required"),
        ]);

        UserMiddleware(req, res);
        const { id } = req.query;
        // check user has acces to specified team - league in users's league list ?
        const hasAccessToTeam = await checkUserAccess.hasTeamAccess(id, {
          req,
          res,
        });
        if (!hasAccessToTeam) {
          throw new Unauthorized("User doesn't have access to the team!");
        }

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
          validators.queryParams.queryParam("id", "team id is required"),
        ]);
        UserMiddleware(req, res);
        const { id } = req.query;
        // check user has acces to specified team - league in users's league list ?
        const hasAccessToTeam = await checkUserAccess.hasTeamAccess(id, {
          req,
          res,
        });
        if (!hasAccessToTeam) {
          throw new Unauthorized("User doesn't have access to the team!");
        }
        const team = await Team.findById(id);

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
        trigger(publisher, null, 'standings', 'TEAM_updateTeams');
        res.status(200).json({ status: "updated", data: team });
      } catch (err) {
        errorHandler(err, res);
      }

      break;
    }

    case "DELETE": {
      try {
        await validators.attach(req, res, [
          validators.queryParams.queryParam("id", "team id is required"),
        ]);
        UserMiddleware(req, res);
        const { id } = req.query;
        // check user has acces to specified team - league in users's league list ?
        const hasAccessToTeam = await checkUserAccess.hasTeamAccess(id, {
          req,
          res,
        });
        if (!hasAccessToTeam) {
          throw new Unauthorized("User doesn't have access to the team!");
        }
        const team = await Team.findById(id);

        const logoId = team["logoID"];
        await Team.deleteOne({ _id: id });
        trigger(publisher, null, 'standings', 'TEAM_updateTeams');
        // detach logo
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
