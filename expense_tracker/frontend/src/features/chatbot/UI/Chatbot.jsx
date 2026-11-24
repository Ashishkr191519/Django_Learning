import useChatbot from "../hooks/useChatbot";
import ChatbotButton from "./ChatbotButton";
import ChatbotWindow from "./ChatbotWindow";



const Chatbot = () => {
  const {
    messages,
    isLoading,
    error,
    isOpen,
    toggleChatbot,
    handleSendMessage,
  } = useChatbot();

  return (
    <>
      {isOpen && (
        <ChatbotWindow
          messages={messages}
          isLoading={isLoading}
          error={error}
          toggleChatbot={toggleChatbot}
          handleSendMessage={handleSendMessage}
        />
      )}

      <ChatbotButton
        isOpen={isOpen}
        toggleChatbot={toggleChatbot}
      />
    </>
  );
};

export default Chatbot;