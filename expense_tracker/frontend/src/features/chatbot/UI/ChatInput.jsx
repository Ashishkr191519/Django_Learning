
import { useState } from "react";
import {
  ArrowUp,
  Sparkles,
  LoaderCircle,
  ChartPie,
  Wallet,
  TrendingUp,
} from "lucide-react";

const suggestedQuestions = [
  {
    label: "Monthly summary",
    query: "Give me my monthly financial summary.",
    icon: ChartPie,
  },
  {
    label: "Top expenses",
    query: "Which category has my highest expenses?",
    icon: TrendingUp,
  },
  {
    label: "My balance",
    query: "What is my current month's balance?",
    icon: Wallet,
  },
];

const ChatInput = ({ handleSendMessage, isLoading }) => {
  const [query, setQuery] = useState("");

  const canSend = query.trim().length > 0 && !isLoading;

  const submitMessage = () => {
    if (!canSend) return;

    handleSendMessage(query.trim());
    setQuery("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    submitMessage();
  };

  const handleKeyDown = (e) => {
    if (
      e.key === "Enter" &&
      !e.shiftKey &&
      !e.nativeEvent.isComposing
    ) {
      e.preventDefault();
      submitMessage();
    }
  };

  return (
    <div className="border-t border-slate-800 bg-slate-950/80 p-4 backdrop-blur-xl">

      {/* Suggested Questions */}
      <div className="mb-3 flex flex-wrap gap-2">
        {suggestedQuestions.map((item) => {
          const Icon = item.icon;

          return (
            <button
              key={item.label}
              type="button"
              disabled={isLoading}
              onClick={() => setQuery(item.query)}
              className="flex items-center gap-1.5
                rounded-full border border-violet-500/20
                bg-violet-500/5 px-3 py-1.5
                text-[11px] font-medium text-violet-300
                transition-all duration-200
                hover:border-violet-500/50
                hover:bg-violet-500/15
                disabled:cursor-not-allowed
                disabled:opacity-40"
            >
              <Icon size={12} />
              {item.label}
            </button>
          );
        })}
      </div>

      {/* Input Container */}
      <form
        onSubmit={handleSubmit}
        className="rounded-2xl border border-slate-700
          bg-slate-900/80 p-3
          transition-all duration-300
          focus-within:border-violet-500/70
          focus-within:shadow-[0_0_20px_rgba(139,92,246,0.15)]"
      >
        <textarea
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          maxLength={1000}
          rows={2}
          aria-label="Message Chungi"
          placeholder="Ask anything about your expenses..."
          className="w-full resize-none bg-transparent
            text-sm leading-relaxed text-slate-200
            outline-none placeholder:text-slate-500"
        />

        {/* Input Footer */}
        <div className="mt-2 flex items-center justify-between">

          <div className="flex items-center gap-1.5">
            <Sparkles
              size={13}
              className="text-violet-400"
            />

            <span className="text-[10px] font-medium text-slate-400">
              AI-powered insights
            </span>
          </div>

          <div className="flex items-center gap-3">

            {/* Character Counter */}
            <span
              className={`text-[10px] ${
                query.length >= 950
                  ? "text-amber-400"
                  : "text-slate-500"
              }`}
            >
              {query.length}/1000
            </span>

            {/* Send Button */}
            <button
              type="submit"
              disabled={!canSend}
              aria-label="Send message"
              className="flex h-9 w-9 items-center
                justify-center rounded-xl
                bg-gradient-to-br from-indigo-500
                to-violet-600 text-white
                shadow-lg shadow-violet-500/20
                transition-all duration-200
                hover:scale-105 active:scale-95
                disabled:cursor-not-allowed
                disabled:opacity-40
                disabled:hover:scale-100"
            >
              {isLoading ? (
                <LoaderCircle
                  size={18}
                  className="animate-spin"
                />
              ) : (
                <ArrowUp size={20} strokeWidth={2.5} />
              )}
            </button>
          </div>
        </div>
      </form>

      {/* Disclaimer */}
      <p className="mt-3 text-center text-[10px] text-slate-500">
        AI can make mistakes. Verify important information.
      </p>
    </div>
  );
};

export default ChatInput;
