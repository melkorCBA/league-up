const ENVIRONMENT = {
  BaseApiURL: process.env.NEXT_PUBLIC_BaseApiURL,
  BaseURL: process.env.NEXT_PUBLIC_BaseURL,
  PusherAPIKey: process.env.NEXT_PUBLIC_PusherApiKey,
  PusherAppId: process.env.PusherAppId,
  PusherSecret: process.env.PusherSecret,
  AdminPasscode: process.env.NEXT_PUBLIC_AdminPasscode,
};

const session = {
  get: (key) => sessionStorage.getItem(key),
  set: (key, value) => sessionStorage.setItem(key, value),
  delete: (key) => sessionStorage.removeItem(key),
  clear: () => sessionStorage.clear(),
};
export { ENVIRONMENT, session };
