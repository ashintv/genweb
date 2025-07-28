import { GoogleGenAI } from "@google/genai";
import { config } from "dotenv";
config();

const ai = new GoogleGenAI({});


async function main() {
    const response = await ai.models.generateContentStream({
        model: "gemini-2.5-pro",
        contents: "create a todo app in react",
    });
    for await (const chunk of response) {
        console.log(chunk.text);
    }
}

main();