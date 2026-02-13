import { useNavigate } from "react-router-dom";

const DropdownMenu = () => {
  const navigate = useNavigate();
  return (
    <div className="absolute right-0 top-full mt-2 w-48 bg-zinc-800 border border-zinc-700 rounded-xl shadow-xl overflow-hidden z-50">
      <button
        className="w-full px-4 py-3 text-left text-white hover:bg-zinc-700 transition-colors flex items-center gap-3"
        onClick={() => navigate("/Profile")}
      >
        <svg
          className="w-5 h-5 text-zinc-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
        <span className="text-sm">Perfil</span>
      </button>

      {/* Separador */}
      <div className="border-t border-zinc-700"></div>

      {/* Opción Cerrar Sesión */}
      <button className="w-full px-4 py-3 text-left text-red-400 hover:bg-zinc-700 transition-colors flex items-center gap-3">
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
          />
        </svg>
        <span className="text-sm">Cerrar sesión</span>
      </button>
    </div>
  );
};

export default DropdownMenu;
