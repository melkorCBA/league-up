import { useState, useEffect } from "react";
import Router from "next/router";
import { ACTIONS, useStore } from "../contexts/storeContext";

const useLoading = () => {
  const { store, dispatch } = useStore();
  const { loading } = store;
  const start = () => {
    dispatch({ type: ACTIONS.SetLodingStatus, payload: { loading: true } });
  };
  const end = () => {
    dispatch({ type: ACTIONS.SetLodingStatus, payload: { loading: false } });
  };
  useEffect(() => {
    // Used for page transition

    Router.events.on("routeChangeStart", start);
    Router.events.on("routeChangeComplete", end);
    Router.events.on("routeChangeError", end);
    return () => {
      Router.events.off("routeChangeStart", start);
      Router.events.off("routeChangeComplete", end);
      Router.events.off("routeChangeError", end);
    };
  }, []);

  return {
    loading,
    start,
    end,
  };
};

export default useLoading;
