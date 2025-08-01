import type { Step } from "@/lib/types";
import { parseXml } from "@/utils/llm/parseLlm";
import axios from "axios";
import { useEffect, useState } from "react";

export function useChatStream(setSteps: React.Dispatch<React.SetStateAction<Step[]>>) {
    const [data, setData] = useState('');
    const [responseTemplate, setResponseTemplate] = useState<any>(null);


    // INIT REQUEST RETURN INITIAL STEP AND ARTIFACT
    async function initSendRequest() {
        const prompt = 'create a react app with a button that alerts says hello world';
        console.log("Sending request with prompt:", prompt);
        const response = await axios.post('http://localhost:3000/template', { prompt });
        setResponseTemplate(response.data);
        setSteps(parseXml(response.data.artifact[1]));
    }

    // FETCH DATA FROM SERVER and Stream it
    async function fetchData(responseTemplate: string) {
        const response = await fetch('http://localhost:3000/generate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ responseTemplate }),
        });

        if (!response.body) {
            console.error('ReadableStream not supported!');
            return;
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder();

        while (true) {
            const { done, value } = await reader.read();
            if (done) {
                console.log('Stream ended.');
                break;
            }
            const chunk = decoder.decode(value);
            console.log(`Received chunk: ${chunk}`);
            setData((prev) => prev + chunk);
        }
    }

    useEffect(() => {
        if (!responseTemplate) return;
        fetchData(responseTemplate);
        console.log('StreamTest mounted');
    }, [responseTemplate])


    useEffect(() => {
        initSendRequest();
    }, []);

    useEffect(() => {
        if (data) {
            const steps = parseXml(data);
            console.log("Parsed steps:", steps);
            setSteps(s => [...s, ...steps]);
        }
    }, [data, setSteps]);

    return {
        data
    }
}