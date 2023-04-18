import { useContext, useReducer, createContext, useState } from "react";

export const StoreContext = createContext(null);

export const ACTIONS = Object.freeze({
  LoginUser: "LoginUser",
  LogoutUser: "LogoutUser",
  SetLodingStatus: "SetLodingStatus",
  SetLeagueSelected: "SetLeagueSelected",
  SetLeagueInView: "SetLeagueInView",
  OpenModal: "OpenModal",
  CloseModal: "CloseModal",
  SetLeagues: "SetLeagues",
  SetModalData: "SetModalData",
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
        leagueInView: payload["leagueInView"],
      };
    }
    case ACTIONS.OpenModal: {
      const { identifier } = payload;
      return {
        ...state,
        modals: {
          ...state.modals,
          [identifier]: {
            ...state.modals[identifier],
            status: true,
          },
        },
      };
    }
    case ACTIONS.CloseModal: {
      const { identifier } = payload;
      return {
        ...state,
        modals: {
          ...state.modals,
          [identifier]: {
            ...state.modals[identifier],
            status: false,
          },
        },
      };
    }
    case ACTIONS.SetModalData: {
      const { identifier, data } = payload;

      return {
        ...state,
        modals: {
          ...state.modals,
          [identifier]: {
            ...state.modals[identifier],
            data,
          },
        },
      };
    }
    case ACTIONS.SetLeagues: {
      const { leagues } = payload;
      return {
        ...state,
        leagues,
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
  modals: {
    // [identifier]: { [status], [data]},
  },
  leagues: [],
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
