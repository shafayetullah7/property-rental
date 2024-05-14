import express from "express";
import landlordAccountRouter from "../modules/landlordModule/account/landlord.account.route";
import landlordPropertyRouter from "../modules/landlordModule/property/landlord.property.route";

const router = express.Router();

// landlord
router.use("/landlord", landlordAccountRouter);
router.use("/landlord/properties", landlordPropertyRouter);

export default router;
