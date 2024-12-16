import express from "express";
import { createRegistration } from "../controllers/registration";

export default (router: express.Router) => {
    router.post("/registration", createRegistration);
};