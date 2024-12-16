// src/controllers/areaController.ts
import { Request, Response } from "express";
import Area from "../models/area";

// Save a new area
export const saveArea = async (req: Request, res: Response): Promise<void> => {
  const { id, name } = req.body;

  // Check if area already exists by ID to avoid duplicates
  try {
    const existingArea = await Area.findOne({ id });
    if (existingArea) {
      res.status(400).json({
        success: false,
        message: "Area with this ID already exists.",
      });
      return;
    }

    const newArea = new Area({ id, name });
    await newArea.save();
    res.status(201).json({
      success: true,
      message: "Area saved successfully",
      data: newArea,
    });
  } catch (error) {
    console.error("Error saving area:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error,
    });
  }
};
