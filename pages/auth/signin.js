import React, { useEffect, useState } from "react";
import { UseRequest, RequestMethods } from "../../hooks/useRequest";
import { axiosClient } from "../../lib/apiClient";
import Router from "next/router";
import {
  setClientenvsInSession,
  ENVIRONMENT,
  CLIENT_ENVIRONMENT,
} from "../../lib/util";
import { ACTIONS, useStore } from "../../contexts/storeContext";
import useLoading from "../../hooks/useLoading";
import { userService } from "../../services/api-service";
export default function Signin({ clientenvs }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { start, end } = useLoading();

  const { doRequest } = UseRequest(
    {
      url: `${ENVIRONMENT().BaseApiURL}/auth/signin`,
      method: RequestMethods.POST,
      body: { email, password },
      onSuccess: () => {
        // to do a navgation with page refresh to update login states in the store

        window.location.href = "/admin";
        //end();
        // here end is not called because when using href will unmount the componet (run cleanup code in useEffect)
        // before it's navigated out
      },
      onError: () => {
        end();
      },
    },
    {}
  );

  useEffect(() => {
    // add envs to session
    setClientenvsInSession(clientenvs);
  }, []);

  const onSubmit = async (event) => {
    event.preventDefault();
    start();
    await doRequest();
  };
  return (
    <div className="container pt-5">
      <h1 className="text-center mb-3">LeagueUp Admin</h1>

      <form onSubmit={onSubmit}>
        <div className="d-flex flex-column align-items-center">
          <div className="form-group my-2">
            {/* <label>Email</label> */}
            <input
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="text"
              className="form-control"
            />
          </div>
          <div className="form-group my-2">
            {/* <label>Password</label> */}
            <input
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              className="form-control"
            />
          </div>

          <button className="btn btn-secondary mt-3">Sign In</button>
        </div>
      </form>
    </div>
  );
}

export async function getServerSideProps(context) {
  // Fetch data from external API
  const envs = CLIENT_ENVIRONMENT;
  const axios = axiosClient(context.req);
  try {
    await userService.getUser(axios);
    return {
      redirect: {
        destination: "/admin",
        permanent: false,
      },
    };
  } catch (err) {
    // will do nothing because it'll create a loop
  }

  return {
    props: {
      clientenvs: envs,
    },
  };
}
