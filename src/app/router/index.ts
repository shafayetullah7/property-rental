import express from "express";
import landlordAccountRouter from "../modules/landlordModule/account/landlord.account.route";

const router = express.Router();

// landlord
router.use("/landlord", landlordAccountRouter);

export default router;
