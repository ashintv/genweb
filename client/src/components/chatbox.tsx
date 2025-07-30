export function ChatBox() {
  return (
    <div className=" rounded-t-2xl flex flex-col bg-black h-full w-xl p-4 border-l border-gray-700">
      <div className="flex-1 overflow-y-auto">
        {/* Chat messages go here */}
      </div>
     
      <div className="mt-4">
        {/* Input field for new messages */}
      </div>
    </div>
  );
}
