// src/routes/registrationRoutes.ts

import express from "express";
import { getAllRegistrations } from "../controllers/admin_two";

/**
 * Registration Routes
 *
 * @param router - Express Router instance
 */
const registrationRoutes = (router: express.Router) => {
  router.get("/all-registrations", getAllRegistrations);
};

export default registrationRoutes;
