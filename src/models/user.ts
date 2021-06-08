import mongoose, { Schema, Document } from "mongoose";
import bcrypt from "bcryptjs";

const SALT_WORK_FACTOR = 10;

export interface IUser extends Document {
  email: string;
  firstName;
  string;
  lastName: string;
  password: string;
  validatePassword(password: string): boolean;
  _doc: any;
}

const userSchema: Schema<IUser> = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    products: [
      {
        type: Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
    password: { type: String, required: true },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
    this.password = await bcrypt.hash(this.password, salt);
    return next();
  } catch (err) {
    return next(err);
  }
});

userSchema.methods.validatePassword = async function (pass: string) {
  return bcrypt.compare(pass, this.password);
};

export const User = mongoose.model<IUser>("User", userSchema);
