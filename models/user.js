import mongoose from "mongoose";
import { Password } from "../lib/util";

/* PetSchema will correspond to a collection in your MongoDB database. */
const UserSchema = new mongoose.Schema(
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
        type: mongoose.Types.ObjectId,
        ref: "League",
      },
    ],
    defaultLeague: {
      type: mongoose.Types.ObjectId,
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
    const hashed = await Password.toHash(this.get("password"));
    this.set("password", hashed);
  }
  done();
});

export default mongoose.models.User || mongoose.model("User", UserSchema);
