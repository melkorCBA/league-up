const isServerEnvironment = () => typeof window === "undefined";
const session = {
  get: (key) => sessionStorage.getItem(key),
  set: (key, value) => sessionStorage.setItem(key, value),
  delete: (key) => sessionStorage.removeItem(key),
  clear: () => sessionStorage.clear(),
};
const ENVIRONMENT = (() => {
  const variableSet = {
    BaseApiURL: process.env.BaseApiURL,
    BaseURL: process.env.BaseURL,
    PusherApiKey: process.env.PusherApiKey,
    PusherAppId: process.env.PusherAppId,
    PusherSecret: process.env.PusherSecret,
    AdminPasscode: process.env.AdminPasscode,
  };

  if (isServerEnvironment()) {
    Object.keys(variableSet).forEach((key) => {
      variableSet[key] = process.env[key];
    });
    return variableSet;
  }

  Object.keys(variableSet).forEach((key) => {
    variableSet[key] = session.get(key);
  });
  return variableSet;
})();

const CLIENT_ENVIRONMENT = {
  BaseApiURL: ENVIRONMENT.BaseApiURL,
  BaseURL: ENVIRONMENT.BaseURL,
  PusherApiKey: ENVIRONMENT.PusherApiKey,
  AdminPasscode: ENVIRONMENT.AdminPasscode,
};

const setClientenvsInSession = (clientEnvs) => {
  Object.keys(CLIENT_ENVIRONMENT).forEach((key) => {
    if (clientEnvs[key]) session.set(key, clientEnvs[key]);
  });
};

export { ENVIRONMENT, session, CLIENT_ENVIRONMENT, setClientenvsInSession };
