import React from "react";
import MarkdownRenderer from "./MarkdownRenderer";
import react from '@/assets/icons/reactjs.png';
import Image from "next/image";
import userAvatar from '@/assets/userprf.png';

const BotForReact = ({ conversation }: { conversation: string[] }) => {
  return (
    <> <div className="chatarea w-[370px] md:w-[900px] h-[800px] mt-16 rounded-lg bg-[#121111] mx-auto p-5 overflow-y-scroll">
      {conversation.map((msg, index) => (
        <div key={index} className={`chat ${msg.startsWith("User:") ? "chat-end" : "chat-start"}`}>
          <div className="chat-image avatar">
            <div className="w-10 rounded-full">
              <Image
                className="w-10 rounded-full"
                alt="Avatar"
                src={msg.startsWith("User:") ? userAvatar : react} />
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
    </div></>
  );
};

export default BotForReact