import Team from "../../models/team";
import Logo from "../../models/logo";
import dbConnect from "../../lib/dbConnect";
import { errorHandler, validators } from "../../lib/errorHandler";
import { getPublisher, trigger } from "../../pusher/publisher";
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
        const teams = await Team.find({ isActive: true }).sort({
          pts: "desc",
          nr: "desc",
        });
        res.status(200).json({ data: teams });
      } catch (err) {
        errorHandler(err, res);
      }

      break;
    }
    case "POST": {
      try {
        await validators.attach(req, res, [
          validators.body.field("teamName", "team name is required"),
        ]);
        const { teamName, logoURL } = req.body;
        const team = new Team({
          teamName,
          logoURL,
        });

        // set logo
        const unUsedLogo = await Logo.findOne({ isUsed: false });
        if (unUsedLogo) {
          team["logoID"] = unUsedLogo["_id"];
          team["logoURL"] = unUsedLogo["logoURL"];
        }
        await team.save();
        // persist logo attachment
        unUsedLogo["isUsed"] = true;
        await unUsedLogo.save();
        trigger(publisher);
        res.status(201).json({ status: "created", data: team });
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
