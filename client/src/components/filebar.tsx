import { Button } from "./ui/button";
interface FilebarProps {
    onFileSelect: React.Dispatch<React.SetStateAction<string>>,
    fileName: string
}
//TODO ; state managemernt for file selection
export const FileBar = ({ onFileSelect , fileName }: FilebarProps) => {
    
    return (
        <div className="flex flex-col   w-fit  bg-[#232323] ">
            <div>
                <h1 className="text-white text-xs font-bold p-2">EXPLORER</h1>
            </div>
            <FilebarButton fileName="script.js" onFileSelect={onFileSelect} isSelected={fileName === "script.js"} />
            <FilebarButton fileName="style.css" onFileSelect={onFileSelect} isSelected={fileName === "style.css"} />
            <FilebarButton fileName="index.html" onFileSelect={onFileSelect} isSelected={fileName === "index.html"} />
        </div>
    );
};

function FilebarButton({ fileName, onFileSelect , isSelected }: { fileName: string; onFileSelect: React.Dispatch<React.SetStateAction<string>> , isSelected: boolean}) {

    return (
        <Button onClick={() => onFileSelect(fileName)} className={`bg-transparent pr-8  m-0 min-w-20 hover:bg-[#1b1a1a] rounded-none h-6 text-white py-0 w-full text-[10px] flex justify-start ${isSelected ? 'bg-[#2d2d2d]' : ''}`}>
            {fileName} 
        </Button>
    );
}

