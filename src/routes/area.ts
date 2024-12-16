import express from "express";
import { saveArea } from "../controllers/area";

export default (router: express.Router) => {
    router.post("/areas", saveArea);
};