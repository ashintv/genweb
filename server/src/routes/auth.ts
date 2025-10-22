// user auth ( signup  and signin)

import express, { Router } from "express";
const AuthRouter: Router = express.Router();
import { email, z } from "zod";
import { JWT_SECRET, prisma } from "../config";
import jwt from "jsonwebtoken";
import { ca } from "zod/v4/locales";
const AuthSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6).max(100),
});

AuthRouter.post("/signup", async (req, res) => {
  const result = AuthSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({ errors: result.error });
  }
  try {
    const existingUser = await prisma.user.findUnique({
      where: { email: result.data.email },
    });
    if (existingUser) {
      return res.status(409).json({ msg: "User already exists" });
    }
    await prisma.user.create({
      data: {
        email: result.data.email,
        password: result.data.password,
      },
    });
    res.json({
      msg: "User signed up successfully",
    });
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).json({ msg: "Internal server error" });
  }
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
    email: user.email,
  });
});

export default AuthRouter;
