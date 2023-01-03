import React from "react";
import DoubbleHeader from "./components/DoubbleHeader";
import Footer from "./components/Footer";
import MatchNumber from "./components/MatchNumber";
import Score from "./components/Score";
import {
  TOSS_STATUS,
  BATFIRST_STATUS,
  CONSTANTS,
  WIN_STATUS,
} from "../../../lib/util";

const CurrentMatch = ({ match, matchView, miniView }) => {
  const beforeMatch = () => {
    const getFooterText = () => {
      const getTeamName = (team) => team?.team.teamName;
      const tossWinTeam =
        match.toss === TOSS_STATUS.TEAM1_WON
          ? getTeamName(match.team1)
          : getTeamName(match.team2);
      const batFirstTeam =
        match.bat1st === BATFIRST_STATUS.TEAM1_BAT1ST
          ? getTeamName(match.team1)
          : getTeamName(match.team2);
      return `${tossWinTeam} won the toss and choose to ${
        tossWinTeam === batFirstTeam ? "Bat first" : "Field fisrt"
      }`;
    };
    return (
      <>
        <MatchNumber num={2} />
        <DoubbleHeader
          showLogo={true && !miniView}
          team1={match?.team1}
          team2={match.team2}
        />
        <Footer text={getFooterText()} />
      </>
    );
  };
  // has two states for 2 innigns
  const onMatch = () => {
    return (
      <>
        <MatchNumber num={2} />
        <DoubbleHeader
          showLogo={false}
          team1={match?.team1}
          team2={match.team2}
        />
        <Score team={match["team1"]} />
        <Footer />
      </>
    );
  };

  const afterMatch = () => {
    const getFooter = {
      win: (teamName, winMargin) => `${teamName} won by ${winMargin}`,
      draw: "Match Drawn!",
    };

    const winMargin = match?.winMargin;
    const isDrawn = match?.won === WIN_STATUS.DRAW;
    const wonTeamName = ((t) => {
      if (t === WIN_STATUS.TEAM1_WON) return match.team1.team.teamName;
      if (t === WIN_STATUS.TEAM2_WON) return match.team2.team.teamName;
      return "";
    })(match?.won);
    const footerText = isDrawn
      ? getFooter["draw"]
      : getFooter["win"](wonTeamName, winMargin);
    return (
      <>
        <MatchNumber num={2} />
        <DoubbleHeader
          showLogo={false}
          team1={match?.team1}
          team2={match.team2}
        />
        <div className="current-score-text-sm">
          {isDrawn ? "" : "Congratulations!"}
        </div>
        <div className="current-score-text-sm">{wonTeamName}</div>
        <Footer text={footerText} />
      </>
    );
  };

  const matchViews = {
    [CONSTANTS.VIEWS.MATCH_VIEWS.PRE_MATCH]: beforeMatch(),
    [CONSTANTS.VIEWS.MATCH_VIEWS.ON_MATCH]: onMatch(),
    [CONSTANTS.VIEWS.MATCH_VIEWS.POST_MATCH]: afterMatch(),
  };
  return (
    <div className="d-flex flex-column align-items-center vertical-center w-100">
      {matchViews[matchView] ?? ""}
    </div>
  );
};

export default CurrentMatch;
