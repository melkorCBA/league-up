import { useEffect, useState } from "react";
import axios from "axios";
import { ENVIRONMENT } from "../lib/util";
import { useError } from "../contexts/errorContext";

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
    const URL = `${ENVIRONMENT().BaseApiURL}/teams/${team["_id"]}`;
    try {
      await axios.patch(URL, team);
      setSuccess("team updated");
      await reFeatchTeams();
    } catch (err) {
      setErrors([err["message"]]);
    }
  };

  const deleteTeam = async (id) => {
    const URL = `${ENVIRONMENT().BaseApiURL}/teams/${id}`;
    try {
      await axios.delete(URL);
      setSuccess("team deleted");
      await reFeatchTeams();
    } catch (err) {
      setErrors([err["message"]]);
    }
  };

  const updateLeagueData = async () => {
    const URL = `${ENVIRONMENT().BaseApiURL}/league`;
    try {
      await axios.patch(URL, {
        leagueName: league["name"],
        leagueId: league["_id"],
      });
      setSuccess("league name updated");
      await reFeatchTeams();
    } catch (err) {
      setErrors([err["message"]]);
    }
  };

  const reFeatchTeams = async () => {
    const { _id: leagueId } = league;
    // const response = await axios.get(
    //   `${ENVIRONMENT().BaseApiURL}/teams?leagueId=${leagueId}`
    // );

    // const { data } = response.data;
    // setTeams(data);
  };

  const addTeam = async () => {
    const URL = `${ENVIRONMENT().BaseApiURL}/teams`;
    try {
      const payload = {};
      Object.keys(newTeam).forEach((key) => {
        if (newTeam[key] !== "") {
          payload[key] = newTeam[key];
        }
      });
      // attaching leagueId,
      payload["leagueId"] = league["_id"];
      await axios.post(URL, payload);
      setSuccess("team added");
      setNewTeam(emptyTeam);
      await reFeatchTeams();
    } catch (err) {
      setErrors([err["message"]]);
    }
  };

  const onNewTeamChange = (key, value) => {
    if (value === "") {
      return;
    }
    const nt = { ...newTeam };
    nt[key] = value;
    setNewTeam(nt);
  };

  //change Team's All Matches SycnStatus
  const changeSycnStatus = async (teamId, status) => {
    const URL = `${ENVIRONMENT().BaseApiURL}/teams/${teamId}/matches/syncAll`;
    try {
      const payload = {
        syncStatus: !!status,
      };

      await axios.patch(URL, payload);
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
