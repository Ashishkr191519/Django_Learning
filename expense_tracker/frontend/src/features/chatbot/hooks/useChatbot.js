import { useState, useRef } from "react";
import { sendChatMessage } from "../API/chatbotApi";

const useChatbot = () => {
  const [messages, setMessages] = useState([
    {
      id: "welcome",
      role: "assistant",
      content: "Hi! I'm Chungi, your AI expense assistant. How can I help you?",
      suggestions: [],
    },
  ]);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const requestInProgress = useRef(false);

  const toggleChatbot = () => {
    setIsOpen((prev) => !prev);
  };

  const handleSendMessage = async (query) => {
    const trimmedQuery = query.trim();

    if (!trimmedQuery || requestInProgress.current) return;

    requestInProgress.current = true;

    const userMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content: trimmedQuery,
    };

    setMessages((prev) => [...prev, userMessage]);

    setIsLoading(true);
    setError(null);

    try {
      const response = await sendChatMessage(trimmedQuery);

      const assistantMessage = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: response.answer,
        suggestions: response.suggestions || [],
      };

      setMessages((prev) => [...prev, assistantMessage]);

    } catch (err) {
      setError(
        err.response?.data?.error ||
        err.response?.data?.detail ||
        "Unable to connect to Ashita. Please try again."
      );

    } finally {
      requestInProgress.current = false;
      setIsLoading(false);
    }
  };

  return {
    messages,
    isLoading,
    error,
    isOpen,
    toggleChatbot,
    handleSendMessage,
  };
};

export default useChatbot;