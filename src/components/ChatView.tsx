// ChatView.tsx
const ChatView = () => {
  return (
    <div className="min-h-screen bg-zinc-950 flex">
      {/* Sidebar - Chat List (Hidden on mobile when chat is open) */}
      <div className="hidden md:flex w-96 bg-zinc-900 border-r border-zinc-800 flex-col">
        {/* Header */}
        <div className="p-4 border-b border-zinc-800">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl font-bold text-white">Chats</h1>
            <div className="flex items-center gap-2">
              <button className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-xl transition-all">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
                </svg>
              </button>
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="w-5 h-5 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Buscar"
              className="w-full bg-zinc-800 border border-zinc-700 text-white placeholder-zinc-500 rounded-xl py-2.5 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 text-sm"
            />
          </div>
        </div>

        {/* Chat List */}
        <div className="flex-1 overflow-y-auto">
          {/* Active Chat */}
          <div className="flex items-center gap-3 p-4 bg-zinc-800/50 border-l-2 border-emerald-500">
            <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100" alt="" className="w-12 h-12 rounded-full object-cover"/>
            <div className="flex-1 min-w-0">
              <h3 className="text-white font-medium">María García</h3>
              <p className="text-emerald-500 text-sm truncate">Escribiendo...</p>
            </div>
          </div>
          {/* Other Chats */}
          <div className="flex items-center gap-3 p-4 hover:bg-zinc-800/30 cursor-pointer">
            <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100" alt="" className="w-12 h-12 rounded-full object-cover"/>
            <div className="flex-1 min-w-0">
              <h3 className="text-white font-medium">Juan Pérez</h3>
              <p className="text-zinc-400 text-sm truncate">¡Hola! ¿Cómo estás?</p>
            </div>
            <span className="text-xs text-zinc-500">12:45</span>
          </div>
          <div className="flex items-center gap-3 p-4 hover:bg-zinc-800/30 cursor-pointer">
            <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100" alt="" className="w-12 h-12 rounded-full object-cover"/>
            <div className="flex-1 min-w-0">
              <h3 className="text-white font-medium">Carlos López</h3>
              <p className="text-zinc-400 text-sm truncate">📷 Foto</p>
            </div>
            <span className="text-xs text-zinc-500">Ayer</span>
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col bg-zinc-950">
        {/* Chat Header */}
        <div className="bg-zinc-900 border-b border-zinc-800 p-4 flex items-center gap-4 animate-[fadeIn_0.3s_ease-out]">
          <button className="md:hidden p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-xl transition-all">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100" 
              alt="" 
              className="w-10 h-10 rounded-full object-cover"
            />
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-zinc-900"></div>
          </div>
          
          <div className="flex-1">
            <h2 className="text-white font-semibold">María García</h2>
            <p className="text-emerald-500 text-sm">Escribiendo...</p>
          </div>

          <div className="flex items-center gap-2">
            <button className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-xl transition-all">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </button>
            <button className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-xl transition-all">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </button>
            <button className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-xl transition-all">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4" style={{backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%2327272a" fill-opacity="0.4"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")'}}>
          
          {/* Date Separator */}
          <div className="flex items-center justify-center animate-[fadeIn_0.3s_ease-out]">
            <span className="bg-zinc-800 text-zinc-400 text-xs px-3 py-1 rounded-full">Hoy</span>
          </div>

          {/* Received Message */}
          <div className="flex items-end gap-2 animate-[slideIn_0.3s_ease-out]">
            <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100" alt="" className="w-8 h-8 rounded-full object-cover"/>
            <div className="max-w-[70%]">
              <div className="bg-zinc-800 text-white px-4 py-2.5 rounded-2xl rounded-bl-md">
                <p>¡Hola! ¿Cómo estás? 👋</p>
              </div>
              <span className="text-xs text-zinc-600 ml-2">10:30</span>
            </div>
          </div>

          {/* Sent Message */}
          <div className="flex items-end justify-end gap-2 animate-[slideIn_0.3s_ease-out_0.1s_both]">
            <div className="max-w-[70%]">
              <div className="bg-emerald-600 text-white px-4 py-2.5 rounded-2xl rounded-br-md">
                <p>¡Hola María! Todo bien, ¿y tú? 😊</p>
              </div>
              <div className="flex items-center justify-end gap-1 mt-0.5">
                <span className="text-xs text-zinc-600">10:32</span>
                <svg className="w-4 h-4 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                </svg>
              </div>
            </div>
          </div>

          {/* Received Message */}
          <div className="flex items-end gap-2 animate-[slideIn_0.3s_ease-out_0.2s_both]">
            <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100" alt="" className="w-8 h-8 rounded-full object-cover"/>
            <div className="max-w-[70%]">
              <div className="bg-zinc-800 text-white px-4 py-2.5 rounded-2xl rounded-bl-md">
                <p>¡Muy bien! Oye, te quería mostrar el diseño que hice para el proyecto</p>
              </div>
              <span className="text-xs text-zinc-600 ml-2">10:33</span>
            </div>
          </div>

          {/* Received Image */}
          <div className="flex items-end gap-2 animate-[slideIn_0.3s_ease-out_0.3s_both]">
            <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100" alt="" className="w-8 h-8 rounded-full object-cover"/>
            <div className="max-w-[70%]">
              <div className="bg-zinc-800 p-1 rounded-2xl rounded-bl-md overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400" 
                  alt="Design" 
                  className="rounded-xl max-w-full h-auto"
                />
              </div>
              <span className="text-xs text-zinc-600 ml-2">10:34</span>
            </div>
          </div>

          {/* Sent Message */}
          <div className="flex items-end justify-end gap-2 animate-[slideIn_0.3s_ease-out_0.4s_both]">
            <div className="max-w-[70%]">
              <div className="bg-emerald-600 text-white px-4 py-2.5 rounded-2xl rounded-br-md">
                <p>¡Wow! Se ve increíble 🔥 Me encanta el estilo minimalista</p>
              </div>
              <div className="flex items-center justify-end gap-1 mt-0.5">
                <span className="text-xs text-zinc-600">10:35</span>
                <svg className="w-4 h-4 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                </svg>
              </div>
            </div>
          </div>

          {/* Voice Message Received */}
          <div className="flex items-end gap-2 animate-[slideIn_0.3s_ease-out_0.5s_both]">
            <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100" alt="" className="w-8 h-8 rounded-full object-cover"/>
            <div className="max-w-[70%]">
              <div className="bg-zinc-800 text-white px-4 py-3 rounded-2xl rounded-bl-md flex items-center gap-3">
                <button className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
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

          {/* Typing Indicator */}
          <div className="flex items-end gap-2 animate-[slideIn_0.3s_ease-out_0.6s_both]">
            <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100" alt="" className="w-8 h-8 rounded-full object-cover"/>
            <div className="bg-zinc-800 px-4 py-3 rounded-2xl rounded-bl-md">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-zinc-500 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-zinc-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                <div className="w-2 h-2 bg-zinc-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Message Input */}
        <div className="bg-zinc-900 border-t border-zinc-800 p-4 animate-[fadeIn_0.3s_ease-out]">
          <div className="flex items-end gap-3">
            {/* Attachment Button */}
            <button className="p-2.5 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-xl transition-all">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
              </svg>
            </button>

            {/* Image Button */}
            <button className="p-2.5 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-xl transition-all">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </button>

            {/* Text Input */}
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Escribe un mensaje..."
                className="w-full bg-zinc-800 border border-zinc-700 text-white placeholder-zinc-500 rounded-xl py-3 px-4 pr-12 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all duration-200"
              />
              <button className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </button>
            </div>

            {/* Voice / Send Button */}
            <button className="p-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl transition-all">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Estilos de animación */}
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default ChatView;
