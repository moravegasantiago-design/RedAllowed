const Audio = () => {
  return (
    <div className="flex items-end gap-2 animate-[slideIn_0.3s_ease-out_0.5s_both]">
      <img
        src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100"
        alt=""
        className="w-8 h-8 rounded-full object-cover"
      />
      <div className="max-w-[70%]">
        <div className="bg-zinc-800 text-white px-4 py-3 rounded-2xl rounded-bl-md flex items-center gap-3">
          <button className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0">
            <svg
              className="w-4 h-4 text-white ml-0.5"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </button>
          <div className="flex-1">
            <div className="flex items-center gap-1">
              <div className="w-1 h-3 bg-zinc-500 rounded-full"></div>
              <div className="w-1 h-5 bg-zinc-500 rounded-full"></div>
              <div className="w-1 h-3 bg-zinc-500 rounded-full"></div>
              <div className="w-1 h-7 bg-zinc-500 rounded-full"></div>
              <div className="w-1 h-4 bg-zinc-500 rounded-full"></div>
              <div className="w-1 h-6 bg-zinc-500 rounded-full"></div>
              <div className="w-1 h-3 bg-zinc-500 rounded-full"></div>
              <div className="w-1 h-5 bg-zinc-500 rounded-full"></div>
              <div className="w-1 h-4 bg-zinc-500 rounded-full"></div>
              <div className="w-1 h-6 bg-emerald-500 rounded-full"></div>
              <div className="w-1 h-3 bg-emerald-500 rounded-full"></div>
              <div className="w-1 h-7 bg-emerald-500 rounded-full"></div>
              <div className="w-1 h-4 bg-emerald-500 rounded-full"></div>
              <div className="w-1 h-5 bg-emerald-500 rounded-full"></div>
            </div>
            <span className="text-xs text-zinc-500">0:24</span>
          </div>
        </div>
        <span className="text-xs text-zinc-600 ml-2">10:36</span>
      </div>
    </div>
  );
};

export default Audio;
