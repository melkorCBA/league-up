import { useContext, useReducer, createContext, useState } from "react";

export const StoreContext = createContext(null);

export const ACTIONS = Object.freeze({
  LoginUser: "LoginUser",
  LogoutUser: "LogoutUser",
  SetLodingStatus: "SetLodingStatus",
  SetLeagueSelected: "SetLeagueSelected",
  OpenModal: "OpenModal",
  CloseModal: "CloseModal",
  SetModalLoadingStatus: "SetModalLoadingStatus",
  SetLeagues: "SetLeagues",
  SetModalData: "SetModalData",
  SetInView_League: "SetInView_League",
  SetInView_Match: "SetInView_Match",
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
    case ACTIONS.OpenModal: {
      const { identifier } = payload;
      return {
        ...state,
        modals: {
          ...state.modals,
          [identifier]: {
            ...state.modals[identifier],
            status: true,
            isLoading: false,
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
            isLoading: false,
          },
        },
      };
    }
    case ACTIONS.SetModalLoadingStatus: {
      const { identifier, isLoading } = payload;
      return {
        ...state,
        modals: {
          ...state.modals,
          [identifier]: {
            ...state.modals[identifier],
            isLoading,
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
    case ACTIONS.SetInView_League: {
      const { leagueInView } = payload;
      return {
        ...state,
        inView: {
          ...state.inView,
          leagueInView,
        },
      };
    }
    case ACTIONS.SetInView_Match: {
      const { matchInView } = payload;
      return {
        ...state,
        inView: {
          ...state.inView,
          matchInView,
        },
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
    // [identifier]: { [status], [data] , [isLoading]},
  },
  leagues: [],
  inView: {
    leagueInView: {},
    matchInView: {},
  },
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
