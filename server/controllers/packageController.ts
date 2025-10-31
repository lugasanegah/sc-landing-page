// src/controllers/package.controller.ts
import { Request, Response } from "express";
import { getAllPackages } from "../services/package.service";

export const getPackagesController = async (req: Request, res: Response) => {
  try {
    const packages = await getAllPackages();
    res.status(200).json({
      success: true,
      data: packages,
    });
  } catch (error) {
    console.error("Error fetching packages:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch packages",
    });
  }
};
