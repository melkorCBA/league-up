import { useEffect } from "react";

import Router from "next/router";
import { UseRequest, RequestMethods } from "../../hooks/useRequest";
import { ENVIRONMENT } from "../../lib/util";

const SignOut = () => {
  const { doRequest } = UseRequest(
    {
      url: `${ENVIRONMENT.BaseApiURL}/auth/signout`,
      method: RequestMethods.POST,
      body: {},
      onSuccess: () => Router.push("/"),
    },
    {}
  );

  useEffect(() => {
    doRequest();
  }, []);
  return <div>Signing Out</div>;
};

export default SignOut;
