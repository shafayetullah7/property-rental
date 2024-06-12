import express, { Application, Request, Response } from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import apiNotFound from "./app/middlewares/apiNotFound";
import router from "./app/router";
import adminAccountRouter from "./app/modules/admin/account/admin.account.route";
import adminPropertiesRouter from "./app/modules/admin/properties/admin.properties.route";
import landlordPropertyRouter from "./app/modules/landlordModule/property/landlord.property.route";
import landlordAccountRouter from "./app/modules/landlordModule/account/landlord.account.route";

const app: Application = express();

app.use(express.json());
app.use(cors());
app.use(morgan("combined"));
app.use(helmet());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

// app.use("/api/v1", router);

// admin
app.use("/api/v1/admin/account/", adminAccountRouter);
app.use("/api/v1/admin/properties/", adminPropertiesRouter);

// landlord
app.use("/api/v1/landlord/", landlordAccountRouter);
app.use("/api/v1/landlord/properties/", landlordPropertyRouter);

// Handle errors
// eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
app.use(globalErrorHandler);
app.use(apiNotFound);

export default app;
