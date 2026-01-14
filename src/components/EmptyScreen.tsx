const EmptyScreen = () => {
  return (
    <div className="hidden md:flex flex-1 flex-col items-center justify-center bg-zinc-950">
      <div className="text-center animate-[fadeIn_0.5s_ease-out]">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-zinc-800 rounded-full mb-6">
          <svg
            className="w-10 h-10 text-zinc-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
        </div>
        <h2 className="text-xl font-semibold text-white mb-2">
          Selecciona un chat
        </h2>
        <p className="text-zinc-500 max-w-sm">
          Elige una conversación de la lista o inicia una nueva para comenzar a
          chatear
        </p>
      </div>
    </div>
  );
};
export default EmptyScreen;
