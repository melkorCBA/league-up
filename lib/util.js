import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();
const ENVIRONMENT = {
  BaseApiURL: publicRuntimeConfig.BRW_BaseApiURL,
  BaseURL: publicRuntimeConfig.BRW_BaseURL,
  PusherAPIKey: publicRuntimeConfig.BRW_BaseURL,
  PusherAppId: process.env.PusherAppId,
  PusherSecret: process.env.PusherSecret,
  AdminPasscode: publicRuntimeConfig.BRW_BaseURL,
};

const session = {
  get: (key) => sessionStorage.getItem(key),
  set: (key, value) => sessionStorage.setItem(key, value),
  delete: (key) => sessionStorage.removeItem(key),
  clear: () => sessionStorage.clear(),
};
export { ENVIRONMENT, session };
