import mongoose, { Document, Schema } from 'mongoose';

export interface IPackage extends Document {
  slug: string;
  name: string;
  description: string;
  term: string;
  price: number;
  freq: string;
  freq_interval: number;
  cycles: number;
  status?: number;
  feature: string[];
  featureText: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

export const PackageModel = mongoose.model<IPackage>(
  "Package",
  new Schema({
    slug: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    term: { type: String, required: true },
    price: { type: Number, required: true },
    freq: { type: String, required: true },
    freq_interval: { type: Number, required: true },
    cycles: { type: Number, required: true },
    status: { type: Number },
    feature: [{ type: String }],
    featureText: [{ type: String }]
  },
  {
    timestamps: true
  }),
  "package"
);