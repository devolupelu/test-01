import express from "express";
import { verifyRegistration } from "../controllers/payment";

export default (router: express.Router) => {
    router.post("/verify-registration-payment", verifyRegistration);
};
