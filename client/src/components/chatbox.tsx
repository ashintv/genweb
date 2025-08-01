import type { Step } from "@/lib/types";

export function ChatBox({ steps, data }: {
  steps: Step[],
  data: string
}) {
  function replaceBoltArtifactSection(content: string): string {
    return content.replace(/<boltArtifact[\s\S]*?<\/boltArtifact>/g, "<>---<>");
  }
  const modifiedData = replaceBoltArtifactSection(data).split("<>");

  return (
    <div className=" rounded-t-2xl flex flex-col bg-black h-full w-xl p-4 border-l border-gray-700">
      <div className="flex-1 text-white overflow-y-auto">
        {modifiedData.map((item, index) => (
          item === '---' ?
            <div key={index} className="mb-4">
              <h2 className="text-lg font-semibold">Steps</h2>
      
            {steps.map((step, stepIndex) => (
              <div key={stepIndex} className="mb-4">
                <h2 className="text-xs text-yellow-400 font-semibold">{step.title}</h2>
              </div>
            ))}
          </div>
         : (
        <div key={index} className="mb-4">
          <pre className="whitespace-pre-wrap break-words">{item}</pre>
        </div>
        )
        ))}
      </div>

      <div className="mt-4">

        {/* Input field for new messages */}
      </div>
    </div>
  );
}
