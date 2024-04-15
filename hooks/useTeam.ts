import { useEffect, useState } from "react";
import axios from "axios";
import { ENVIRONMENT } from "../lib/util";
import { useError } from "../contexts/errorContext";
import { leagueService } from "../services/apiClients/league.service";
import { teamService } from "../services/apiClients/team.service";

const useTeam = (initialTeams, initialLeague) => {
  const [teams, setTeams] = useState(initialTeams);
  const [league, setLeague] = useState(initialLeague);
  const { setErrors, setSuccess } = useError();
  const emptyTeam = {
    teamName: "",
    abrev: "",
    pld: "",
    win: "",
    draw: "",
    loss: "",
    pts: "",
    nr: "",
    logoURL: "",
  };
  const [newTeam, setNewTeam] = useState(emptyTeam);

  useEffect(() => {
    setTeams(initialTeams);
  }, [initialTeams]);
  useEffect(() => {
    setLeague(initialLeague);
  }, [initialLeague]);

  const onUpdate = (index, key, value) => {
    const update = [...teams];
    update[index][key] = value;
    setTeams(update);
  };

  const onLeaugeNameChange = (name) => {
    setLeague({ ...league, name });
  };

  const updateTeam = async (index) => await patchTeam(teams[index]);
  const removeTeam = async (index) => await deleteTeam(teams[index]["_id"]);
  const unsyncTeamMatches = async (index) =>
    await changeSycnStatus(teams[index]["_id"], false);

  const patchTeam = async (team) => {
    try {
      const { _id: teamId } = team;
      await teamService.updateTeam(teamId, team);
      setSuccess("team updated");
      await reFeatchTeams();
    } catch (err) {
      setErrors([err["message"]]);
    }
  };

  const deleteTeam = async (teamId) => {
    try {
      await teamService.deleteTeam(teamId);
      setSuccess("team deleted");
      await reFeatchTeams();
    } catch (err) {
      setErrors([err["message"]]);
    }
  };

  const updateLeagueData = async () => {
    try {
      const { _id: leagueId } = league;
      const { name: leagueName } = league;
      await leagueService.updateLeague(leagueId, { leagueName });
      setSuccess("league name updated");
      await reFeatchTeams();
    } catch (err) {
      setErrors([err["message"]]);
    }
  };

  const reFeatchTeams = async () => {
    try {
      const { _id: leagueId } = league;
      const data = await teamService.getTeams(leagueId);
      setTeams(data);
    } catch (err) {
      setErrors([err["message"]]);
    }
  };

  const addTeam = async () => {
    try {
      const { _id: leagueId } = league;
      const payload = {
        teamName: newTeam.teamName,
        logoURL: newTeam.logoURL,
        abrev: newTeam.abrev,
      };
      await teamService.addTeam(leagueId, payload);
      setSuccess("team added");
      setNewTeam(emptyTeam);
      await reFeatchTeams();
    } catch (err) {
      setErrors([err["message"]]);
    }
  };

  const onNewTeamChange = (key, value) => {
    const nt = { ...newTeam };
    nt[key] = value;
    setNewTeam(nt);
  };

  //change Team's All Matches SycnStatus
  const changeSycnStatus = async (teamId, status) => {
    try {
      const payload = {
        syncStatus: !!status,
      };
      await teamService.syncMatches(teamId, payload);
      setSuccess("sycn all matches associated with the team");
      await reFeatchTeams();
    } catch (err) {
      setErrors([err["message"]]);
    }
  };

  return {
    teams,
    onUpdate,
    updateTeam,
    onNewTeamChange,
    newTeam,
    addTeam,
    removeTeam,
    onLeaugeNameChange,
    leagueName: league["name"],
    updateLeagueData,
    unsyncTeamMatches,
  };
};

export default useTeam;
