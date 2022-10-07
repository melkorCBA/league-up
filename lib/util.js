import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();
const ENVIRONMENT = {
  BaseApiURL: publicRuntimeConfig.PUBLIC_BaseApiURL,
  BaseURL: publicRuntimeConfig.PUBLIC_BaseURL,
  PusherAPIKey: publicRuntimeConfig.PUBLIC_BaseURL,
  PusherAppId: process.env.PusherAppId,
  PusherSecret: process.env.PusherSecret,
  AdminPasscode: publicRuntimeConfig.PUBLIC_BaseURL,
};

const session = {
  get: (key) => sessionStorage.getItem(key),
  set: (key, value) => sessionStorage.setItem(key, value),
  delete: (key) => sessionStorage.removeItem(key),
  clear: () => sessionStorage.clear(),
};
export { ENVIRONMENT, session };
