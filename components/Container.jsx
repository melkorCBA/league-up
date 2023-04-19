import React, { useEffect } from "react";
import { ACTIONS, useStore } from "../contexts/storeContext";
import { userService } from "../services/api-service";

const useCurretUser = () => {
  const { dispatch } = useStore();
  const setCurretUser = async () => {
    try {
      const user = await userService.getUser();
      dispatch({ type: ACTIONS.LoginUser, payload: { currentUser: user } });
    } catch (err) {
      dispatch({ type: ACTIONS.LogoutUser, payload: { currentUser: {} } });
    }
  };
  useEffect(() => {
    setCurretUser();
  }, []);
};

const Container = (props) => {
  useCurretUser();
  return <div className="host-container">{props.children}</div>;
};

export default Container;
