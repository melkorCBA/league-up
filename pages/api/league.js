import League from "../../models/league";

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
        const league = await League.find({});
        res.status(200).json({ data: league });
      } catch (err) {
        errorHandler(err, res);
      }

      break;
    }
    case "PATCH": {
      try {
        await validators.attach(req, res, [
          validators.body.field("leagueName", "league name is required"),
        ]);
        const { leagueName } = req.body;
        const league = await League.findOne({});
        league["name"] = leagueName;

        await league.save();
        trigger(publisher);
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
