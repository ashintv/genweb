import type { FileItem } from "@/lib/types";
import { Button } from "./ui/button";
import { DirectoryIcon } from "./icons/directory";
import { useState } from "react";
import { LanguageIcon } from "./icons/codeEditor";

interface FilebarProps {
    setSelectedFile: React.Dispatch<React.SetStateAction<FileItem>>;
    selectedFile: FileItem;
    files: FileItem[];
}

export const FileBar = ({
    setSelectedFile,
    selectedFile,
    files,
}: FilebarProps) => {
    return (
        <div className="flex  flex-col w-fit bg-[#232323]">
            <div>
                <h1 className="text-white text-xs font-bold p-2">EXPLORER</h1>
            </div>
            {files.map((file) => (
                <FilebarItem
                    key={file.path}
                    file={file}
                    onFileSelect={setSelectedFile}
                    selectedFile={selectedFile}
                />
            ))}
        </div>
    );
};

function FilebarItem({
    file,
    onFileSelect,
    selectedFile,
}: {
    file: FileItem;
    onFileSelect: React.Dispatch<React.SetStateAction<FileItem>>;
    selectedFile: FileItem;
}) {
    const isSelected = selectedFile.path === file.path;
    const [isFolderOpen, setIsFolderOpen] = useState(false);
    return (
        <div className="ml-2">
            {file.type === "file" && (

                <Button
                    onClick={() => onFileSelect(file)}
                    className={`bg-transparent pr-8 m-0 min-w-20 hover:bg-[#1b1a1a] rounded-none h-6 text-white py-0 w-full text-[10px] flex justify-start ${isSelected ? "bg-[#2d2d2d]" : ""
                        }`}
                >
                    
                    <LanguageIcon iconName={file.path.split(".").pop()!} />
                    {file.name}
                </Button>
            )}

            {file.type === "folder" && (
                <div className={`pl-2 `}>
                    <div className="text-white text-[10px] font-bold hover:bg-[#1b1a1a]  flex gap-1 items-center" onClick={() => setIsFolderOpen(!isFolderOpen)}><DirectoryIcon className={`${isFolderOpen ? "rotate-90" : ""}`} /> {file.name}</div>
                    {isFolderOpen && file.children?.map((child) => (
                        <div className="border-l border-gray-600" key={child.path}>

                            <FilebarItem
                                key={child.path}
                                file={child}
                                onFileSelect={onFileSelect}
                                selectedFile={selectedFile}
                            />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}