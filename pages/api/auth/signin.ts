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
            "Both email & password must be provided for User SignIn!."
          ),
        ]);
        const { email, password } = req.body;
        const existingUser = await User.findOne({ email });

        if (!existingUser) {
          throw new BadRequest("Invalid User!.");
        }
        const passwordMatch = await Passwords.compare(
          existingUser.password,
          password
        );
        if (!passwordMatch) {
          throw new BadRequest("invlaid credentials");
        }
        // generate jwt & set session

        CookieSession.set(
          JWT.signToSession({
            id: existingUser["_id"],
            email: existingUser.email,
          }),
          { req, res }
        );
        res
          .status(200)
          .json({ status: "signin success!.", data: existingUser });
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
