// ai agent workflow

import express from "express";

import { getSystemPrompt } from "../lib/prompt";
import { reactBasePrompt } from "../lib/defaults/react";
import { expressBasePrompt } from "../lib/defaults/express";
import { ApiError } from "@google/genai";
import { ai } from "../config";
const AgentRouter = express.Router();

AgentRouter.post("/", async (req, res) => {
	res.setHeader("Content-Type", "text/plain");
	console.log("Received request to /generate with body:", req.body);
	const data = req.body.responseTemplate;
	if (!data.prompt || !data.artifact) {
		return res.status(400).json({ error: "Invalid request body" });
	}
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
						text: String(data.prompt),
					},
					{
						text: String(data.artifact),
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



export default AgentRouter;
