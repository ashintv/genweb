import { usePromptStore } from "@/store/promptStore";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useShallow } from "zustand/shallow";


export function PromptPage() {
    const [prompt, setPromptInp] = useState<string>("Enter your prompt here");
    const setPrompt = usePromptStore(useShallow((state) => state.setPrompt));
    const navigate = useNavigate()
    async function handleSubmit() {
        console.log("Prompt submitted:", prompt);
        const response = await axios.post('http://localhost:3000/template', { prompt });
        setPrompt({
            artifact: response.data.artifact,
            userPrompt: response.data.prompt,
        })
        navigate('/generate');

    }

return (
    <div>
        <textarea className="w-full h-full p-4 bg-gray-100 border rounded-lg" placeholder="Type your prompt here..." value={prompt} onChange={(e) => setPromptInp(e.target.value)}></textarea>
        <div className="mt-4">
            <button onClick={handleSubmit} className="px-4 py-2 bg-blue-500 text-white rounded-lg">Submit</button>
        </div>
    </div>
);
}