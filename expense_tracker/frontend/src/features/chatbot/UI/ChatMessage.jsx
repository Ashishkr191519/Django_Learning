
import { useState } from "react";
import {
  Sparkles,
  User,
  Lightbulb,
  Copy,
  Check,
} from "lucide-react";

const ChatMessage = ({ message }) => {
  const [copied, setCopied] = useState(false);
  const isUser = message.role === "user";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(message.content);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div
      className={`flex items-start gap-3 ${
        isUser ? "flex-row-reverse" : "flex-row"
      }`}
    >
      {/* Avatar */}
      <div
        className={`flex h-9 w-9 shrink-0 items-center
          justify-center rounded-xl border ${
            isUser
              ? "border-slate-700 bg-slate-800 text-slate-300"
              : "border-violet-500/30 bg-gradient-to-br from-indigo-600 to-violet-700 text-violet-100 shadow-lg shadow-violet-500/20"
          }`}
      >
        {isUser ? (
          <User size={17} />
        ) : (
          <Sparkles size={18} />
        )}
      </div>

      {/* Message Container */}
      <div
        className={`flex min-w-0 max-w-[82%] flex-col gap-1.5 ${
          isUser ? "items-end" : "items-start"
        }`}
      >
        {/* Sender Name */}
        <span
          className={`px-1 text-[11px] font-medium ${
            isUser ? "text-slate-400" : "text-violet-300"
          }`}
        >
          {isUser ? "You" : "Chungi"}
        </span>

        {/* Message Bubble */}
        <div
          className={`w-full rounded-2xl px-4 py-3
            text-sm leading-relaxed ${
              isUser
                ? "rounded-tr-sm bg-gradient-to-br from-indigo-600 to-violet-700 text-white shadow-lg shadow-violet-950/30"
                : "rounded-tl-sm border border-slate-700/70 bg-slate-800/80 text-slate-200 backdrop-blur-xl"
            }`}
        >
          <p className="whitespace-pre-wrap break-words">
            {message.content}
          </p>

          {/* Smart Suggestions */}
          {!isUser && message.suggestions?.length > 0 && (
            <div className="mt-4 border-t border-slate-700 pt-3">
              <div className="mb-3 flex items-center gap-2">
                <Lightbulb
                  size={15}
                  className="text-violet-400"
                />

                <span className="text-[10px] font-semibold uppercase tracking-widest text-violet-300">
                  Smart Suggestions
                </span>
              </div>

              <div className="space-y-2">
                {message.suggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-2
                      rounded-xl border border-violet-500/15
                      bg-violet-500/10 px-3 py-2.5
                      text-xs leading-relaxed text-violet-200
                      transition-colors hover:bg-violet-500/15"
                  >
                    <Sparkles
                      size={13}
                      className="mt-0.5 shrink-0 text-violet-400"
                    />

                    <span className="min-w-0 break-words">
                      {suggestion}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Copy Response */}
        {!isUser && (
          <button
            type="button"
            onClick={handleCopy}
            className="flex items-center gap-1.5 rounded-md
              px-2 py-1 text-[11px] text-slate-400
              transition-colors hover:bg-slate-800
              hover:text-violet-300"
          >
            {copied ? (
              <>
                <Check size={12} className="text-emerald-400" />
                <span className="text-emerald-400">
                  Copied
                </span>
              </>
            ) : (
              <>
                <Copy size={12} />
                <span>Copy response</span>
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default ChatMessage;
