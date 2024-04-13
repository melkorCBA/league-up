import { getCookies, getCookie, setCookie, deleteCookie } from "cookies-next";
import Match from "../models/match";
import Team from "../models/team";
import User from "../models/user";

import { JWT } from "./encryption";
import { BadRequest, Unauthorized } from "./errors";
import { isNullEmpty } from "./util";
import { NextApiRequest, NextApiResponse } from "next";

type NextAPIRequestResponse ={
  req:NextApiRequest,
  res:NextApiResponse
}

const CookieSession = {
  set: (session, { req, res, maxAge }: NextAPIRequestResponse & {maxAge?: number}) => {
    Object.keys(session).forEach((key) => {
      setCookie(key, session[key], {
        httpOnly: true,
        req,
        res,
        maxAge: maxAge ?? 60 * 60 * 24,
      });
    });
  },
  remove: (sessionKey, { req, res }) => {
    deleteCookie(sessionKey, {
      req,
      res,
    });
  },
  get: (sessionKey, { req, res }) => {
    return getCookie(sessionKey, { req, res });
  },
};

const UserMiddleware = (req:NextApiRequest, res:NextApiResponse) => {
  try {
    const jwt = CookieSession.get("jwt", { req, res });
    const userPayload = JWT.getUserPayload({ jwt });
    if (isNullEmpty(CookieSession.get("currentUser", { req, res })))
      CookieSession.set({ currentUser: userPayload["id"] }, { req, res });
  } catch (err) {
    throw new Unauthorized("No User session present!");
  }
};

const checkUserAccess = {
  hasLeagueAccess: async (leagueId, { req, res }) => {
    const userId = CookieSession.get("currentUser", { req, res });
    const currentUser = await User.findById(userId);
    return currentUser.hasLeagueAccess(leagueId);
  },
  hasDashboardAccess: async ({ league }, { req, res }) => {
    const userId = CookieSession.get("currentUser", { req, res });
    const currentUser = await User.findById(userId);
    return currentUser.hasLeagueAccess(league);
  },

  hasTeamAccess: async (teamId, { req, res }) => {
    const team = await Team.findById(teamId);
    if (!team) throw new BadRequest("invalid team!");
    const leagueId = team.league;

    const userId = CookieSession.get("currentUser", { req, res });
    const currentUser = await User.findById(userId);
    return currentUser.hasLeagueAccess(leagueId);
  },
  hasMatchAccess: async (matchId, { req, res }) => {
    const match = await Match.findById(matchId);
    if (!match) throw new BadRequest("invalid match!");
    const leagueId = match.league;

    const userId = CookieSession.get("currentUser", { req, res });
    const currentUser = await User.findById(userId);
    return currentUser.hasLeagueAccess(leagueId);
  },
};

const getUserData = async ({ req, res }, populateField = "") => {
  const userId = CookieSession.get("currentUser", { req, res });
  if (isNullEmpty(populateField)) {
    const currentUser = await User.findById(userId);
    return currentUser;
  }
  const currentUser = await User.findById(userId).populate(populateField);
  return currentUser;
};

export { CookieSession, UserMiddleware, checkUserAccess, getUserData };
