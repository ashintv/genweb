import { Editor } from "@monaco-editor/react";
import { FileBar } from "./filebar";
import { useState } from "react";
import type { FileItem } from "@/lib/types";

//TODO: learn and implement dynamic width adjustment.
export function CodeEditor({ files }: { files: FileItem[] }) {
    const [selectedFile, setSelectedFile] = useState<FileItem>(files[0]);
    return (
        <div className="flex h-full border border-gray-700 rounded-md p-5 pl-0 pt-0 bg-[#1f1f1f] shadow-2xl shadow-gray-900 hover:shadow-3xl transition-shadow duration-300 -translate-0.5 w-3xl">
           {<FileBar files={files} setSelectedFile={setSelectedFile} selectedFile={selectedFile} />}
            <Editor
                className="w-full h-full py-5"
                height="100%"
                width="100%"
                theme="vs-dark"
                path={selectedFile.name}
                defaultValue={selectedFile.content || ""}
            />
        </div>

    );
}