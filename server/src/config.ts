import { GoogleGenAI } from "@google/genai";
import { PrismaClient } from "@prisma/client";

export const ai = new GoogleGenAI({});
export const PORT = process.env.PORT || 4000;
export const prisma = new PrismaClient();
export const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_key";