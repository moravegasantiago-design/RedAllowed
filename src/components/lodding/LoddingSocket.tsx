export default function LoadingSocket() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-center">
        {/* Logo o icono */}
        <div className="mb-8">
          <div className="w-20 h-20 mx-auto bg-green-500 rounded-2xl flex items-center justify-center">
            <svg
              className="w-12 h-12 text-black"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
          </div>
        </div>

        {/* Spinner de carga */}
        <div className="mb-6">
          <div className="w-12 h-12 mx-auto border-4 border-gray-800 border-t-green-500 rounded-full animate-spin"></div>
        </div>

        {/* Texto */}
        <p className="text-gray-400 text-sm">Cargando mensajes...</p>
      </div>
    </div>
  );
}
