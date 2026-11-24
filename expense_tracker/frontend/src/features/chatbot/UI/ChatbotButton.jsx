
import { Sparkles, X } from "lucide-react";

const ChatbotButton = ({ isOpen, toggleChatbot }) => {
  return (
    <button
      type="button"
      onClick={toggleChatbot}
      aria-label={isOpen ? "Close Chungi" : "Open Chungi"}
      aria-expanded={isOpen}
      className="
        group fixed bottom-6 right-6 z-50
        flex h-16 w-16 items-center justify-center
        rounded-full
        bg-gradient-to-br from-indigo-500 via-violet-600 to-purple-700
        text-white
        shadow-[0_8px_30px_rgba(99,102,241,0.45)]
        transition-all duration-300
        hover:scale-110
        hover:shadow-[0_8px_40px_rgba(99,102,241,0.65)]
        active:scale-95
        focus-visible:outline-none
        focus-visible:ring-4
        focus-visible:ring-indigo-300
      "
    >
      {!isOpen && (
        <>
          <span className="
            pointer-events-none absolute inset-0
            animate-ping rounded-full
            bg-violet-400 opacity-20
            motion-reduce:animate-none
          " />

          <span className="
            pointer-events-none absolute right-20
            whitespace-nowrap rounded-xl
            bg-slate-900 px-4 py-2.5
            text-sm font-medium text-white
            opacity-0 shadow-lg
            transition-opacity duration-300
            group-hover:opacity-100
            group-focus-visible:opacity-100
          ">
            Ask Chungi ✨
          </span>
        </>
      )}

      <span className="relative z-10">
        {isOpen ? (
          <X size={28} strokeWidth={2} />
        ) : (
          <Sparkles size={28} strokeWidth={2} />
        )}
      </span>
    </button>
  );
};

export default ChatbotButton;
