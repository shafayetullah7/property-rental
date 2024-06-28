import { Request, Response, NextFunction } from "express";
import { AnyZodObject } from "zod";
import catchAsync from "./catchAsync";
import AppError from "../error/AppError";
import httpStatus from "http-status";

const validateRequest = (schema: AnyZodObject) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { body, query, params } = schema.parse({
      body: req.body || {},
      query: req.query || {},
      params: req.params || {},
    });

    console.log("Validated body:", req.body);
    console.log(body);
    console.log("Validated query:", query);
    console.log("Validated params:", params);

    const extraBodyFields =
      body && Object.keys(body).length ? getExtraFields(req.body, body) : [];
    const extraQueryFields =
      query && Object.keys(query).length
        ? getExtraFields(req.query, query)
        : [];
    const extraParamsFields =
      params && Object.keys(params).length
        ? getExtraFields(req.params, params)
        : [];

    if (
      extraBodyFields.length ||
      extraQueryFields.length ||
      extraParamsFields.length
    ) {
      const extraFieldsMessage = constructExtraFieldsMessage(
        extraBodyFields,
        extraQueryFields,
        extraParamsFields
      );
      throw new AppError(
        httpStatus.BAD_REQUEST,
        `Extra fields detected: ${extraFieldsMessage}`
      );
    }

    req.body = body || {};
    req.query = query || {};
    req.params = params || {};

    next();
  });
};

const getExtraFields = (
  requestData: { [key: string]: unknown },
  parsedData: { [key: string]: unknown }
): string[] => {
  return Object.keys(requestData).filter(
    (field) => !Object.keys(parsedData).includes(field)
  );
};

const constructExtraFieldsMessage = (
  extraBodyFields: string[],
  extraQueryFields: string[],
  extraParamsFields: string[]
): string => {
  const messages = [];
  if (extraBodyFields.length) {
    messages.push(`Body: ${extraBodyFields.join(", ")}.`);
  }
  if (extraQueryFields.length) {
    messages.push(`Query: ${extraQueryFields.join(", ")}.`);
  }
  if (extraParamsFields.length) {
    messages.push(`Params: ${extraParamsFields.join(", ")}.`);
  }
  return messages.join("; ");
};

export default validateRequest;
