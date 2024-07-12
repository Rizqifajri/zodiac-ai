"use client"
import { runGenerativeAI } from "@/lib/generativeApi";
import { useState, useEffect } from "react";
import MarkdownRenderer from "./MarkdownRenderer";
import { useSearchParams } from "next/navigation";
import BotForReact from "@/components/BotForReact";
import { useSession } from "next-auth/react";

export const Chatarea: React.FC = () => {
  const { data: session } = useSession();
  const [inputValue, setInputValue] = useState("");
  const [botResponse, setBotResponse] = useState("");
  const [conversation, setConversation] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const bot = useSearchParams().get('bot');

  const instruction = bot === 'html' ? 'you are a helpful bot with knowledge of html. you can teach me about basic html.'
    : bot === 'css' ? 'you are a helpful bot with knowledge of css. you can teach me about basic css.'
      : bot === 'javascript' ? 'you are a helpful with knowledge of javascript expert. you can teach me about basic javascript until expert.'
        : bot === 'nextjs' ? 'you are a next developer expert. you can help me build a project with next.'
          : bot === 'react' ? 'you are a react developer expert. you can help me build a project with react.'
            : bot === 'typescript' ? 'you are a helpful with knowledge of typescript expert. you can teach me tentang typescript dari dasar hingga mahir.'
              : 'you are a helpful bot.';

  const saveConversationToLocalStorage = (conversation: string[]) => {
    try {
      localStorage.setItem("conversation", JSON.stringify(conversation));
    } catch (error) {
      console.error("Error saving conversation to local storage:", error);
    }
  };

  const getConversationFromLocalStorage = () => {
    try {
      const storedConversation = localStorage.getItem("conversation");
      return storedConversation ? JSON.parse(storedConversation) : [];
    } catch (error) {
      console.error("Error getting conversation from local storage:", error);
      return [];
    }
  };

  const saveConversationToDatabase = async (updatedConversation: string[]) => {
    try {
      const response = await fetch("/api/conversations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages: updatedConversation, userId: session?.user.id, type: bot }),
      });

      if (!response.ok) {
        throw new Error("Failed to save conversation to database");
      }

      const data = await response.json();
      console.log("Conversation saved:", data);

    } catch (error) {
      console.error("Error saving conversation to database:", error);
    }
  };

  useEffect(() => {
    // const storedConversation = getConversationFromLocalStorage();
    // setConversation(storedConversation);
    const fetchConversation = async () => {
      try {
        const response = await fetch(`/api/conversations?${bot}`);
        if (!response.ok) {
          throw new Error('Failed to fetch conversation');
        }
        const data = await response.json();
        console.log(data)
        setConversation(data.conversations);

      } catch (error) {
        console.error('Error fetching conversation:', error);
      }

    };
    fetchConversation();
  }, [bot]);

  const handleSubmit = async () => {
    if (inputValue.trim() === "") return;
    setLoading(true);
    try {
      const previousConversation = conversation ? conversation.join("\n") : "";
      const response = await runGenerativeAI(inputValue, previousConversation, instruction);
      setBotResponse(response);
      const updatedConversation = [...conversation, `User: ${inputValue}`, `Bot: ${response}`];
      setConversation(updatedConversation);
      saveConversationToLocalStorage(updatedConversation);
      saveConversationToDatabase(updatedConversation);
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
      {
        bot === 'react' ? <BotForReact conversation={conversation} /> :
          <>
            <div className="chatarea w-[370px] md:w-[900px] h-[800px] mt-16 rounded-lg bg-[#121111] mx-auto p-5 overflow-y-scroll">

              {!conversation ? <p className="text-center text-white text-3xl">Loading...</p> :
                conversation?.map((msg, index) => (
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
                    <MarkdownRenderer content={msg.replace("User: ", "").replace("Bot: ", "")} className="chat-bubble text-wrap prose prose-invert" />
                    <div className="chat-footer opacity-50">{msg.startsWith("User:") ? "Seen" : "Delivered"}</div>
                  </div>
                ))}
            </div>
          </>
      }

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
