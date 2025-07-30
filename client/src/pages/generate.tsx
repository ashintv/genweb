import { ChatBox } from "@/components/chatbox";
import { CodeEditor } from "@/components/codeEditor";
export function GeneratePage() {
  return (
     <div className='fixed flex h-screen'>
      <div className='h-full px-5'>
        <h1 className='text-6xl font-bold  p-5'>Chat with Code Editor</h1>
        <ChatBox />
      </div>
      <div className='p-10 '>
        <CodeEditor />
      </div>
    </div>
  );
}