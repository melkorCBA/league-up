import React, { useEffect, useState } from "react";

import { getHashMap } from "../lib/util";

const NewMatch = ({ teams, addNewMatch }) => {
  const [selectedteams, setSelectedteams] = useState([]);

  const hamp = getHashMap(teams, "_id");
  const [teamsHamp, setTeamsHamp] = useState(hamp);
  const selectTeam = (id, i) => {
    const t = [...selectedteams];
    t[i] = teamsHamp[id];
    setSelectedteams(t);
  };

  useEffect(() => {
    const hamp = getHashMap(teams, "_id");
    setTeamsHamp(hamp);
  }, [teams]);

  const isValidSelections = () => {
    return (
      selectedteams.length > 1 && selectedteams[0]?._id && selectedteams[1]?._id
    );
  };

  const filterdTeams = (i) => {
    if (selectedteams[i] === undefined) return teams;
    return teams.filter((team) => team._id !== selectedteams[i]?._id);
  };

  return (
    <>
      <div className="d-flex flex-row gap-4 py-5 px-2 justify-content-center flex-md-nowrap flex-wrap">
        <div className="d-flex flex-column gap-2 w-50 align-items-center py-4">
          <label className="d-block">1st Team</label>
          <select
            className="w-50"
            name="team1s"
            value={selectedteams[0] ? selectedteams[0]["_id"] : "select team"}
            onChange={(e) => selectTeam(e.target.value, 0)}
          >
            <option>select team</option>
            {filterdTeams(1).map((team) => (
              <option key={team._id} value={team._id}>
                {team.teamName}
              </option>
            ))}
          </select>
        </div>
        <div className="d-flex flex-column gap-2 w-50 align-items-center py-4">
          <label className="d-block">2nd Team</label>
          <select
            className="w-50"
            name="team2s"
            value={selectedteams[1] ? selectedteams[1]["_id"] : "select team"}
            onChange={(e) => selectTeam(e.target.value, 1)}
          >
            <option>select team</option>
            {filterdTeams(0).map((team) => (
              <option key={team._id} value={team._id}>
                {team.teamName}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div>
        <button
          className="btn btn-secondary w-100"
          onClick={() => addNewMatch(selectedteams)}
          disabled={!isValidSelections()}
        >
          Start Match
        </button>
      </div>
    </>
  );
};

export default NewMatch;
