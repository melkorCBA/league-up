import { useState } from "react";
import axios from "axios";
import { ENVIRONMENT } from "../lib/util";
import { useError } from "../contexts/errorContext";

const useTeam = (initialTeams, initialLeague) => {
  const [teams, setTeams] = useState(initialTeams);
  const [league, setLeague] = useState(initialLeague);
  const { setErrors, setSuccess } = useError();
  const emptyTeam = {
    teamName: "",
    pld: "",
    win: "",
    draw: "",
    loss: "",
    pts: "",
    nr: "",
  };
  const [newTeam, setNewTeam] = useState(emptyTeam);

  const onUpdate = (index, key, value) => {
    const update = [...teams];
    update[index][key] = value;
    setTeams(update);
  };

  const onLeaugeNameUpdate = (name) => {
    setLeague({ ...league, name });
  };

  const updateTeam = async (index) => await patchTeam(teams[index]);
  const removeTeam = async (index) => await deleteTeam(teams[index]["_id"]);

  const patchTeam = async (team) => {
    const URL = `${ENVIRONMENT.BaseApiURL}/teams/${team["_id"]}`;
    try {
      await axios.patch(URL, team);
      setSuccess("team updated");
      await reFeatchTeams();
    } catch (err) {
      setErrors([err["message"]]);
    }
  };

  const deleteTeam = async (id) => {
    const URL = `${ENVIRONMENT.BaseApiURL}/teams/${id}`;
    try {
      await axios.delete(URL);
      setSuccess("team deleted");
      await reFeatchTeams();
    } catch (err) {
      setErrors([err["message"]]);
    }
  };

  const updateLeague = async () => {
    const URL = `${ENVIRONMENT.BaseApiURL}/league`;
    try {
      await axios.patch(URL, { leagueName: league["name"] });
      setSuccess("league name updated");
      await reFeatchTeams();
    } catch (err) {
      setErrors([err["message"]]);
    }
  };

  const reFeatchTeams = async () => {
    const response = await axios.get(`${ENVIRONMENT.BaseApiURL}/teams`);
    const { data } = response.data;
    setTeams(data);
  };

  const addTeam = async () => {
    const URL = `${ENVIRONMENT.BaseApiURL}/teams`;
    try {
      const payload = {};
      Object.keys(newTeam).forEach((key) => {
        if (newTeam[key] !== "") {
          payload[key] = newTeam[key];
        }
      });
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

  return {
    teams,
    onUpdate,
    updateTeam,
    onNewTeamChange,
    newTeam,
    addTeam,
    removeTeam,
    onLeaugeNameUpdate,
    leagueName: league["name"],
    updateLeague,
  };
};

export default useTeam;
