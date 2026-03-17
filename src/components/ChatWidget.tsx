"use client";

import { useState, useRef, useEffect, useCallback, FormEvent } from "react";
import { HiChat, HiX, HiTrash } from "react-icons/hi";
import { IoSend } from "react-icons/io5";
import ReactMarkdown from "react-markdown";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const WELCOME_MESSAGE: Message = {
  role: "assistant",
  content:
    "Hi there! 👋 I'm the AI assistant for this portfolio. Ask me anything about my experience, skills, projects, or how to get in touch!",
};

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([WELCOME_MESSAGE]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  const sendMessage = async (e: FormEvent) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || isLoading) return;

    const userMessage: Message = { role: "user", content: trimmed };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput("");
    setIsLoading(true);

    try {
      // Send only conversation messages (exclude welcome message for cleaner context)
      const apiMessages = updatedMessages
        .filter((_, i) => i > 0 || updatedMessages[0].role === "user")
        .map((m) => ({ role: m.role, content: m.content }));

      // If first message is the welcome, skip it
      const toSend =
        updatedMessages[0] === WELCOME_MESSAGE
          ? apiMessages.slice(0)
          : apiMessages;

      const conversationMessages = updatedMessages
        .filter((m) => m !== WELCOME_MESSAGE)
        .map((m) => ({ role: m.role, content: m.content }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: conversationMessages }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to get response");
      }

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.reply },
      ]);
    } catch (error) {
      const errMsg =
        error instanceof Error ? error.message : "Something went wrong";
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: `Sorry, I encountered an error: ${errMsg}. Please try again.`,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([WELCOME_MESSAGE]);
    setInput("");
  };

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-105 ${
          isOpen
            ? "bg-gray-600 hover:bg-gray-700"
            : "bg-primary-600 hover:bg-primary-700"
        } text-white`}
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        {isOpen ? (
          <HiX className="text-2xl" />
        ) : (
          <HiChat className="text-2xl" />
        )}
      </button>

      {/* Chat panel */}
      {isOpen && (
        <div className="fixed bottom-24 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-96 h-[500px] max-h-[70vh] bg-white dark:bg-dark-bg rounded-2xl shadow-2xl border border-gray-200 dark:border-dark-border flex flex-col overflow-hidden animate-slide-up">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-primary-600 text-white">
            <div>
              <h3 className="font-semibold text-sm">AI Portfolio Assistant</h3>
              <p className="text-xs text-primary-100">
                Ask me about my experience & skills
              </p>
            </div>
            <button
              onClick={clearChat}
              className="p-1.5 rounded-lg hover:bg-primary-700 transition-colors"
              aria-label="Clear chat"
              title="Clear chat"
            >
              <HiTrash className="text-lg" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "bg-primary-600 text-white rounded-br-md"
                      : "bg-gray-100 dark:bg-dark-card text-gray-800 dark:text-gray-200 rounded-bl-md"
                  }`}
                >
                  {msg.role === "assistant" ? (
                    <div className="prose prose-sm dark:prose-invert max-w-none [&>p]:mb-1 [&>p:last-child]:mb-0 [&>ul]:mb-1 [&>ol]:mb-1">
                      <ReactMarkdown>{msg.content}</ReactMarkdown>
                    </div>
                  ) : (
                    msg.content
                  )}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 dark:bg-dark-card rounded-2xl rounded-bl-md px-4 py-3">
                  <div className="flex gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce [animation-delay:-0.3s]" />
                    <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce [animation-delay:-0.15s]" />
                    <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" />
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form
            onSubmit={sendMessage}
            className="px-3 py-3 border-t border-gray-100 dark:border-dark-border"
          >
            <div className="flex items-center gap-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me anything..."
                className="flex-1 bg-gray-100 dark:bg-dark-card text-gray-900 dark:text-white rounded-full px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary-500 placeholder:text-gray-400"
                disabled={isLoading}
                maxLength={2000}
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="w-10 h-10 rounded-full bg-primary-600 text-white flex items-center justify-center hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex-shrink-0"
                aria-label="Send message"
              >
                <IoSend className="text-lg" />
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
