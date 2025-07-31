import { ChatBox } from "@/components/chatbox";
import { CodeEditor } from "@/components/codeEditor";
import type { Step } from "@/lib/types";
import { parseXml } from "@/utils/llm/parseLlm";
import { sampleFiles, trialParseData } from "@/utils/sample/samplefile";
import axios from "axios";

import { useEffect, useState } from "react";
export function GeneratePage() {
    const [ steps , setSteps ] = useState<Step[]>([])
    const [files, setFiles] = useState(sampleFiles);
    async function sendRequest() {
        const prompt = 'create a react app with a button that alerts says hello world';
        console.log("Sending request with prompt:", prompt);
        const responseTemplate = await axios.post('http://localhost:3000/template', { prompt });
        console.table("Response from server:", responseTemplate.data);
        const response = await axios.post("http://localhost:3000/generate", {
            prompt: responseTemplate.data
        });
        return String(response.data.response);
    }
    useEffect(() => {
        // sendRequest().then((response) => {
        //     const steps = parseXml(response);
        //     console.log("Parsed steps:", steps);
        // });
        setSteps(parseXml(trialParseData))
    }, []);
    return (
        <div className='fixed flex h-screen'>
            <div className='h-full px-5'>
                <h1 className='text-6xl font-bold  p-5'>Chat with Code Editor</h1>
                <ChatBox steps={steps} />
            </div>
            <div className='p-10 '>
                <CodeEditor files={files} />
            </div>
        </div>
    );
}