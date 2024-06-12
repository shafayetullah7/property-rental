import express from "express";
import landlordAccountRouter from "../modules/landlordModule/account/landlord.account.route";
import landlordPropertyRouter from "../modules/landlordModule/property/landlord.property.route";
import adminAccountRouter from "../modules/admin/account/admin.account.route";
import adminPropertiesRouter from "../modules/admin/properties/admin.properties.route";

const router = express.Router();

// admin
router.use("/admin/account", adminAccountRouter);
router.use("/admin/properties", adminPropertiesRouter);

// landlord
router.use("/landlord/properties", landlordPropertyRouter);
router.use("/landlord/account", landlordAccountRouter);


export default router;
