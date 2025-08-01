import { ApiError, GoogleGenAI } from "@google/genai";
import { config } from "dotenv";
import express from "express";
import { BASE_PROMPT, getSystemPrompt } from "./prompt";
import { reactBasePrompt } from "./defaults/react";
import { expressBasePrompt } from "./defaults/express";
config();
import cors from "cors";
const app = express();
const ai = new GoogleGenAI({});
app.use(cors());
app.use(express.json());
app.post("/template", async (req, res) => {
    const prompt = req.body.prompt;
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-pro",
            config: {
                temperature: 0.1,
                systemInstruction:
                    "You are given problem statement and you have to tell which framework is best suited for the problem statement. You have to give the answer in one word. yoy have to choose from [react , express] ",
            },
            contents: prompt,
        });
        if (response.text === "react") {
            res.json({
                artifact: [
                    BASE_PROMPT,
                    `Here is an artifact that contains all files of the project visible to you.\nConsider the contents of ALL files in the project.\n\n${reactBasePrompt}\n\nHere is a list of files that exist on the file system but are not being shown to you:\n\n  - .gitignore\n  - package-lock.json\n`,
                ],
                prompt: req.body.prompt,
                stack: response.text,
            });
        } else if (response.text === "express") {
            res.json({
                artifact: [
                    BASE_PROMPT,
                    `Here is an artifact that contains all files of the project visible to you.\nConsider the contents of ALL files in the project.\n\n${expressBasePrompt}\n\nHere is a list of files that exist on the file system but are not being shown to you:\n\n  - .gitignore\n  - package-lock.json\n`,
                ],
                prompt: req.body.prompt,
                stack: response.text,
            });
        }
    } catch (error) {
        console.error("Error generating content:", error);
        res.status(500).json({
            error: "Failed to generate content",
        });
    }
});



app.post("/generate", async (req, res) => {
    res.setHeader("Content-Type", "text/plain");
    const body = req.body;
    try {
        const response = await ai.models.generateContentStream({
            model: "gemini-2.5-pro",
            config: {
                temperature: 0.8,
                systemInstruction: getSystemPrompt(),
            },
            contents: {
                parts: [
                    {
                        text: String(body.prompt),
                    },
                    {
                        text: String(body.artifact),
                    },
                ],
                role: "user",
            },
        });
        for await (const chunk of response) {
            if (chunk.text) {
                console.log("Received chunk:", chunk.text);
                res.write(chunk.text);
            }
        }
        res.end();
        console.log("Stream ended successfully.");

    } catch (error: ApiError | any) {
        console.error("Error generating content:", error.message || error);
        return res.status(500).json({
            error: "Failed to generate content",
            message: error.message || "An unexpected error occurred",
        });
    }
});



app.listen(3000, () => {
    console.log("Server is running on port 3000");
    // main()
});
