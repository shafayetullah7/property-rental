import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";
import { TuserRole } from "../constants";

export interface UserPayload {
  userId: string;
  email: string;
  role: TuserRole;
  verified: boolean;
}

export interface CustomJwtPayload extends JwtPayload {
  userId: string;
  email: string;
  role: TuserRole;
  verified: boolean;
}

const createJwtToken = (payload: UserPayload): string => {
  const secretKey = config.jwtSecret as string;
  // const options: jwt.SignOptions = {
  //   expiresIn: "7d",
  // };

  return jwt.sign(payload, secretKey);
};

export default createJwtToken;
