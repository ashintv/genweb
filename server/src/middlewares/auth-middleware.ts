// authentication middleware

import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers["Authentication"];
  if (!token) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }
  const validate = jwt.verify(token as string, process.env.JWT_SECRET as string);
  if (!validate) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }
  next();
};
