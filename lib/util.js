import env from "@beam-australia/react-env";
const ENVIRONMENT = {
  BaseApiURL: env(PUBLIC_BaseApiURL),
  BaseURL: env(BaseURL),
  PusherAPIKey: env(PusherApiKey),
  PusherAppId: process.env.PusherAppId,
  PusherSecret: process.env.PusherSecret,
  AdminPasscode: env(AdminPasscode),
};

const session = {
  get: (key) => sessionStorage.getItem(key),
  set: (key, value) => sessionStorage.setItem(key, value),
  delete: (key) => sessionStorage.removeItem(key),
  clear: () => sessionStorage.clear(),
};
export { ENVIRONMENT, session };
