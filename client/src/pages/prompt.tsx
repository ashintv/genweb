import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { usePromptStore } from "@/store/promptStore";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useShallow } from "zustand/shallow";

export function PromptPage() {
	const [prompt, setPromptInp] = useState<string>("");
	const setPrompt = usePromptStore(useShallow((state) => state.setPrompt));
	const navigate = useNavigate();
	function handleSubmit() {
		if (prompt.trim() === "") {
			alert("Prompt cannot be empty");
			return;
		}
		setPrompt({
			artifact: "",
			userPrompt: prompt,
		});
		console.log("Prompt submitted:", prompt);
		navigate("/generate");
	}

	return (
		<>
			<div className="fixed w-screen h-screen flex items-center justify-center bg-black ">
				<div className="bg-chart-3 h-1/2 w-1/2 absolute bottom-0 rounded-t-full border-2 border-white blur-3xl" />
				<div className="bg-chart-4 h-1/2 w-1/2 absolute top-0 right-0 rounded-b-full border-2 border-white blur-3xl" />
				<div className="bg-chart-1 h-1/3 w-1/3 absolute top-0 left-0 rounded-b-full border-2 border-white blur-3xl" />
			</div>
			<div>
				<div className="w-screen h-screen backdrop-blur-md fixed flex justify-center items-center">
					<div className="relative bg-primary p-4 h-46 w-3xl rounded-4xl">
						<Textarea
							value={prompt}
							onChange={(e) => setPromptInp(e.target.value)}
							placeholder="Enter your prompt here"
							className="border-none focus:outline-none text-background resize-none"
						/>
                        <Button className="absolute bottom-5 right-5" variant={'secondary'} onClick={handleSubmit}>Generate</Button>
					</div>
				</div>
			</div>
		</>
	);
}
