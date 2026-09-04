/**
 * middleware/validate.ts
 * ------------------------
 * Small helper to validate `req.body` against a Zod schema before it
 * reaches a controller, returning a clean 400 error on bad input instead
 * of letting a controller crash on missing/malformed fields.
 */

import { Request, Response, NextFunction } from "express";
import { ZodSchema } from "zod";

export function validateBody(schema: ZodSchema) {
  return (req: Request, res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      res.status(400).json({
        success: false,
        error: "Invalid request data.",
        details: result.error.flatten().fieldErrors,
      });
      return;
    }
    req.body = result.data;
    next();
  };
}
