export const findLeagueById = function (leagueId) {
  return this.leagues.find((l) => l.equals(leagueId));
};
export const hasLeagueAccess = function (leagueId) {
  return this.leagues.find((l) => l.equals(leagueId)) ? true : false;
};
