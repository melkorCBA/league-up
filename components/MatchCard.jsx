import { useRouter } from "next/router";
import React, { useState } from "react";
import useDeleteMatch from "../hooks/useMatchDelete";
import Switch from "./Switch";

const MatchCard = ({ matchData, matchNumber }) => {
  const { match, updateMatch } = useDeleteMatch(matchData);
  const onStatusChnage = (status) => {
    updateMatch(status);
  };
  const router = useRouter();
  const whoWon = () => {
    if (+match.won < 0) return "No Result";
    if (+match.won === 0) return "Match Drawn";
    if (+match.won === 1)
      return `${match.team1.team.abrev} won by ${match.winMargin}`;
    return `${match.team2.team.abrev} won by ${match.winMargin}`;
  };
  const matchCardData = {
    _id: match._id,
    matchNumber,
    teams: [
      {
        _id: match.team1.team._id,
        name: match.team1.team.abrev,
        runs: match.team1.runs,
        wickets: match.team1.wickets,
        overs: match.team1.overs,
        tm: match.bat1st === "1" ? 0 : 1,
      },
      {
        _id: match.team1.team._id,
        name: match.team2.team.abrev,
        runs: match.team2.runs,
        wickets: match.team2.wickets,
        overs: match.team2.overs,
        tm: match.bat1st === "2" ? 0 : 1,
      },
    ].sort((t1, t2) => t1 - t2),
  };
  return (
    <div className="d-flex flex-column  match-card">
      <div
        onClick={() => router.push(`matches/${matchCardData["_id"]}`)}
        className="hand-pointer"
      >
        Match {matchCardData.matchNumber}
      </div>
      <div
        className="d-flex justify-content-center gap-4 my-2 flex-md-nowrap flex-sm-nowrap hand-pointer"
        onClick={() => router.push(`matches/${matchCardData["_id"]}`)}
      >
        <div className="d-flex flex-column match-card-team">
          <div>{matchCardData.teams[0].name}</div>
          <div>
            {matchCardData.teams[0].runs}/{matchCardData.teams[0].wickets}
          </div>
          <div>({matchCardData.teams[0].overs})</div>
        </div>
        <div className="align-self-center match-card-team ">
          <h5>Vs</h5>
        </div>
        <div className="d-flex flex-column match-card-team">
          <div>{matchCardData.teams[1].name}</div>
          <div>
            {matchCardData.teams[1].runs}/{matchCardData.teams[1].wickets}
          </div>
          <div>({matchCardData.teams[1].overs})</div>
        </div>
      </div>
      <div>{whoWon()}</div>
      <Switch
        label=""
        valueLabels={["off", "on"]}
        values={[true, false]}
        defultValue={match.isDeleted}
        onChange={(v) => onStatusChnage(v)}
      />
    </div>
  );
};

export default MatchCard;
