import * as bcrypt from "bcrypt";

interface HashOptions {
  saltRounds: number;
}

export const hashPassword = async (
  password: string,
  options?: HashOptions
): Promise<string> => {
  const saltRounds = options?.saltRounds ?? 10;

  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  } catch (error) {
    throw new Error("Failed to hash password.");
  }
};

export const comparePassword = async (
  plainTextPassword: string,
  hashedPassword: string
): Promise<boolean> => {
  try {
    const isMatch = await bcrypt.compare(plainTextPassword, hashedPassword);
    return isMatch;
  } catch (error) {
    throw new Error("Failed to compare password.");
  }
};
