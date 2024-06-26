"use client"
import { runGenerativeAI } from "@/lib/generativeApi";
import { useState, useEffect } from "react"

export const Chatarea: React.FC = () => {
  const [inputValue, setInputValue] = useState("");
  const [botResponse, setBotResponse] = useState("");
  const [conversation, setConversation] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const saveConversationToLocalStorage = (conversation: string[]) => {
    localStorage.setItem("conversation", JSON.stringify(conversation));
  };

  const getConversationFromLocalStorage = () => {
    const storedConversation = localStorage.getItem("conversation");
    return storedConversation ? JSON.parse(storedConversation) : [];
  };

  useEffect(() => {
    const storedConversation = getConversationFromLocalStorage();
    setConversation(storedConversation);
  }, []);

  const handleSubmit = async () => {
    try {
      if (inputValue.trim() === "") return;
      setLoading(true);
      const previousConversation = conversation.join("\n");
      const response = await runGenerativeAI(inputValue, previousConversation);
      setBotResponse(response);
      const updatedConversation = [...conversation, `User: ${inputValue}`, `Bot: ${response}`];
      setConversation(updatedConversation);
      saveConversationToLocalStorage(updatedConversation);
      setInputValue("");
    } catch (error: any) {
      console.error("Error generating response:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = async (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      await handleSubmit();
    }
  };

  return (
    <section className="flex flex-col justify-center items-center w-full h-screen">
      <div className="chatarea w-[370px] md:w-[900px] h-[800px] mt-16 rounded-lg bg-[#121111] mx-auto p-5 overflow-y-scroll">
        {conversation.map((msg, index) => (
          <div key={index} className={`chat ${msg.startsWith("User:") ? "chat-end" : "chat-start"}`}>
            <div className="chat-image avatar">
              <div className="w-10 rounded-full">
                <img
                  alt="Avatar"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
              </div>
            </div>
            <div className="chat-header">
              {msg.startsWith("User:") ? "User" : "Bot"}
              <time className="text-xs opacity-50">{new Date().toLocaleTimeString()}</time>
            </div>
            <div className="chat-bubble text-wrap">{msg.replace("User: ", "").replace("Bot: ", "")}</div>
            <div className="chat-footer opacity-50">{msg.startsWith("User:") ? "Seen" : "Delivered"}</div>
          </div>
        ))}
      </div>
      <div className="flex gap-5 my-5 w-[370px] md:w-[900px]">
        <input 
          type="text" 
          placeholder="Type here" 
          className="input input-bordered w-full" 
          value={inputValue} 
          onChange={(e) => setInputValue(e.target.value)} 
          onKeyPress={handleKeyPress} 
          disabled={loading}
        />
        <button 
          className={`btn btn-outline btn-primary ${loading ? "loading" : ""}`} 
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Loading..." : "Send"}
        </button>
      </div>
    </section>
  );
};
