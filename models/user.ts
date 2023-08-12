import { Schema, Types, models, model } from "mongoose";
import { Passwords } from "../lib/encryption";
import { findLeagueById, hasLeagueAccess } from "./user.extend";

interface IUser {
  email: string;
  password: string;
  leagues?: Types.ObjectId[];
  leagueInView?: Types.ObjectId;
  isActive?: boolean;
}

/* PetSchema will correspond to a collection in your MongoDB database. */
const UserSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    leagues: [
      {
        type: Schema.Types.ObjectId,
        ref: "League",
      },
    ],

    leagueInView: {
      type: Schema.Types.ObjectId,
      ref: "League",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        delete ret.password;
        delete ret.__v;
      },
    },
  }
);

UserSchema.pre("save", async function (done) {
  if (this.isModified("password")) {
    const hashed = await Passwords.toHash(this.get("password"));
    this.set("password", hashed);
  }
  done();
});
UserSchema.method("findLeagueById", findLeagueById);
UserSchema.method("hasLeagueAccess", hasLeagueAccess);
export default models.User || model<IUser>("User", UserSchema);
