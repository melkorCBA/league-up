import User from "../../../../models/user";

import dbConnect from "../../../../lib/dbConnect";
import { errorHandler } from "../../../../lib/errorHandler";
import { UserMiddleware, CookieSession } from "../../../../lib/middleware";
import { BadRequest } from "../../../../lib/errors";

export default async function handler(req, res) {
  const { method } = req;
  await dbConnect();
  switch (method) {
    case "GET": {
      try {
        UserMiddleware(req, res);
        const currentUserId = CookieSession.get("currentUser", { req, res });
        const exsistingUser = await User.findById(currentUserId);
        if (!exsistingUser) {
          throw new BadRequest("Invalid User!.");
        }
        res.status(200).json({ status: "success!.", data: exsistingUser });
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
