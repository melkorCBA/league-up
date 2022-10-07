const ENVIRONMENT = {
  BaseApiURL: get("BaseApiURL") ?? process.env.BaseApiURL,
  BaseURL: get("BaseURL") ?? process.env.BaseURL,
  PusherAPIKey: get("PusherAPIKey") ?? process.env.PusherAPIKey,
  PusherAppId: process.env.PusherAppId,
  PusherSecret: process.env.PusherSecret,
  AdminPasscode: get("AdminPasscode") ?? process.env.AdminPasscode,
};

const CLIENT_ENVIRONMENT = {
  BaseApiURL: process.env.BaseApiURL,
  BaseURL: process.env.BaseURL,
  PusherAPIKey: process.env.PusherAPIKey,
  AdminPasscode: process.env.AdminPasscode,
};

const session = {
  get: (key) => sessionStorage.getItem(key),
  set: (key, value) => sessionStorage.setItem(key, value),
  delete: (key) => sessionStorage.removeItem(key),
  clear: () => sessionStorage.clear(),
};

const setClientenvsInSession = (clientEnvs) => {
  Object.keys(CLIENT_ENVIRONMENT).forEach((key) => {
    if (clientEnvs[key]) session.set(key, clientEnvs[key]);
  });
};
export { ENVIRONMENT, session, CLIENT_ENVIRONMENT, setClientenvsInSession };
