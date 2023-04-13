import React, { useEffect, useState } from "react";
import useUser from "../../hooks/useUser";
import { axiosClient } from "../../lib/apiClient";
import { CLIENT_ENVIRONMENT, setClientenvsInSession } from "../../lib/util";

const User = ({ initalDashboard, clientenvs }) => {
  const {
    user,
    leagues,
    defaultLeague,
    matches,
    currentMatch,
    saveDashbaord,
    addLeague,
  } = useUser(initalDashboard);
  const [newLeagueName, setNewLeagueName] = useState("");
  useEffect(() => {
    setClientenvsInSession(clientenvs);
  }, []);
  return (
    <div className="row container m-auto mt-5">
      <h1 className="text-center">User Settings</h1>
      <div className="text-center">Email : {user.email}</div>

      <div className="col-md-8 col-12 d-flex flex-column align-items-center">
        {/* <div>
          <label className="lable">email</label>
          <span>abc@123.com</span>
        </div> */}

        <h3 className="mb-2 mt-4">Dashboard Settings</h3>
        <div className="form-group d-flex gap-2 p-1">
          <label htmlFor="exampleInputEmail1" className="mr-5">
            Default League :
          </label>

          <select
            className="custom-select"
            onChange={(e) => {
              defaultLeague.onChnage(e.target.value);
            }}
          >
            {leagues &&
              leagues?.length > 0 &&
              leagues.map((league) => (
                <option key={league._id} value={league._id}>
                  {league.name}
                </option>
              ))}
          </select>
        </div>
        <div className="form-group d-flex gap-2 p-1">
          <label htmlFor="exampleInputEmail1" className="mr-5">
            Current Match :
          </label>
          <select
            className="custom-select"
            onChange={(e) => {
              currentMatch.onChnage(e.target.value);
            }}
          >
            {matches &&
              matches?.length > 0 &&
              matches.map((match) => (
                <option key={match._id} value={match._id}>
                  {match.matchKey}
                </option>
              ))}
          </select>
        </div>
        <div>
          <button className="btn btn-secondary" onClick={saveDashbaord}>
            Save
          </button>
        </div>
      </div>

      <div className="col-md-4 col-12">
        <h3>Leagues</h3>
        <ul className="list-group">
          {leagues &&
            leagues?.length > 0 &&
            leagues.map((league) => (
              <li key={league._id} className="list-group-item">
                {league.name}
              </li>
            ))}

          <li className="list-group-item row">
            <input
              type="text"
              placeholder="league name"
              className="col-8"
              value={newLeagueName}
              onChange={(e) => setNewLeagueName(e.target.value)}
            ></input>
            <button
              className="col-4"
              onClick={() => {
                addLeague({ leagueName: newLeagueName });
                setNewLeagueName("");
              }}
            >
              Add League
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default User;

export async function getServerSideProps(context) {
  const envs = CLIENT_ENVIRONMENT;
  const axios = axiosClient(context.req);
  try {
    const dashboardResponse = await axios.get(`api/dashboard`);
    const initalDashboardData = await dashboardResponse["data"];
    return {
      props: {
        initalDashboard: initalDashboardData["data"],
        clientenvs: envs,
      },
    };
  } catch (err) {
    return {
      redirect: {
        destination: "/auth/signin",
        permanent: false,
      },
    };
  }
}
