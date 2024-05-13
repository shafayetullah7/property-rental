import { Request, Response, NextFunction } from "express";

// eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
const apiNotFound = (req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({
    success: false,
    name: "NotFound",
    statusCode: 404,
    message: "API endpoint not found",
  });
};

export default apiNotFound;
