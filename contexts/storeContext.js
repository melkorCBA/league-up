import { useContext, useReducer, createContext, useState } from "react";

export const StoreContext = createContext(null);

export const ACTIONS = Object.freeze({
  LoginUser: "LoginUser",
  LogoutUser: "LogoutUser",
  SetLodingStatus: "SetLodingStatus",
  SetLeagueSelected: "SetLeagueSelected",
  SetLeagueInView: "SetLeagueInView",
});

const reducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case ACTIONS.LoginUser: {
      return {
        ...state,
        ...payload,
        isLogin: true,
      };
    }
    case ACTIONS.LogoutUser: {
      return {
        ...state,
        ...payload,
        isLogin: false,
      };
    }
    case ACTIONS.SetLodingStatus: {
      return {
        ...state,
        loading: payload["loading"],
      };
    }
    case ACTIONS.SetLeagueSelected: {
      return {
        ...state,
        leagueSelected: payload["leagueSelected"],
      };
    }
    case ACTIONS.SetLeagueInView: {
      return {
        ...state,
        leagueSelected: payload["SetLeagueInView"],
      };
    }
    default:
      return {
        ...state,
      };
  }
};

const initialStore = {
  isLogin: false,
  currentUser: {},
  loading: false,
  leagueSelected: {},
  leagueInView: {},
};

export const StoreProvider = (props) => {
  const [store, dispatch] = useReducer(reducer, initialStore);
  return (
    <StoreContext.Provider value={{ store, dispatch }}>
      {props.children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  return context;
};
