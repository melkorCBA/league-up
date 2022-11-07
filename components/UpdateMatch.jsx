import React, { useState } from "react";
import styles from "../styles/Home.module.css";
import Switch from "./Switch";

const MatchTeam = ({ teamAbrev, initialData, onChange, isDisabled }) => {
  const [team, setTeam] = useState(initialData);
  const onFieldChange = (key, value) => {
    const up = { ...team, [key]: value };
    setTeam(up);
    onChange(team);
  };
  return (
    <>
      <h2 className="text-center">{teamAbrev}</h2>
      <div className="d-flex boarder-yelllow gap-3 my-2">
        <input
          type="text"
          value={team["runs"]}
          onChange={(e) => onFieldChange("runs", e.target.value)}
          placeholder="Runs"
          className="w-100"
          disabled={isDisabled}
        />
        /
        <input
          type="text"
          value={team["wickets"]}
          onChange={(e) => onFieldChange("wickets", e.target.value)}
          placeholder="W"
          disabled={isDisabled}
        />
      </div>
      <div className="d-flex boarder-yelllow  justify-content-between">
        <div className="px-2">Overs</div>
        <input
          type="text"
          placeholder="0.0"
          value={team["overs"]}
          onChange={(e) => onFieldChange("overs", e.target.value)}
          disabled={isDisabled}
        />
      </div>
    </>
  );
};

const UpdateMatch = ({ league, match, updateMatch }) => {
  const { team1: t1, team2: t2, ...matchMetaData } = match;
  const [team1, setTeam1] = useState(t1);
  const [team2, setTeam2] = useState(t2);
  const [matchMeta, setMatchMeta] = useState(matchMetaData);
  const onMeataFieldChange = (key, value) => {
    const mt = { ...matchMeta, [key]: value };
    setMatchMeta(mt);
  };

  const onUpdate = () => {
    updateMatch(match["_id"], { team1, team2, ...matchMeta });
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mt-1">League : {league.name}</h2>
      <h3 className="text-center mt-1 mb-4">Match 2</h3>
      <div className="row justify-content-md-center mb-2">
        <div className="col-md-4">
          <MatchTeam
            teamAbrev={team1["team"].abrev}
            initialData={team1}
            onChange={(t) => setTeam1(t)}
            isDisabled={matchMeta["lockedForSync"]}
          />
        </div>
        <div className="col-md-2">
          <div className="d-flex my-5 flex-column justify-content-center gap-3">
            <Switch
              valueLabels={["TMA", "NA", "TMB"]}
              label="Toss"
              onChange={(v) => onMeataFieldChange("toss", v)}
              values={["1", "0", "2"]}
              defultValue={matchMeta["toss"]}
              isDisabled={matchMeta["lockedForSync"]}
            />
            <Switch
              valueLabels={["TMA", "NA", "TMB"]}
              label="Bat 1st"
              onChange={(v) => onMeataFieldChange("bat1st", v)}
              values={["1", "0", "2"]}
              defultValue={matchMeta["bat1st"]}
              isDisabled={matchMeta["lockedForSync"]}
            />
            <Switch
              valueLabels={["TMA", "Draw", "NA", "TMB"]}
              label="Win"
              onChange={(v) => onMeataFieldChange("won", v)}
              values={["1", "0", "-1", "2"]}
              defultValue={matchMeta["bat1st"]}
              isDisabled={matchMeta["lockedForSync"]}
            />
            <div>
              <div className="text-center  mt-2 mb-1">Win by</div>
              <input
                disabled={matchMeta["lockedForSync"]}
                className="w-100 text-center"
                type="text"
                value={matchMeta["winMargin"]}
                onChange={(e) =>
                  onMeataFieldChange("winMargin", e.target.value)
                }
              />
            </div>
            <Switch
              valueLabels={["No", "Yes"]}
              label="locked"
              onChange={(v) => onMeataFieldChange("lockedForSync", v)}
              values={[false, true]}
              defultValue={match["lockedForSync"]}
            />
            <Switch
              valueLabels={["No", "Yes"]}
              label="synced"
              onChange={(v) => onMeataFieldChange("isSynced", v)}
              values={[false, true]}
              defultValue={match["isSynced"]}
              isDisabled={!matchMeta["lockedForSync"]}
            />
          </div>
        </div>
        <div className="col-md-4">
          <MatchTeam
            teamAbrev={team2["team"].abrev}
            initialData={team2}
            onChange={(t) => setTeam2(t)}
            isDisabled={matchMeta["lockedForSync"]}
          />
        </div>
      </div>
      <div className="row justify-content-md-center">
        <div className="col-md-10 py-2">
          <button
            className="btn btn-warning w-100"
            disabled={!matchMeta["lockedForSync"]}
            onClick={onUpdate}
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateMatch;
