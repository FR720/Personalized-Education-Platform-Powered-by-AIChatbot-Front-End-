import React, { useState } from "react";
import { Card } from "./ui/card";
import { ChevronRight, MessageCircle } from "lucide-react";
import { Button } from "./ui/button";
import { useChatMutation } from "./_api/action";

const ChatAI = ({ courseId }: { courseId: string }) => {
  const [chatMessage, setChatMessage] = useState("");
  const [chatHistory, setChatHistory] = useState<
    Array<{ sender: string; message: string }>
  >([
    {
      sender: "ai",
      message: "Hello! I'm your course assistant. Need help with any concepts?",
    },
  ]);

  const [sendingMessage, setSendingMessage] = useState(false);

  const { mutateAsync: sendChatMessage } = useChatMutation(courseId);

  const fallbackResponses = [
    "In unsupervised learning, the algorithm identifies patterns without labeled data. Clustering is one common technique.",
    "Neural networks are inspired by the human brain's structure. They consist of layers of interconnected nodes or 'neurons'.",
    "K-means is a popular clustering algorithm that partitions data into K distinct clusters based on distance measures.",
    "Dimensionality reduction techniques like PCA help visualize high-dimensional data and can improve model performance.",
    "Ethics in machine learning involves addressing bias, ensuring transparency, and considering the societal impact of AI systems.",
  ];

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatMessage.trim()) return;

    const userMessage = chatMessage;
    setChatMessage("");
    setChatHistory((prev) => [
      ...prev,
      { sender: "user", message: userMessage },
    ]);
    setSendingMessage(true);

    try {
      const response = await sendChatMessage({ message: userMessage });
      setChatHistory((prev) => [
        ...prev,
        { sender: "ai", message: response.message },
      ]);
    } catch (error) {
      // fallback if backend fails
      const randomFallback =
        fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];
      setChatHistory((prev) => [
        ...prev,
        { sender: "ai", message: randomFallback },
      ]);
    }

    setSendingMessage(false);
  };

  return (
    <Card
      className={`overflow-hidden h-[400px] flex flex-col ${
        !false ? "animate-fade-in" : ""
      }`}
      style={{ animationDelay: "500ms" }}
    >
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4">
        <div className="flex items-center">
          <div className="mr-3 h-9 w-9 rounded-full bg-white/20 flex items-center justify-center">
            <MessageCircle className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-semibold">Course Assistant</h3>
            <p className="text-xs text-blue-100">
              Ask questions about course material
            </p>
          </div>
        </div>
      </div>

      <div className="flex-grow overflow-y-auto p-4">
        <div className="space-y-4">
          {chatHistory.map((chat, index) => (
            <div
              key={index}
              className={`flex ${
                chat.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[85%] rounded-lg p-3 ${
                  chat.sender === "user"
                    ? "bg-blue-600 text-white rounded-tr-none"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 rounded-tl-none"
                }`}
              >
                {chat.message}
              </div>
            </div>
          ))}
          {sendingMessage && (
            <div className="flex justify-start">
              <div className="max-w-[85%] rounded-lg p-3 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 rounded-tl-none">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 rounded-full bg-slate-300 dark:bg-slate-600 animate-pulse"></div>
                  <div
                    className="w-2 h-2 rounded-full bg-slate-300 dark:bg-slate-600 animate-pulse"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                  <div
                    className="w-2 h-2 rounded-full bg-slate-300 dark:bg-slate-600 animate-pulse"
                    style={{ animationDelay: "0.4s" }}
                  ></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="p-4 border-t border-slate-200 dark:border-slate-800">
        <form onSubmit={handleSendMessage} className="flex space-x-2">
          <input
            type="text"
            value={chatMessage}
            onChange={(e) => setChatMessage(e.target.value)}
            disabled={sendingMessage}
            placeholder="Ask about this course..."
            className="flex-grow text-sm px-3 py-1.5 rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Button
            type="submit"
            size="sm"
            disabled={!chatMessage.trim() || sendingMessage}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </Card>
  );
};

export default ChatAI;
