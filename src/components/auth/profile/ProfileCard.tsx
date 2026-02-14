import type { profileProps } from "../../../hook/useProfile";

const ProfileCard = ({ data }: { data?: profileProps | null }) => {
  return (
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
            src={data?.imagen}
            alt={data?.name}
            className="w-28 h-28 rounded-full object-cover border-4 border-zinc-900"
          />
          <div className="absolute bottom-1 right-1 w-6 h-6 bg-emerald-500 rounded-full border-4 border-zinc-900"></div>
        </div>
      </div>

      {/* Info */}
      <div className="p-6 pt-4">
        <h3 className="text-xl font-bold text-white">{data?.name}</h3>
        <p className="text-emerald-500 text-sm mb-4">@{data?.username}</p>
        <p className="text-zinc-400 text-sm mb-6">
          {data?.bio ?? "Sin especificar"}
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
  );
};

export default ProfileCard;
