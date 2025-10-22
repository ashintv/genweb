import express from "express";
import { BASE_PROMPT } from "../lib/prompt";
import { expressBasePrompt } from "../lib/defaults/express";
import { reactBasePrompt } from "../lib/defaults/react";
import { ai } from "../config";
const TemplateRouter = express.Router();
//can skip for now
TemplateRouter.post("/", async (req, res) => {
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

export default TemplateRouter;
