import mongoose, { Schema, Document } from "mongoose";

export interface ICategory extends Document {
  name: string;
}

export interface IProduct extends Document {
  category: string;
  name: string;
  price: number;
  description: string;
  user: string;
  _doc: any;
}

const categorySchema: Schema<ICategory> = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

const productSchema: Schema<IProduct> = new Schema(
  {
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    name: {
      type: String,
      required: true,
      unique: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const Category = mongoose.model<ICategory>("Category", categorySchema);
export const Product = mongoose.model<IProduct>("Product", productSchema);
