import React from "react";
import MatchCard from "./MatchCard";

const MatchesCardList = ({ matches, currentMatchId, updateCurrentMatch }) => {
  return (
    <>
      <h2 className="text-center mt-5">Matches</h2>
      <div className="row  my-1 p-2">
        {matches.map((match, i) => (
          <div key={match._id} className="col-12 col-sm-4 col-md-3 my-2">
            <MatchCard
              matchData={match}
              matchNumber={i + 1}
              isOnLive={currentMatchId === match._id}
              onLiveChnage={updateCurrentMatch}
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default MatchesCardList;
