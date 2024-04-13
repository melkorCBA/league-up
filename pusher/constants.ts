const CHANNELS = ['standings', 'current-match', 'dashboard'] as const 
const TEAM_EVENTS = ['updateTeams'] as const;
const MATCH_EVENTS = ['updateMatch'] as const;
const DASHBOARD_EVENTS = ['updateDashboard', 'updateLeagueInView', 'updateView', 'updateCurrentMatch'] as const;
const STANDINGS_EVENTS = ['updateTeams'] as const;

type EVENTS = {
  TEAM: `TEAM_${typeof TEAM_EVENTS[number]}`,
  MATCH: `MATCH_${typeof MATCH_EVENTS[number]}`,
  DASHBOARD: `DASHBOARD_${typeof DASHBOARD_EVENTS[number]}`,
  STANDINGS: `STANDINGS_${typeof STANDINGS_EVENTS[number]}`
}

export type PusherEvent = EVENTS[keyof EVENTS]
export type PusherChannel = typeof CHANNELS[number]
