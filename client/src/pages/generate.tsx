import { ChatBox } from "@/components/chatbox";
import { CodeEditor } from "@/components/codeEditor";
import { useChatStream } from "@/hooks/useChatStream";
import { useCodeEditor } from "@/hooks/useCodeEditor";
import type { FileItem, Step } from "@/lib/types";
import { parseXml } from "@/utils/llm/parseLlm";
// import { trialParseData } from "@/utils/sample/samplefile";
import axios from "axios";

import { useEffect, useState } from "react";
export function GeneratePage() {
    const [steps, setSteps] = useState<Step[]>([])
    const [files, setFiles] = useState<FileItem[]>([]);
    
    const { data } = useChatStream(setSteps)

    //     console.table("Response from server:", responseTemplate.data);

    //     const response = await axios.post("http://localhost:3000/generate", {
    //         prompt: responseTemplate.data
    //     });
    //     return String(response.data.response);

    // }
    useCodeEditor(files, steps, setFiles, setSteps);
   
    // useEffect(() => {
        
    //     // sendRequest().then((response) => {
    //     //     const steps = parseXml(response);
    //     //     console.log("Parsed steps:", steps);
    //     //     setSteps(s => [...s, ...steps]);
    //     // });
    //     setSteps(parseXml(trialParseData))
    // }, []);
    return (
        <div className='fixed flex h-screen'>
            <div className='h-full px-5'>
                <h1 className='text-6xl font-bold  p-5'>Chat with Code Editor</h1>
                <ChatBox data={data} steps={steps} />
            </div>
            <div className='p-10 h-full w-full'>
                <CodeEditor  files={files} />
            </div>
        </div>
    );
}