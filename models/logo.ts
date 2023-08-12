import { Schema, model, models } from "mongoose";

interface ILogo {
  logoURL?: string;
  isUsed?: boolean;
}

const LogoSchema = new Schema<ILogo>({
  logoURL: {
    type: String,
    default: "https://melkorwebjobstorage.blob.core.windows.net/web/logo0.png",
  },

  isUsed: {
    type: Boolean,
    default: false,
  },
});
export default models.Logo || model("Logo", LogoSchema);
