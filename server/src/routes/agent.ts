// ai agent workflow

import express from "express";

import { getSystemPrompt } from "../lib/prompt";
import { reactBasePrompt } from "../lib/defaults/react";
import { ApiError } from "@google/genai";
import { ai, prisma } from "../config";
import { ca, tr } from "zod/v4/locales";
const AgentRouter = express.Router();

AgentRouter.post("/", async (req, res) => {
	res.setHeader("Content-Type", "text/plain");
	console.log("Received request to /generate with body:", req.body);
	const data = req.body.responseTemplate;
	//@ts-ignore
	const userId = req.userId;
	const prompt = await buildPrompt(data.prompt , userId);
	if (!data.prompt || !data.artifact) {
		return res.status(400).json({ error: "Invalid request body" });
	}
	const body = req.body;
	try {
		const response = await ai.models.generateContentStream({
			model: "gemini-2.5-pro",
			config: {
				temperature: 0.7,
				systemInstruction: getSystemPrompt(),
			},
			contents: {
				parts: [
					{
						text: String(prompt),
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


async function buildPrompt(prompt:string , userId:string){
	try{
	const user = await prisma.user.findUnique({
		where: { id: userId },
	});

	// FEATCH ALL REALATED DATA FROM PROFILE TABLE USING FOREIGN KEY RELATIONSHIP
	const profile = await prisma.profile.findUnique({
		where: { userId: userId },
		include: {
			projects: true,
			skills: true,
			achievements: true,
		},
	})
	console.log("Fetched profile data:", profile);
	//TODO: here profile should be converted to a clean string like json or yaml if needed
	return `For the given requirement and user ${userId}, create a beautiful portfolio website
		Things to consider:
		1. The website should showcase the user's projects, skills, and achievements.
		2. Use modern web development technologies and best practices.
		3. Ensure the website is responsive and works well on all devices.
		4. Include sections for About Me, Projects, Skills, Achievements, and Contact Information.
		5. Use a clean and professional design with appropriate color schemes and typography.
		6. Always consider and give priority to user requirements .
		user requirement: ${prompt}
		user data : ${JSON.stringify(profile)}
		`
}catch(error){
	console.error("Error building prompt:", error);
	return prompt; // Fallback to original prompt in case of error
}
}