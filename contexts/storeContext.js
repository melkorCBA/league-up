import { useContext, useReducer, createContext, useState } from "react";

export const StoreContext = createContext(null);

export const ACTIONS = Object.freeze({
  LoginUser: "LoginUser",
  LogoutUser: "LogoutUser",
  SetLodingStatus: "SetLodingStatus",
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
