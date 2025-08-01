import { StepType } from './../lib/types';
import type { FileItem, Step } from "@/lib/types";
import { useEffect, useState } from "react";
export function useCodeEditor(steps: Step[] , setSteps: React.Dispatch<React.SetStateAction<Step[]>>) {
    const [files, setFiles] = useState<FileItem[]>([]);
    useEffect(() => {
        let originalFiles = [...files];
        let updateHappened = false;
        steps.filter(({ status }) => status === "pending").map(step => {
            updateHappened = true;
            if (step?.type === StepType.CreateFile) {
                let parsedPath = step.path?.split("/") ?? []; // ["src", "components", "App.tsx"]
                let currentFileStructure = [...originalFiles]; // {}
                let finalAnswerRef = currentFileStructure;
                let currentFolder = ""
                while (parsedPath.length) {
                    currentFolder = `${currentFolder}/${parsedPath[0]}`;
                    let currentFolderName = parsedPath[0];
                    parsedPath = parsedPath.slice(1);
                    if (!parsedPath.length) {
                        // final file
                        let file = currentFileStructure.find(x => x.path === currentFolder)
                        let language = 'javascript'; // default language
                        if (currentFolder.endsWith(".js")) {
                            language = 'javascript'
                        } else if (currentFolder.endsWith(".ts")) {
                            language = 'typescript'
                        } else if (currentFolder.endsWith(".jsx")) {
                            language = 'javascript'
                        } else if (currentFolder.endsWith(".tsx")) {
                            language = 'typescript'
                        }
                        if (!file) {
                            currentFileStructure.push({
                                name: currentFolderName,
                                type: 'file',
                                path: currentFolder,
                                content: step.code,
                                language: language
                            })
                        } else {
                            file.content = step.code;
                            console.log("File already exists, updating content:", file);

                        }
                    } else {
                        /// in a folder
                        let folder = currentFileStructure.find(x => x.path === currentFolder)
                        if (!folder) {
                            // create the folder
                            currentFileStructure.push({
                                name: currentFolderName,
                                type: 'folder',
                                path: currentFolder,
                                children: []
                            })
                        }

                        currentFileStructure = currentFileStructure.find(x => x.path === currentFolder)!.children!;
                    }
                }
                originalFiles = finalAnswerRef.slice().sort((a, b) => {
                    // Folders come first
                    if (a.type === 'folder' && b.type === 'file') return -1;
                    if (a.type === 'file' && b.type === 'folder') return 1;

                    // If same type, sort by name
                    return a.name.localeCompare(b.name);
                });
                // originalFiles = finalAnswerRef;
                if (updateHappened) {
                    setFiles(originalFiles)
                    setSteps(steps => steps.map((s: Step) => {
                        return {
                            ...s,
                            status: "completed"
                        }

                    }))
                }

            }

        })


    }, [steps, files]);


    return {files}

}
