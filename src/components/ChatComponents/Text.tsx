const Text = ({ chat }: { chat: { text: string; date: string }[] }) => {
  return (
    <>
      {chat.map((m, i) => (
        <div
          key={i}
          className={`flex justify-end animate-[slideIn_0.1s_ease-out_0.2s_both]`}
        >
          <div className="max-w-[85%] sm:max-w-[70%]">
            <div className="bg-emerald-600 text-white px-4 py-2.5 rounded-2xl rounded-br-md w-fit ml-auto max-w-[250px] break-words">
              <p>{m.text}</p>
            </div>
            <div className={`flex items-center justify-end gap-1 mt-0.5"`}>
              <span className="text-xs text-zinc-600">
                {new Date(m.date).toLocaleTimeString("es", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
              <svg
                className="w-4 h-4 text-blue-400"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
              </svg>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};
export default Text;
