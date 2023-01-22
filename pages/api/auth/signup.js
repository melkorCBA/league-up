import User from "../../../models/user";

import dbConnect from "../../../lib/dbConnect";
import { errorHandler, validators } from "../../../lib/errorHandler";
import { CookieSession } from "../../../lib/middleware";
import { BadRequest } from "../../../lib/errors";
import { JWT, Passwords } from "../../../lib/encryption";

export default async function handler(req, res) {
  const { method } = req;
  await dbConnect();
  switch (method) {
    case "POST": {
      try {
        await validators.attach(req, res, [
          validators.body.fields(
            ["email", "password"],
            "Both email & password must be provided for User Signup!."
          ),
        ]);
        const { email, password } = req.body;
        const exsistingUser = await User.findOne({ email });

        if (exsistingUser) {
          throw new BadRequest("email already in use");
        }
        const user = await new User({ email, password });
        await user.save();
        CookieSession.set(
          JWT.signToSession({ id: user["_id"], email: user.email }),
          { req, res }
        );
        res.status(201).json({ status: "Signup success!.", data: user });
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
