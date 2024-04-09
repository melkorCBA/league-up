import { errorHandler } from "../../../lib/errorHandler";
import { CookieSession } from "../../../lib/middleware";

export default async function handler(req, res) {
  const { method } = req;
  switch (method) {
    case "POST": {
      try {
        CookieSession.remove("jwt", { req, res });
        CookieSession.remove("currentUser", { req, res });
        res.status(200).json({ status: "Sign out success!.", data: {} });
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
