// src/controllers/AllRegistrationsController.ts

import { Request, Response } from "express";
import asyncHandler from "express-async-handler";

// Import your models
import BulkEventRegistration from "../models/bulk_registration";
import EventRegistration from "../models/whatsapp_registration";
import RegistrationModel from "../models/registration";

/**
 * Get all registrations from BulkEventRegistration, EventRegistration, and RegistrationModel
 * without any limit, search, or pagination.
 */
export const getAllRegistrations = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const [bulkRegistrations, eventRegistrations, whatsappRegistrations] =
        await Promise.all([
          BulkEventRegistration.find().exec(),
          EventRegistration.find().exec(),
          RegistrationModel.find().exec(),
        ]);

      // Option A: Return them as separate arrays in one response object
      res.status(200).json({
        success: true,
        data: {
          bulkRegistrations,
          eventRegistrations,
          whatsappRegistrations,
        },
      });

      // Option B: Combine everything into a single array (uncomment if you prefer a unified list)
      // const allRegistrations = [
      //   ...bulkRegistrations,
      //   ...eventRegistrations,
      //   ...whatsappRegistrations,
      // ];
      // return res.status(200).json({ success: true, data: allRegistrations });
    } catch (error : any) {
      console.error("Error fetching registrations:", error);
      res.status(500).json({
        success: false,
        message: "Server error",
        error: error.message || error,
      });
    }
  }
);
