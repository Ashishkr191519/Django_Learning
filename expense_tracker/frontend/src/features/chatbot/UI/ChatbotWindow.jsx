
import { useEffect, useRef } from "react";
import {
  Sparkles,
  Minus,
  AlertCircle,
} from "lucide-react";

import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";

const ChatbotWindow = ({
  messages,
  isLoading,
  error,
  toggleChatbot,
  handleSendMessage,
}) => {
  const messagesContainerRef = useRef(null);

  // Automatically scroll to latest message
  useEffect(() => {
    const container = messagesContainerRef.current;

    if (container) {
      container.scrollTo({
        top: container.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages, isLoading, error]);

  return (
    <section
      aria-label="Chungi AI Assistant"
      className="
        fixed bottom-24 right-3 left-3 z-50
        flex h-[min(680px,calc(100dvh-120px))]
        flex-col overflow-hidden
        rounded-3xl border border-slate-700/80
        bg-slate-900/95
        shadow-[0_20px_80px_rgba(0,0,0,0.6)]
        backdrop-blur-2xl
        sm:left-auto sm:right-6 sm:w-[440px]
      "
    >
      {/* Premium Header */}
      <header className="
        relative shrink-0 overflow-hidden
        border-b border-violet-500/20
        bg-gradient-to-br from-slate-900
        via-indigo-950 to-violet-950 p-5
      ">
        {/* Decorative Glow */}
        <div className="
          pointer-events-none absolute
          -right-12 -top-16 h-40 w-40
          rounded-full bg-violet-500/20 blur-3xl
        " />

        <div className="relative flex items-center gap-3">

          {/* AI Avatar */}
          <div className="
            flex h-12 w-12 shrink-0
            items-center justify-center rounded-2xl
            border border-violet-400/30
            bg-gradient-to-br from-indigo-500
            to-violet-700 text-white
            shadow-lg shadow-violet-500/30
          ">
            <Sparkles size={25} />
          </div>

          {/* Assistant Information */}
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-semibold tracking-tight text-slate-100">
                Chungi
              </h2>

              <span className="
                rounded-md border border-violet-400/20
                bg-violet-500/10 px-2 py-0.5
                text-[9px] font-semibold
                tracking-wider text-violet-300
              ">
                AI ASSISTANT
              </span>
            </div>

            <p className="mt-1 text-xs text-slate-400">
              Intelligent financial insights
            </p>
          </div>

          {/* Minimize Button */}
          <button
            type="button"
            onClick={toggleChatbot}
            aria-label="Minimize Chungi"
            className="
              flex h-9 w-9 items-center justify-center
              rounded-xl text-slate-400
              transition-colors
              hover:bg-white/10 hover:text-white
            "
          >
            <Minus size={20} />
          </button>
        </div>

        {/* Assistant Branding */}
        <div className="relative mt-4 flex items-center gap-2">
          <Sparkles
            size={13}
            className="text-violet-400"
          />

          <span className="text-[11px] text-slate-400">
            ExpenseFlow Intelligence
          </span>
        </div>
      </header>

      {/* Conversation Area */}
      <div
        ref={messagesContainerRef}
        role="log"
        aria-label="Conversation"
        aria-live="polite"
        className="
          min-h-0 flex-1 space-y-5
          overflow-y-auto overscroll-contain
          bg-gradient-to-b from-slate-900
          to-slate-950/70 p-4
          [scrollbar-width:thin]
          [scrollbar-color:#475569_transparent]
        "
      >
        {/* Conversation Label */}
        <div className="flex items-center gap-3 py-2">
          <div className="h-px flex-1 bg-slate-800" />

          <span className="
            text-[9px] font-medium uppercase
            tracking-[0.2em] text-slate-500
          ">
            Your financial assistant
          </span>

          <div className="h-px flex-1 bg-slate-800" />
        </div>

        {/* Conversation Messages */}
        {messages.map((message) => (
          <ChatMessage
            key={message.id}
            message={message}
          />
        ))}

        {/* Animated Typing Indicator */}
        {isLoading && (
          <div className="flex items-start gap-3">

            <div className="
              flex h-9 w-9 shrink-0 items-center
              justify-center rounded-xl
              bg-gradient-to-br from-indigo-600
              to-violet-700 text-violet-100
            ">
              <Sparkles size={18} />
            </div>

            <div className="
              rounded-2xl rounded-tl-sm
              border border-slate-700/70
              bg-slate-800/80 px-4 py-3
            ">
              <div className="flex items-center gap-1.5">
                {[0, 1, 2].map((dot) => (
                  <span
                    key={dot}
                    className="
                      h-2 w-2 animate-bounce
                      rounded-full bg-violet-400
                      motion-reduce:animate-none
                    "
                    style={{
                      animationDelay: `${dot * 150}ms`,
                    }}
                  />
                ))}
              </div>

              <p className="mt-2 text-[11px] text-slate-400">
                Chungi is analyzing...
              </p>
            </div>
          </div>
        )}

        {/* API Error */}
        {error && (
          <div
            role="alert"
            className="
              flex items-start gap-2 rounded-xl
              border border-red-500/20
              bg-red-500/10 p-3
              text-xs leading-relaxed text-red-300
            "
          >
            <AlertCircle
              size={16}
              className="mt-0.5 shrink-0"
            />

            <span>{error}</span>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="shrink-0">
        <ChatInput
          handleSendMessage={handleSendMessage}
          isLoading={isLoading}
        />
      </div>
    </section>
  );
};

export default ChatbotWindow;
