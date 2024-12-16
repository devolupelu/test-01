import express from "express";
import { whatsapp_register } from "../controllers/whatsapp_registration";

export default (router: express.Router) => {
    router.post("/whatsapp_registration", whatsapp_register);
};
