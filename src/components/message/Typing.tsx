const Typing = () => {
  return (
    <div className="flex items-end gap-2 animate-[slideIn_0.1s_ease-out_0.1s_both]">
      <img
        src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100"
        alt=""
        className="w-8 h-8 rounded-full object-cover"
      />
      <div className="bg-zinc-800 px-4 py-3 rounded-2xl rounded-bl-md">
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 bg-zinc-500 rounded-full animate-bounce"></div>
          <div
            className="w-2 h-2 bg-zinc-500 rounded-full animate-bounce"
            style={{ animationDelay: "0.1s" }}
          ></div>
          <div
            className="w-2 h-2 bg-zinc-500 rounded-full animate-bounce"
            style={{ animationDelay: "0.2s" }}
          ></div>
        </div>
      </div>
    </div>
  );
};
export default Typing;
