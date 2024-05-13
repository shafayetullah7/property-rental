import express, { Application, Request, Response } from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import apiNotFound from "./app/middlewares/apiNotFound";
import router from "./app/router";

const app: Application = express();

app.use(express.json());
app.use(cors());
app.use(morgan("combined"));
app.use(helmet());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.use("/api/v1", router);

// Handle errors
// eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
app.use(globalErrorHandler);
app.use(apiNotFound);

export default app;
