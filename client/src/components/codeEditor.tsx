import { Editor } from "@monaco-editor/react";
import { FileBar } from "./filebar";
import { files } from "@/utils/sample/samplefile";
import {  useState } from "react";


export function CodeEditor() {

    const [fileName, setFileName] = useState<string>('script.js');
    const file = files[fileName];
    return ( 
        <div className="flex h-full border border-gray-700 rounded-md p-5 pl-0 pt-0 bg-[#1f1f1f] shadow-2xl shadow-gray-900 hover:shadow-3xl transition-shadow duration-300 -translate-0.5 w-3xl">
            <FileBar onFileSelect={setFileName} fileName={fileName} />
            <Editor
            className="w-full h-full p-5"
                height="100%"
                width="100%"
                theme="vs-dark"
                path={file.name}
                defaultLanguage={file.language} 
                defaultValue={file.value}
            />
        </div>

    );
}