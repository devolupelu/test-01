import express from "express";
import { createEventRegistration } from "../controllers/bulk_registration";

export default (router: express.Router) => { 
    router.post("/assembly-registration", createEventRegistration);
}