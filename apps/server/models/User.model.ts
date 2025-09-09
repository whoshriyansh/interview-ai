import { Document, model, Schema, Types } from "mongoose";

export interface IUser extends Document {
  _id: Types.ObjectId;
  username: string;
  email: string;
  password: string;
  isFromGoogle: boolean;
  googleId?: string;
  avatar?: string;
}

const UserSchema = new Schema<IUser>({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  isFromGoogle: { type: Boolean, default: false },
  googleId: { type: String, index: true },
  avatar: { type: String },
});

export const UserModel = model<IUser>("User", UserSchema);
