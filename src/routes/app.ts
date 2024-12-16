import express from "express";
import payment from "./payment";
import area from "./area";
import registration from "./registration";
import bulk_registration from "./bulk_registration";
import whatsapp from "./whatsapp";
import admin from "./admin"

const router = express.Router();
export default (): express.Router => {
  payment(router);
  area(router);
  registration(router);
  bulk_registration(router);
  admin(router);
  //whatsapp(router);
  return router;
};
