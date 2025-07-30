import { Button } from "./ui/button";
interface FilebarProps {
    onFileSelect:React.Dispatch<React.SetStateAction<string>>
}

export const FileBar = ({ onFileSelect }: FilebarProps) => {
  return (
    <div className="flex flex-col  w-fit  border-r bg-[#1f1f1f]  ">
      <FilebarButton fileName="script.js" onFileSelect={onFileSelect} />
      <FilebarButton fileName="style.css" onFileSelect={onFileSelect} />
      <FilebarButton fileName="index.html" onFileSelect={onFileSelect} />
    </div>
  );
};

function FilebarButton({ fileName, onFileSelect }: { fileName: string; onFileSelect: React.Dispatch<React.SetStateAction<string>> }) {
    return (
        <Button  onClick={() => onFileSelect(fileName)}  className="bg-transparent m-0 min-w-44 hover:bg-[#2f2f2f]   py-0 rounded-none text-white h-10 w-full justify-center">
            {fileName}
        </Button>
    );
}

