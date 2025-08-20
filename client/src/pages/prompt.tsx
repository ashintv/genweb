
import { Textarea } from "@/components/ui/textarea";
import { usePromptStore } from "@/store/promptStore";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useShallow } from "zustand/shallow";
import { SendIcon } from "@/components/icons/send";
import GlassNavbar from "@/components/glass-navbar";
export function PromptPage() {
	const [prompt, setPromptInp] = useState<string>("");
	const setPrompt = usePromptStore(useShallow((state) => state.setPrompt));
	const navigate = useNavigate();
	const ref = useRef<HTMLDivElement>(null);

	function handleSubmit() {
		if (!prompt.trim()) {
			ref.current?.focus();
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
		<div className="w-screen h-screen backdrop-blur-md fixed flex flex-col justify-center items-center ">
			<GlassNavbar />
			<div className="flex flex-col gap-15">
				<div className="text-center">
					<div className="text-5xl  font-extrabold font-sans">
						Make it yours, make it matter.
					</div>
					<div className="text-xl font-medium  font-stretch-150%">
						Because your presence should be unforgettable.
					</div>
				</div>
				<div className=" bg-primary p-4  w-3xl rounded-4xl border focus:border-chart-3" ref={ref} tabIndex={-1}>
					<div className="max-h-96 overflow-y-auto">
						<Textarea
							value={prompt}
							onChange={(e) => setPromptInp(e.target.value)}
							placeholder="Enter your prompt here"
							className="border-none focus:outline-none text-foreground resize-none overflow-scroll"
						/>
					</div>
					<div className="flex justify-end bg-transparent py-2">
						<div
							onClick={handleSubmit}
							className="text-foreground border-none bg-transparent">
							<SendIcon />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
