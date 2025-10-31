// src/services/package.service.ts
import { PackageModel, IPackage } from "../models/Package";

export const getAllPackages = async (): Promise<IPackage[]> => {
  return await PackageModel.find({ status: 1 });
};
