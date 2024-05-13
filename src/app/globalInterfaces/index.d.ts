import { CustomJwtPayload } from "../utils/jwt";


declare global {
  namespace Express {
    interface Request {
      decoded: CustomJwtPayload;
    }
  }
}
