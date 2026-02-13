import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MeContext from "../../../context/MeContext";
import useProfile from "../../../hook/useProfile";

// Profile.tsx
const Profile = () => {
  const navigate = useNavigate();
  const myCredentials = useContext(MeContext);
  const { data } = useProfile({ id: myCredentials?.data?.id });
  useEffect(() => {
    console.log(data);
  }, [data]);
  return (
    <div className="min-h-screen bg-zinc-950 flex">
      {/* Sidebar con lista de opciones */}
      <div className="w-full md:w-96 bg-zinc-900 border-r border-zinc-800 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-zinc-800 flex items-center gap-4">
          <button
            className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-xl transition-all"
            onClick={() => navigate("/")}
          >
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
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <h1 className="text-xl font-bold text-white">Perfil</h1>
        </div>

        {/* Profile Card */}
        <div className="p-6 animate-[fadeIn_0.3s_ease-out]">
          {/* Avatar with edit */}
          <div className="relative w-32 h-32 mx-auto mb-6 group">
            <img
              src={data?.data?.imagen}
              alt="Profile"
              className="w-full h-full rounded-full object-cover border-4 border-zinc-800"
            />
            <button className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="bg-emerald-500 p-3 rounded-full">
                <svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
            </button>
            {/* Online indicator */}
            <div className="absolute bottom-2 right-2 w-5 h-5 bg-emerald-500 rounded-full border-4 border-zinc-900"></div>
          </div>

          {/* Name */}
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-white mb-1">
              {data?.data?.name}
            </h2>
            <p className="text-emerald-500 text-sm">En línea</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-zinc-800/50 rounded-xl p-3 text-center">
              <p className="text-xl font-bold text-white">
                {data?.data?.messages}
              </p>
              <p className="text-xs text-zinc-500">Mensages</p>
            </div>
            <div className="bg-zinc-800/50 rounded-xl p-3 text-center">
              <p className="text-xl font-bold text-white">
                {data?.data?.followers}
              </p>
              <p className="text-xs text-zinc-500">Seguidores</p>
            </div>
            <div className="bg-zinc-800/50 rounded-xl p-3 text-center">
              <p className="text-xl font-bold text-white">
                {data?.data?.friends}
              </p>
              <p className="text-xs text-zinc-500">Amigos</p>
            </div>
          </div>
        </div>

        {/* Profile Options */}
        <div className="flex-1 px-4 space-y-2 animate-[fadeIn_0.3s_ease-out_0.1s_both]">
          {/* Name Edit */}
          <div className="bg-zinc-800/30 rounded-xl p-4 hover:bg-zinc-800/50 transition-colors cursor-pointer group">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-emerald-500/10 rounded-xl flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-emerald-500"
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
              </div>
              <div className="flex-1">
                <p className="text-xs text-zinc-500 mb-0.5">Nombre</p>
                <p className="text-white font-medium">{data?.data?.name}</p>
              </div>
              <svg
                className="w-5 h-5 text-zinc-500 group-hover:text-emerald-500 transition-colors"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                />
              </svg>
            </div>
          </div>

          {/* Bio Edit */}
          <div className="bg-zinc-800/30 rounded-xl p-4 hover:bg-zinc-800/50 transition-colors cursor-pointer group">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-blue-500/10 rounded-xl flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-blue-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-xs text-zinc-500 mb-0.5">Descripción</p>
                <p className="text-white font-medium">
                  {data?.data?.bio ?? "No bio yet"}
                </p>
              </div>
              <svg
                className="w-5 h-5 text-zinc-500 group-hover:text-blue-500 transition-colors"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                />
              </svg>
            </div>
          </div>

          {/* Email */}
          <div className="bg-zinc-800/30 rounded-xl p-4 hover:bg-zinc-800/50 transition-colors cursor-pointer group">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-purple-500/10 rounded-xl flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-purple-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-xs text-zinc-500 mb-0.5">Username</p>
                <p className="text-white font-medium">
                  @{data?.data?.username}
                </p>
              </div>
              <svg
                className="w-5 h-5 text-zinc-500 group-hover:text-purple-500 transition-colors"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                />
              </svg>
            </div>
          </div>

          {/* Phone */}
          <div className="bg-zinc-800/30 rounded-xl p-4 hover:bg-zinc-800/50 transition-colors cursor-pointer group">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-orange-500/10 rounded-xl flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-orange-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-xs text-zinc-500 mb-0.5">Trabajo</p>
                <p className="text-white font-medium">
                  {data?.data?.job ?? "Jobless"}
                </p>
              </div>
              <svg
                className="w-5 h-5 text-zinc-500 group-hover:text-orange-500 transition-colors"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Logout Button */}
        <div className="p-4 border-t border-zinc-800">
          <button className="w-full flex items-center justify-center gap-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 py-3 rounded-xl transition-colors">
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
            <span className="font-medium">Cerrar sesión</span>
          </button>
        </div>
      </div>

      {/* Main Content - Profile Preview */}
      <div className="hidden md:flex flex-1 flex-col items-center justify-center bg-zinc-950 p-8">
        <div className="max-w-md w-full animate-[fadeIn_0.5s_ease-out]">
          {/* Preview Card */}
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl overflow-hidden">
            {/* Cover */}
            <div className="h-32 bg-gradient-to-r from-emerald-600 to-emerald-400 relative">
              <button className="absolute bottom-2 right-2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-lg transition-colors">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </button>
            </div>

            {/* Avatar */}
            <div className="relative -mt-16 px-6">
              <div className="relative inline-block">
                <img
                  src={data?.data?.imagen}
                  alt={data?.data?.name}
                  className="w-28 h-28 rounded-full object-cover border-4 border-zinc-900"
                />
                <div className="absolute bottom-1 right-1 w-6 h-6 bg-emerald-500 rounded-full border-4 border-zinc-900"></div>
              </div>
            </div>

            {/* Info */}
            <div className="p-6 pt-4">
              <h3 className="text-xl font-bold text-white">
                {data?.data?.name}
              </h3>
              <p className="text-emerald-500 text-sm mb-4">
                @{data?.data?.username}
              </p>
              <p className="text-zinc-400 text-sm mb-6">
                {data?.data?.bio ?? "No bio yet"}
              </p>

              {/* Quick Actions */}
              <div className="flex gap-3">
                <button className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white py-2.5 rounded-xl font-medium transition-colors">
                  Enviar mensaje
                </button>
                <button className="p-2.5 bg-zinc-800 hover:bg-zinc-700 text-white rounded-xl transition-colors">
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
                      d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <p className="text-center text-zinc-600 text-sm mt-6">
            Así es como otros usuarios ven tu perfil
          </p>
        </div>
      </div>

      {/* Estilos de animación */}
      <style>{`
        @keyframes fadeIn {
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

export default Profile;
