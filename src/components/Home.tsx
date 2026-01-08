// Home.tsx
const Home = () => {
  return (
    <div className="min-h-screen bg-zinc-950 flex">
      {/* Sidebar */}
      <div className="w-full md:w-96 bg-zinc-900 border-r border-zinc-800 flex flex-col">
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
              <button className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-xl transition-all">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                </svg>
              </button>
            </div>
          </div>

          {/* Search */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="w-5 h-5 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Buscar o iniciar un nuevo chat"
              className="w-full bg-zinc-800 border border-zinc-700 text-white placeholder-zinc-500 rounded-xl py-2.5 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all duration-200 text-sm"
            />
          </div>

          {/* Search Suggestions (visible cuando se busca) */}
          <div className="mt-2 bg-zinc-800 border border-zinc-700 rounded-xl overflow-hidden animate-[slideDown_0.2s_ease-out]">
            <div className="p-2 text-xs text-zinc-500 border-b border-zinc-700">Sugerencias</div>
            
            <button className="w-full flex items-center gap-3 p-3 hover:bg-zinc-700/50 transition-colors">
              <img 
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100" 
                alt="" 
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="flex-1 text-left">
                <p className="text-white text-sm font-medium">María García</p>
                <p className="text-zinc-500 text-xs">Desarrolladora Frontend</p>
              </div>
            </button>
            
            <button className="w-full flex items-center gap-3 p-3 hover:bg-zinc-700/50 transition-colors">
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100" 
                alt="" 
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="flex-1 text-left">
                <p className="text-white text-sm font-medium">Carlos López</p>
                <p className="text-zinc-500 text-xs">Diseñador UI/UX</p>
              </div>
            </button>
          </div>
        </div>

        {/* Chat List */}
        <div className="flex-1 overflow-y-auto">
          {/* Chat Item 1 - Active */}
          <div className="flex items-center gap-3 p-4 bg-zinc-800/50 border-l-2 border-emerald-500 cursor-pointer animate-[fadeIn_0.3s_ease-out]">
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100" 
                alt="" 
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-zinc-900"></div>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h3 className="text-white font-medium truncate">Juan Pérez</h3>
                <span className="text-xs text-emerald-500">12:45</span>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-zinc-400 text-sm truncate">¡Hola! ¿Cómo estás? 👋</p>
                <span className="bg-emerald-500 text-white text-xs rounded-full px-2 py-0.5 ml-2">3</span>
              </div>
            </div>
          </div>

          {/* Chat Item 2 */}
          <div className="flex items-center gap-3 p-4 hover:bg-zinc-800/30 cursor-pointer transition-colors animate-[fadeIn_0.3s_ease-out_0.1s_both]">
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100" 
                alt="" 
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-zinc-900"></div>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h3 className="text-white font-medium truncate">María García</h3>
                <span className="text-xs text-zinc-500">11:30</span>
              </div>
              <div className="flex items-center gap-1">
                <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                </svg>
                <p className="text-zinc-400 text-sm truncate">Te envié el documento</p>
              </div>
            </div>
          </div>

          {/* Chat Item 3 */}
          <div className="flex items-center gap-3 p-4 hover:bg-zinc-800/30 cursor-pointer transition-colors animate-[fadeIn_0.3s_ease-out_0.2s_both]">
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100" 
                alt="" 
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-zinc-500 rounded-full border-2 border-zinc-900"></div>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h3 className="text-white font-medium truncate">Carlos López</h3>
                <span className="text-xs text-zinc-500">Ayer</span>
              </div>
              <p className="text-zinc-400 text-sm truncate">📷 Foto</p>
            </div>
          </div>

          {/* Chat Item 4 */}
          <div className="flex items-center gap-3 p-4 hover:bg-zinc-800/30 cursor-pointer transition-colors animate-[fadeIn_0.3s_ease-out_0.3s_both]">
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100" 
                alt="" 
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-zinc-500 rounded-full border-2 border-zinc-900"></div>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h3 className="text-white font-medium truncate">Ana Martínez</h3>
                <span className="text-xs text-zinc-500">Ayer</span>
              </div>
              <p className="text-zinc-400 text-sm truncate">Perfecto, nos vemos mañana</p>
            </div>
          </div>

          {/* Chat Item 5 */}
          <div className="flex items-center gap-3 p-4 hover:bg-zinc-800/30 cursor-pointer transition-colors animate-[fadeIn_0.3s_ease-out_0.4s_both]">
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100" 
                alt="" 
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-zinc-900"></div>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h3 className="text-white font-medium truncate">Pedro Sánchez</h3>
                <span className="text-xs text-zinc-500">Lun</span>
              </div>
              <p className="text-zinc-400 text-sm truncate">¿Ya viste el proyecto nuevo?</p>
            </div>
          </div>

          {/* Chat Item 6 - Group */}
          <div className="flex items-center gap-3 p-4 hover:bg-zinc-800/30 cursor-pointer transition-colors animate-[fadeIn_0.3s_ease-out_0.5s_both]">
            <div className="relative w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h3 className="text-white font-medium truncate">Equipo Desarrollo</h3>
                <span className="text-xs text-zinc-500">Dom</span>
              </div>
              <p className="text-zinc-400 text-sm truncate">Carlos: Listo el deploy 🚀</p>
            </div>
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="p-4 border-t border-zinc-800">
          <div className="flex items-center justify-around">
            <button className="flex flex-col items-center gap-1 text-emerald-500">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              <span className="text-xs">Chats</span>
            </button>
            <button className="flex flex-col items-center gap-1 text-zinc-500 hover:text-zinc-300 transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span className="text-xs">Contactos</span>
            </button>
            <button className="flex flex-col items-center gap-1 text-zinc-500 hover:text-zinc-300 transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="text-xs">Ajustes</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Chat Area - Empty State */}
      <div className="hidden md:flex flex-1 flex-col items-center justify-center bg-zinc-950">
        <div className="text-center animate-[fadeIn_0.5s_ease-out]">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-zinc-800 rounded-full mb-6">
            <svg className="w-10 h-10 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-white mb-2">Selecciona un chat</h2>
          <p className="text-zinc-500 max-w-sm">Elige una conversación de la lista o inicia una nueva para comenzar a chatear</p>
        </div>
      </div>

      {/* Estilos de animación */}
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(5px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
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

export default Home;
