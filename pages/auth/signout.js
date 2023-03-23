import { useEffect } from "react";

import Router from "next/router";
import { UseRequest, RequestMethods } from "../../hooks/useRequest";
import { ENVIRONMENT } from "../../lib/util";
import { ACTIONS, useStore } from "../../contexts/storeContext";

const SignOut = () => {
  const { dispatch } = useStore();
  const { doRequest } = UseRequest(
    {
      url: `${ENVIRONMENT().BaseApiURL}/auth/signout`,
      method: RequestMethods.POST,
      body: {},
      onSuccess: () => {
        dispatch({
          type: ACTIONS.LogoutUser,
          payload: { username: "" },
        });
        Router.push("/");
      },
    },
    {}
  );

  useEffect(() => {
    doRequest();
  }, []);
  return <div>Signing Out</div>;
};

export default SignOut;
