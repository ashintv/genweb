// user auth ( signup  and signin)

import express, { Router } from "express";
const AuthRouter: Router = express.Router();
import { z } from "zod";
import { JWT_SECRET, prisma } from "../config";
import jwt from "jsonwebtoken";
const AuthSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6).max(100),
});

AuthRouter.post("/signup", async (req, res) => {
  const result = AuthSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({ errors: result.error });
  }
  res.json({
    msg: "User signed up successfully",
    });
});

AuthRouter.post("/signin", async (req, res) => {
    const result = AuthSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ errors: result.error });
    }
    const user = await prisma.user.findUnique({
        where: { email: result.data.email },
    });
    if (!user || user.password !== result.data.password) {
        return res.status(401).json({ msg: "Invalid credentials" });
    }
    const token = jwt.sign({ userId: user.id }, JWT_SECRET);
    res.json({
        msg: "User signed in successfully",
        token,
    });
});

export default AuthRouter;