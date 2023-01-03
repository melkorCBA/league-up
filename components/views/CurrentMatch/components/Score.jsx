import React from "react";

const Score = ({ team }) => {
  const teams = {
    getAbbr: (team) => team?.team.abrev,
    getRuns: (team) => team?.runs ?? 0,
    getWickets: (team) => team?.wickets ?? 0,
    getOvers: (team) => team?.overs ?? 0,
  };
  return (
    <div className="d-flex flex-column align-items-center w-100 p-2">
      <div className="d-flex gap-4 boarder-yelllow">
        <div className="vertical-center d-flex justify-content-center">
          <div className="current-score-text-sm mx-3">
            {teams.getAbbr(team)}
          </div>
        </div>
        <div className="d-flex gap-4 w-100 boarder-yelllow">
          <div className="current-score-text-lg p-2">{teams.getRuns(team)}</div>
          <div className="current-score-text-lg  boarder-yelllow p-2">
            {teams.getWickets(team)}
          </div>
        </div>
      </div>
      <div className="h4 my-2">overs {teams.getOvers(team)}</div>
    </div>
  );
};

export default Score;
