import Team from "../../models/team";
import Logo from "../../models/logo";
import dbConnect from "../../lib/dbConnect";
import { errorHandler, validators } from "../../lib/errorHandler";
import { getPublisher, trigger } from "../../pusher/publisher";
import { CHANNELS, EVENTS } from "../../pusher/constants";
import {
  UserMiddleware,
  checkUserAccess,
  getUserData,
} from "../../lib/middleware";

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

        UserMiddleware(req, res);
        const currentUser = await getUserData({ req, res });
        const leagueId = req.query["leagueId"] ?? currentUser.defaultLeague;

        // check user has acces to specified league - league in users's league list ?
        const hasAccessToLeague = await checkUserAccess.hasLeagueAccess(
          leagueId,
          { req, res }
        );
        if (!hasAccessToLeague) {
          throw new Unauthorized("User doesn't have access to the league set");
        }

        const teams = await Team.find({ isActive: true, league: leagueId });

        teams.sort((team1, team2) => {
          if (team2.pts - team1.pts !== 0) return team2.pts - team1.pts;
          return team2.nr - team1.nr;
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
          validators.body.field("abrev", "team short name(abrev) is required"),
        ]);

        UserMiddleware(req, res);
        const currentUser = await getUserData({ req, res });
        const leagueId = req.body["leagueId"] ?? currentUser.defaultLeague;

        // check user has acces to specified league - league in users's league list ?
        const hasAccessToLeague = await checkUserAccess.hasLeagueAccess(
          leagueId,
          { req, res }
        );
        if (!hasAccessToLeague) {
          throw new Unauthorized("User doesn't have access to the league set");
        }

        const { teamName, logoURL, abrev } = req.body;
        const team = new Team({
          teamName,
          logoURL,
          abrev,
          league: leagueId,
        });

        // set logo
        const unUsedLogo = await Logo.findOne({ isUsed: false });
        if (unUsedLogo) {
          team["logoID"] = unUsedLogo["_id"];
          team["logoURL"] = unUsedLogo["logoURL"];

          // persist logo attachment
          unUsedLogo["isUsed"] = true;
        }
        await team.save();
        if (unUsedLogo) await unUsedLogo.save();
        trigger(publisher, {
          channelName: CHANNELS.STANDING_BOARD,
          eventName: EVENTS.UPDATE_TEAMS,
        });
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
