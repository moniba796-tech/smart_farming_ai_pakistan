/**
 * middleware/errorHandler.ts
 * ----------------------------
 * Centralized async-route wrapper + error handler so no controller ever
 * needs a try/catch just to avoid crashing the process, and every error
 * response has a consistent JSON shape.
 */

import { Request, Response, NextFunction, RequestHandler } from "express";

/** Wraps an async route handler so thrown errors reach the error middleware. */
export function asyncHandler(fn: RequestHandler): RequestHandler {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}

export class ApiError extends Error {
  statusCode: number;
  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
  }
}

export function notFoundHandler(req: Request, res: Response): void {
  res.status(404).json({ success: false, error: `Route not found: ${req.method} ${req.originalUrl}` });
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function errorHandler(err: any, req: Request, res: Response, next: NextFunction): void {
  const statusCode = err instanceof ApiError ? err.statusCode : 500;
  const message = err?.message || "Internal server error";

  if (statusCode >= 500) {
    // eslint-disable-next-line no-console
    console.error("[error]", err);
  }

  res.status(statusCode).json({ success: false, error: message });
}
