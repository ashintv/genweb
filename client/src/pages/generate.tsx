import { ChatBox } from "@/components/chatbox";
import { CodeEditor } from "@/components/codeEditor";
import { parseXml } from "@/utils/llm/parseLlm";
import axios from "axios";
import { useEffect } from "react";
export function GeneratePage() {
    async function sendRequest() {
        const prompt = 'create a react app with a button that alerts says hello world';
        console.log("Sending request with prompt:", prompt);
        const responseTemplate = await axios.post('http://localhost:3000/template', { prompt });
        console.table("Response from server:", responseTemplate.data);
        const response = await axios.post("http://localhost:3000/generate", {
            prompt: responseTemplate.data
        });
        console.log("Response from generate endpoint:", response.data);
        // const steps = parseXml(response.data);
        // console.log("Parsed steps:", steps);
    }
    useEffect(() => {
        sendRequest();

    }, []);
    return (
        <div className='fixed flex h-screen'>
            <div className='h-full px-5'>
                <h1 className='text-6xl font-bold  p-5'>Chat with Code Editor</h1>
                <ChatBox />
            </div>
            <div className='p-10 '>
                <CodeEditor />
            </div>
        </div>
    );
}