const isServerEnvironment = () => typeof window === "undefined";
const session = {
  get: (key) => sessionStorage.getItem(key),
  set: (key, value) => sessionStorage.setItem(key, value),
  delete: (key) => sessionStorage.removeItem(key),
  clear: () => sessionStorage.clear(),
};

const getEnvironmentVariable = (key) => {
  if (isServerEnvironment()) return process.env[key];
  return session.get(key);
};
const ENVIRONMENT = () => {
  return {
    BaseApiURL: getEnvironmentVariable("BaseApiURL"),
    BaseURL: getEnvironmentVariable("BaseURL"),
    PusherApiKey: getEnvironmentVariable("PusherApiKey"),
    PusherAppId: getEnvironmentVariable("PusherAppId"),
    PusherSecret: getEnvironmentVariable("PusherSecret"),
    JWTKey: process.env.JWTKey, // this is only (and should be) accessed in the server
    ImageBlobURL: getEnvironmentVariable("ImageBlobURL"),
  };
};

const CLIENT_ENVIRONMENT = {
  BaseApiURL: ENVIRONMENT().BaseApiURL,
  BaseURL: ENVIRONMENT().BaseURL,
  PusherApiKey: ENVIRONMENT().PusherApiKey,
  ImageBlobURL: ENVIRONMENT().ImageBlobURL,
};

const setClientenvsInSession = (clientEnvs) => {
  Object.keys(CLIENT_ENVIRONMENT).forEach((key) => {
    if (clientEnvs[key]) session.set(key, clientEnvs[key]);
  });
};

const getNetRunrate = (runsScored, oversFaced, runsConceded, oversBowled) => {
  if (oversFaced == 0 || oversBowled === 0) return 0;
  return runsScored / oversFaced - runsConceded / oversBowled;
};

const mathAction = (num1, num2, op) => {
  switch (op) {
    case "+":
      return num1 + num2;
    case "-":
      return num1 - num2;
    case "/":
      return num1 / num2;
    case "*":
      return num1 * num2;
    case "%":
      return num1 % num2;
    default:
      return 0;
  }
};

const datePipes = {
  ISOtoDate: (ISODate) => ISODate.split("T")[0],
  ISOtoDateTime: (ISODate) => {
    const dnt = ISODate.split("T");
    return [dnt[0], dnt[1].split("Z")[0]];
  },
  time24to12: (time) => {
    let h = +time.slice(0, 2);
    if (h === 24) {
      return `00${time.slice(2, 5)} am`;
    }
    let pFix = h >= 12 ? "pm" : "am";
    h = h > 12 ? 24 - h : h;
    return `${h}${time.slice(2, 5)} ${pFix}`;
  },
};

const getHashMap = (list, key) => {
  const hmap = {};
  list.forEach((item) => (hmap[item[key]] = item));
  return hmap;
};

const CONSTANTS = Object.freeze({
  VIEWS: Object.freeze({
    STANDINGS: "std",
    MATCH_VIEWS: Object.freeze({
      PRE_MATCH: "premat",
      ON_MATCH: "mat",
      POST_MATCH: "postmat",
    }),
  }),
});

const TOSS_STATUS = (() => {
  const status = Object.freeze({
    YET_TO_BE: "0",
    TEAM1_WON: "1",
    TEAM2_WON: "2",
  });
  const ALL_TO_ARRAY = Object.values(status);
  return { ...status, ALL_TO_ARRAY };
})();

const BATFIRST_STATUS = (() => {
  const status = Object.freeze({
    YET_TO_BE: "0",
    TEAM1_BAT1ST: "1",
    TEAM2_BAT1ST: "2",
  });
  const ALL_TO_ARRAY = Object.values(status);
  return { ...status, ALL_TO_ARRAY };
})();
const WIN_STATUS = (() => {
  const status = Object.freeze({
    YET_TO_BE: "-1",
    DRAW: "0",
    TEAM1_WON: "1",
    TEAM2_WON: "2",
  });
  const ALL_TO_ARRAY = Object.values(status);
  return { ...status, ALL_TO_ARRAY };
})();

const isNullEmpty = (v) => !v || v?.length < 1;

export {
  ENVIRONMENT,
  session,
  CLIENT_ENVIRONMENT,
  setClientenvsInSession,
  getNetRunrate,
  mathAction,
  datePipes,
  getHashMap,
  CONSTANTS,
  TOSS_STATUS,
  BATFIRST_STATUS,
  WIN_STATUS,
  isNullEmpty,
};
