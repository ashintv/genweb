import { create } from "zustand";

export interface Prompt {
    artifact: string;
    userPrompt: string;
}

interface PromptState {
    prompt: Prompt;
    setPrompt: (prompt: Prompt) => void;
}

export const usePromptStore = create<PromptState>((set) => ({
    prompt: {
        artifact: '',
        userPrompt: '',
    },
    setPrompt: (value: Prompt) => set({ prompt: value }),
}));
