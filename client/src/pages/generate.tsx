import { ChatBox } from "@/components/chatbox";
import { CodeEditor } from "@/components/codeEditor";
import { useChatStream } from "@/hooks/useChatStream";
import { useCodeEditor } from "@/hooks/useCodeEditor";
import type { FileItem, Step } from "@/lib/types";
import { parseXml } from "@/utils/llm/parseLlm";
import { sample_response } from "@/utils/sample/samplefile";
// import { trialParseData } from "@/utils/sample/samplefile";
import axios from "axios";
import { useState } from "react";
export function GeneratePage() {
    const { data, steps, setSteps } = useChatStream()
    const { files } = useCodeEditor(steps, setSteps);
    return (
        <div className='fixed flex h-screen'>
            <div className='h-full px-5'>
                <h1 className='text-6xl font-bold  p-5'>Chat with Code Editor</h1>
                <ChatBox data={data} steps={steps} />
            </div>
            <div className='p-10 h-full w-full'>
                <CodeEditor files={files} />
            </div>
        </div>
    );
}