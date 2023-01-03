import View from "../../models/view";

import dbConnect from "../../lib/dbConnect";
import { errorHandler, validators } from "../../lib/errorHandler";

export default async function handler(req, res) {
  const { method } = req;
  await dbConnect();
  switch (method) {
    case "GET": {
      try {
        await validators.attach(req, res, [
          // validators.headers.header("authorization", "Auth header is missing"),
        ]);
        const { view } = req.query;
        const views = await View.find(view ? { view } : {});
        const viewMap = {};
        views?.forEach(
          ({ view, viewThumbnailURL, name }) =>
            (viewMap[view] = { url: viewThumbnailURL, name })
        );
        res.status(200).json({ data: viewMap });
      } catch (err) {
        errorHandler(err, res);
      }

      break;
    }
    case "POST": {
      try {
        await validators.attach(req, res, [
          validators.body.anyfields(["view"], "view must be provided."),
        ]);
        const { view } = req.body;
        const newView = new View({ view });

        await newView.save();
        res.status(201).json({ status: "created", data: newView });
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
