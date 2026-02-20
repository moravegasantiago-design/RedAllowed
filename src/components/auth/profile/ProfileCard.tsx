import type { Dispatch, RefObject, SetStateAction } from "react";
import type { profileProps } from "../../../hook/useProfile";
import useUsers from "../../../hook/useUsers";
import type { seenProfileProps } from "../../home/Home";
import { useNavigate } from "react-router-dom";
const ProfileCard = ({
  seenProfile,
  setSeenProfile,
  profileRef,
}: {
  seenProfile: seenProfileProps;
  setSeenProfile: Dispatch<SetStateAction<seenProfileProps>>;
  profileRef: RefObject<HTMLDivElement[]>;
}) => {
  const { users, loading } = useUsers({
    userId: seenProfile.id ?? undefined,
    amount: "ONE",
  });

  const navegate = useNavigate();
  return loading && seenProfile.isSeen ? (
    <ProfileCardLoading
      positionX={seenProfile.positionX}
      positionY={seenProfile.positionY}
    />
  ) : (
    <div
      className={`fixed z-50 w-64 animate-[slideUp_0.3s_ease-out] ${seenProfile.isSeen ? "block" : "hidden"}`}
      ref={(el) => {
        if (!el || profileRef.current.includes(el)) return;
        profileRef.current.push(el);
      }}
      style={{
        left:
          seenProfile.positionX !== null
            ? `${seenProfile.positionX}px`
            : "1rem",
        top:
          seenProfile.positionY !== null
            ? `${seenProfile.positionY}px`
            : "5rem",
      }}
      onClick={() => navegate(`/Profile/${seenProfile.id}`)}
    >
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden shadow-2xl">
        <div className="h-10 bg-gradient-to-r from-emerald-600 to-emerald-400 relative">
          <button
            className="absolute top-1.5 right-1.5 bg-black/30 hover:bg-black/50 text-white p-1 rounded-lg transition-colors z-10"
            onClick={(e) => {
              e.stopPropagation();
              setSeenProfile({
                isSeen: false,
                id: null,
                positionX: null,
                positionY: null,
                chatId: null,
              });
            }}
          >
            <svg
              className="w-3 h-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="relative -mt-8 px-3">
          <div className="relative inline-block">
            <img
              src={users[0]?.photo}
              alt={users[0]?.name}
              className="w-14 h-14 rounded-full object-cover border-2 border-zinc-900"
            />
            <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-zinc-900"></div>
          </div>
        </div>

        <div className="p-2 space-y-2">
          <h3 className="text-sm font-bold text-white h-4">{users[0]?.name}</h3>
          <p className="text-emerald-500 text-xs h-3">@{users[0]?.username}</p>

          <div className="space-y-1.5">
            <p className="text-zinc-400 text-xs line-clamp-2">
              {users[0]?.bio ?? "Sin especificar"}
            </p>
          </div>

          <div className="flex gap-2 pt-1">
            <button
              className="flex-1 h-7 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg text-xs font-medium transition-colors flex items-center justify-center"
              onClick={(e) => {
                e.stopPropagation();
                navegate(`/Chat/${seenProfile.chatId}/${seenProfile.id}`);
              }}
            >
              Mensaje
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
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
const ProfileCardLoading = ({
  positionX,
  positionY,
}: {
  positionX: number | null;
  positionY: number | null;
}) => (
  <div
    className="fixed bottom-20 left-4 z-50 w-64 max-h-60 animate-[slideUp_0.3s_ease-out]"
    style={{
      left: positionX !== null ? `${positionX}px` : "1rem",
      top: positionY !== null ? `${positionY}px` : "5rem",
    }}
  >
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden shadow-2xl">
      <div className="h-10 bg-gradient-to-r from-zinc-800 to-zinc-700 relative animate-pulse">
        <div className="absolute top-1.5 right-1.5 w-6 h-6 bg-zinc-700/50 rounded-lg"></div>
      </div>
      <div className="relative -mt-8 px-3">
        <div className="w-14 h-14 bg-zinc-700 rounded-full border-2 border-zinc-900 animate-pulse"></div>
      </div>

      <div className="p-2 space-y-2">
        <div className="h-4 bg-zinc-700 rounded w-2/3 animate-pulse"></div>
        <div className="h-3 bg-zinc-700 rounded w-1/2 animate-pulse"></div>

        <div className="space-y-1.5">
          <div className="h-3 bg-zinc-700 rounded w-full animate-pulse"></div>
          <div className="h-3 bg-zinc-700 rounded w-4/5 animate-pulse"></div>
        </div>

        <div className="flex gap-2 pt-1">
          <div className="flex-1 h-7 bg-zinc-700 rounded-lg animate-pulse"></div>
          <div className="w-8 h-7 bg-zinc-700 rounded-lg animate-pulse"></div>
        </div>
      </div>
    </div>
    <style>{`
    @keyframes slideUp {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `}</style>
  </div>
);
export const ProfileCardDemo = ({ data }: { data?: profileProps | null }) => {
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
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
