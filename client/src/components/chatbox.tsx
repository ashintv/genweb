import type { Step } from "@/lib/types";

export function ChatBox({steps}:{
  steps:Step []
}) {
  return (
    <div className=" rounded-t-2xl flex flex-col bg-black h-full w-xl p-4 border-l border-gray-700">
      <div className="flex-1 text-white overflow-y-auto">
        {steps.map(x=><div key={x.id}>{x.title}</div>)}
      </div>
    
      <div className="mt-4">
        {/* Input field for new messages */}
      </div>
    </div>
  );
}
