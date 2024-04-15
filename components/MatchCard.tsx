import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";
import useDeleteMatch from "../hooks/useMatchDelete";
import Switch from "./shared/Switch";

const MatchCard = ({ matchData, matchNumber, isOnLive, onLiveChnage }) => {
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
    ].sort((t1, t2) => t1.tm - t2.tm),
  };
  return (
    <div className="d-flex flex-column  match-card">
      <div className="d-flex justify-content-center m-2">
        <div
          className={`live-icon ${
            isOnLive ? "on-live" : "offline"
          } hand-pointer `}
          onClick={() => onLiveChnage(matchCardData["_id"])}
        ></div>
      </div>
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
        valueLabels={["Active", "Inactive"]}
        values={[false, true]}
        defultValue={match.isDeleted}
        onChange={(v) => onStatusChnage(v)}
        isDisabled="false"
      />
    </div>
  );
};

export default MatchCard;
