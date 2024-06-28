import express from "express";
import landlordAccountRouter from "../modules/landlordModule/account/landlord.account.route";
import landlordPropertyRouter from "../modules/landlordModule/property/landlord.property.route";
import adminAccountRouter from "../modules/admin/account/admin.account.route";
import adminPropertiesRouter from "../modules/admin/properties/admin.properties.route";
import openPropertyRouter from "../modules/open/property/open.property.route";
import userAccountRouter from "../modules/userModule/account/user.account.route";
import userPropertyRouter from "../modules/userModule/property/user.property.route";

const router = express.Router();

// open
router.use("/open/properties", openPropertyRouter);

// admin
router.use("/admin/account", adminAccountRouter);
router.use("/admin/properties", adminPropertiesRouter);

// landlord
router.use("/landlord/properties", landlordPropertyRouter);
router.use("/landlord/account", landlordAccountRouter);

// user
router.use("/user/account", userAccountRouter);
router.use("/user/properties", userPropertyRouter);

export default router;
