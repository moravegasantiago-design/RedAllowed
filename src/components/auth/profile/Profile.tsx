import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import MeContext from "../../../context/MeContext";
import useProfile from "../../../hook/useProfile";
import Field from "./ProfileField";
import ProfileCard from "./ProfileCard";

const Profile = () => {
  const navigate = useNavigate();
  const myCredentials = useContext(MeContext);
  const { data } = useProfile({ id: myCredentials?.data?.id });
  const [editing, setEditing] = useState<boolean>(false);

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
          {Object.entries(data?.data ?? {})
            .filter(([key]) =>
              ["name", "username", "job", "birthDay", "bio"].includes(key),
            )
            .map(([key, values], i) => (
              <Field
                key={i}
                type={key as "name" | "username" | "job" | "birthDay" | "bio"}
                values={values}
                setEditing={setEditing}
                editing={editing}
              />
            ))}
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
          <ProfileCard data={data?.data} />
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
