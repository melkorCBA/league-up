import React, { useEffect, useState } from "react";
import { UseRequest, RequestMethods } from "../../hooks/useRequest";
import Router from "next/router";
import {
  setClientenvsInSession,
  ENVIRONMENT,
  CLIENT_ENVIRONMENT,
} from "../../lib/util";
import { ACTIONS, useStore } from "../../contexts/storeContext";
import useLoading from "../../hooks/useLoading";
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
        end();
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
      <h1 className="text-center mb-3">Standing Admin</h1>

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

          <button className="btn btn-warning mt-3">Sign In</button>
        </div>
      </form>
    </div>
  );
}

export async function getServerSideProps() {
  // Fetch data from external API
  const envs = CLIENT_ENVIRONMENT;

  return {
    props: {
      clientenvs: envs,
    },
  };
}
