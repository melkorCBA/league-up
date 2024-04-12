import Image from "next/image";
import React from "react";

const DoubbleHeader = ({ showLogo, team1, team2 }) => {
  const teams = {
    getName: (team) => team?.team.teamName,
    getLogo: (team) =>
      team?.team.logoURL ??
      "https://melkorwebjobstorage.blob.core.windows.net/web/logo0.png",
  };

  return (
    <div className="d-flex justify-content-between w-100">
      <div className="d-flex flex-column p-5 horizontal-center">
        {showLogo && (
          <div>
            <Image
              src={teams.getLogo(team1)}
              alt="logo"
              width={"200"}
              height={"200"}
              className="rounded"
            />
          </div>
        )}

        <h3 className="text-center">{teams.getName(team1)}</h3>
      </div>

      <div className="d-flex flex-column">
        <h2 className="mt-auto mb-auto">Vs</h2>
      </div>
      <div className="d-flex flex-column p-5 horizontal-center">
        {showLogo && (
          <div>
            <Image
              src={teams.getLogo(team2)}
              alt="logo"
              width={"200"}
              height={"200"}
              className="rounded"
            />
          </div>
        )}

        <h3 className="text-center">{teams.getName(team2)}</h3>
      </div>
    </div>
  );
};

export default DoubbleHeader;
