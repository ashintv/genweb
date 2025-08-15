import { Editor } from "@monaco-editor/react";
import { FileBar } from "./filebar";
import { useState } from "react";
import type { FileItem } from "@/lib/types";

//TODO: learn and implement dynaic width adjust.
export function CodeEditor({ files }: { files: FileItem[] }) {
	if (!files || files.length === 0) {
		return (
			<div className="flex h-full items-center justify-center">
				<h1 className="text-white text-2xl">No files to display</h1>
			</div>
		);
	}
	const [selectedFile, setSelectedFile] = useState<FileItem>(files[0]);
	return (
		<>
			<div className="flex h-full border border-gray-700 rounded-md p-5 pl-0 pt-0 bg-[#1f1f1f] shadow-2xl shadow-gray-900 hover:shadow-3xl transition-shadow duration-300 -translate-0.5 w-3xl">
				<div className="flex-grow-0  h-full ">
					{
						<FileBar
							files={files}
							setSelectedFile={setSelectedFile}
							selectedFile={selectedFile}
						/>
					}
				</div>
				<div className="flex-grow h-full w-full">
					<Editor
						className="pt-5"
						theme="vs-dark"
						defaultLanguage={selectedFile.language}
						path={selectedFile.name}
						defaultValue={selectedFile.content || ""}
						options={{
							minimap: { enabled: false },
							fontSize: 12,
							scrollBeyondLastLine: false,
							wordWrap: "on",
							readOnly: true,
						}}
					/>
				</div>
			</div>
		</>
	);
}
