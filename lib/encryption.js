import { scrypt, randomBytes } from "crypto";
import { promisify } from "util";
import jwt from "jsonwebtoken";
import { ENVIRONMENT } from "./util";

const scryptAsync = promisify(scrypt);
const Passwords = {
  toHash: async (password) => {
    const sault = randomBytes(8).toString("hex");
    const buf = await scryptAsync(password, sault, 64);
    return `${buf.toString("hex")}.${sault}`;
  },
  compare: async (storedHash, password) => {
    const [hashPassword, sault] = storedHash.split(".");
    const buf = await scryptAsync(password, sault, 64);
    return buf.toString("hex") === hashPassword;
  },
};

const JWT = {
  sign: (payload, JWTKey = null) => {
    const token = jwt.sign(payload, JWTKey ?? ENVIRONMENT.JWTKey);
    return token;
  },
  signToSession: (payload, JWTKey = null) => {
    const token = jwt.sign(payload, JWTKey ?? ENVIRONMENT.JWTKey);
    const session = {
      jwt: token,
    };
    return session;
  },
  getUserPayload: (session) => {
    const payload = jwt.verify(session.jwt, ENVIRONMENT.JWTKey);
    return payload;
  },
};

export { Passwords, JWT };
