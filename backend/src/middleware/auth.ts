/**
 * middleware/auth.ts
 * --------------------
 * requireAuth: verifies the Bearer JWT and attaches the decoded payload
 * to req.user. requireAdmin: additionally checks role === "admin".
 * Both fail with a clean 401/403 JSON response rather than throwing.
 */

import { Request, Response, NextFunction } from "express";
import { verifyToken, JwtPayload } from "../services/authService";

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

export function requireAuth(req: Request, res: Response, next: NextFunction): void {
  const header = req.headers.authorization;
  if (!header || !header.startsWith("Bearer ")) {
    res.status(401).json({ success: false, error: "You must be logged in to do this." });
    return;
  }

  try {
    const token = header.slice("Bearer ".length);
    req.user = verifyToken(token);
    next();
  } catch {
    res.status(401).json({ success: false, error: "Your session has expired — please log in again." });
  }
}

export function requireAdmin(req: Request, res: Response, next: NextFunction): void {
  requireAuth(req, res, () => {
    if (req.user?.role !== "admin") {
      res.status(403).json({ success: false, error: "Admin access required." });
      return;
    }
    next();
  });
}
