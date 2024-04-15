import Image from "next/image";
import React, { useState } from "react";
import useTeam from "../hooks/useTeam";

const UpdateGrid = ({ data, league }) => {
  const {
    teams,
    onUpdate,
    updateTeam,
    onNewTeamChange,
    newTeam,
    addTeam,
    removeTeam,
    onLeaugeNameChange,
    leagueName,
    updateLeagueData,
    unsyncTeamMatches,
  } = useTeam(data, league);
  return (
    <div className="update-grid">
      <div className="my-3 d-flex gap-2">
        <input
          id="leangueName"
          type="text"
          value={leagueName}
          onChange={(e) => onLeaugeNameChange(e.target.value)}
          className="w-100 form-control"
        />
        <button
          className="btn btn-outline-secondary"
          onClick={updateLeagueData}
        >
          Update
        </button>
      </div>
      <div className="row w-100 mx-auto table-responsive-sm">
        <table className="table">
          <thead>
            <tr>
              <th></th>
              <th>Team</th>
              <th>Abrev</th>
              <th>Pld</th>
              <th>W</th>
              <th>D</th>
              <th>L</th>
              <th>PTS</th>
              <th>NR</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {teams?.map((d, i) => (
              <tr
                key={d["_id"]}
                className={"row" + (i < 2 ? "table-primary" : "")}
              >
                <td>
                  <span>{i + 1}</span>
                </td>

                <td className="teamName">
                  <input
                    className="form-control"
                    value={d["teamName"]}
                    onChange={(e) => onUpdate(i, "teamName", e.target.value)}
                  />
                </td>
                <td className="abrev">
                  <input
                    className="form-control"
                    value={d["abrev"]}
                    onChange={(e) => onUpdate(i, "abrev", e.target.value)}
                  />
                </td>

                <td>
                  <input
                    className="form-control"
                    value={d["pld"]}
                    onChange={(e) => onUpdate(i, "pld", e.target.value)}
                  />
                </td>
                <td>
                  <input
                    className="form-control"
                    value={d["win"]}
                    onChange={(e) => onUpdate(i, "win", e.target.value)}
                  />
                </td>
                <td>
                  <input
                    className="form-control"
                    value={d["draw"]}
                    onChange={(e) => onUpdate(i, "draw", e.target.value)}
                  />
                </td>
                <td>
                  <input
                    className="form-control"
                    value={d["loss"]}
                    onChange={(e) => onUpdate(i, "loss", e.target.value)}
                  />
                </td>
                <td>
                  <input
                    className="form-control"
                    value={d["pts"]}
                    onChange={(e) => onUpdate(i, "pts", e.target.value)}
                  />
                </td>
                <td>
                  <input
                    className="form-control"
                    value={d["nr"]}
                    onChange={(e) => onUpdate(i, "nr", e.target.value)}
                  />
                </td>
                <td className="d-flex justify-content-center">
                  <button
                    className="btn btn-outline-secondary mx-2"
                    onClick={() => updateTeam(i)}
                  >
                    update
                  </button>
                  <button
                    className="btn btn-outline-secondary"
                    onClick={() => removeTeam(i)}
                  >
                    delete
                  </button>
                  <button
                    className="btn btn-outline-secondary"
                    onClick={() => unsyncTeamMatches(i)}
                  >
                    unSync
                  </button>
                </td>
              </tr>
            ))}
            <tr>
              <td>
                <span>#</span>
              </td>

              <td className="teamName">
                <input
                  className="form-control"
                  value={newTeam["teamName"]}
                  onChange={(e) => onNewTeamChange("teamName", e.target.value)}
                  placeholder="team name here.."
                />
              </td>
              <td className="abrev">
                <input
                  className="form-control"
                  value={newTeam["abrev"]}
                  onChange={(e) => onNewTeamChange("abrev", e.target.value)}
                  placeholder="abrv"
                />
              </td>

              <td>
                <input
                  className="form-control"
                  value={newTeam["pld"]}
                  onChange={(e) => onNewTeamChange("pld", e.target.value)}
                  placeholder="games played"
                />
              </td>
              <td>
                <input
                  className="form-control"
                  value={newTeam["win"]}
                  onChange={(e) => onNewTeamChange("win", e.target.value)}
                  placeholder="games won"
                />
              </td>
              <td>
                <input
                  className="form-control"
                  value={newTeam["draw"]}
                  onChange={(e) => onNewTeamChange("draw", e.target.value)}
                  placeholder="games drawn"
                />
              </td>
              <td>
                <input
                  className="form-control"
                  value={newTeam["loss"]}
                  onChange={(e) => onNewTeamChange("loss", e.target.value)}
                  placeholder="games lost"
                />
              </td>
              <td>
                <input
                  className="form-control"
                  value={newTeam["pts"]}
                  onChange={(e) => onNewTeamChange("pts", e.target.value)}
                  placeholder="points"
                />
              </td>
              <td>
                <input
                  className="form-control"
                  value={newTeam["nr"]}
                  onChange={(e) => onNewTeamChange("nr", e.target.value)}
                  placeholder="net runrate"
                />
              </td>
              <td>
                <button
                  className="btn btn-outline-secondary w-100"
                  onClick={() => addTeam()}
                >
                  Add
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UpdateGrid;
