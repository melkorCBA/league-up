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
    onLeaugeNameUpdate,
    leagueName,
    updateLeague,
  } = useTeam(data, league);
  return (
    <>
      <div className="my-2 mx-1 d-flex">
        <label htmlFor="leangueName" className="mx-2">
          League
        </label>
        <input
          id="leangueName"
          type="text"
          value={leagueName}
          onChange={(e) => onLeaugeNameUpdate(e.target.value)}
          className="w-100 mx-2"
        />
        <button className="btn btn-outline-secondary" onClick={updateLeague}>
          Update
        </button>
      </div>
      <div className="row w-100 mx-auto">
        <table className="table table-dark">
          <thead>
            <tr>
              <th></th>
              <th>Team</th>
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
              <tr key={d._id} className={"row" + i < 2 ? "table-primary" : ""}>
                <td>
                  <span>{i + 1}</span>
                </td>

                <td className="teamName">
                  <input
                    value={d["teamName"]}
                    onChange={(e) => onUpdate("teamName", e.target.value)}
                  />
                </td>

                <td>
                  <input
                    value={d["pld"]}
                    onChange={(e) => onUpdate(i, "pld", e.target.value)}
                  />
                </td>
                <td>
                  <input
                    value={d["win"]}
                    onChange={(e) => onUpdate(i, "win", e.target.value)}
                  />
                </td>
                <td>
                  <input
                    value={d["draw"]}
                    onChange={(e) => onUpdate(i, "draw", e.target.value)}
                  />
                </td>
                <td>
                  <input
                    value={d["loss"]}
                    onChange={(e) => onUpdate(i, "loss", e.target.value)}
                  />
                </td>
                <td>
                  <input
                    value={d["pts"]}
                    onChange={(e) => onUpdate(i, "pts", e.target.value)}
                  />
                </td>
                <td>
                  <input
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
                </td>
              </tr>
            ))}
            <tr>
              <td>
                <span>#</span>
              </td>

              <td className="teamName">
                <input
                  value={newTeam["teamName"]}
                  onChange={(e) => onNewTeamChange("teamName", e.target.value)}
                />
              </td>

              <td>
                <input
                  value={newTeam["pld"]}
                  onChange={(e) => onNewTeamChange("pld", e.target.value)}
                />
              </td>
              <td>
                <input
                  value={newTeam["win"]}
                  onChange={(e) => onNewTeamChange("win", e.target.value)}
                />
              </td>
              <td>
                <input
                  value={newTeam["draw"]}
                  onChange={(e) => onNewTeamChange("draw", e.target.value)}
                />
              </td>
              <td>
                <input
                  value={newTeam["loss"]}
                  onChange={(e) => onNewTeamChange("loss", e.target.value)}
                />
              </td>
              <td>
                <input
                  value={newTeam["pts"]}
                  onChange={(e) => onNewTeamChange("pts", e.target.value)}
                />
              </td>
              <td>
                <input
                  value={newTeam["nr"]}
                  onChange={(e) => onNewTeamChange("nr", e.target.value)}
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
    </>
  );
};

export default UpdateGrid;
