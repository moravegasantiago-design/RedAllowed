import { useNavigate } from "react-router-dom";
import type { chatProps } from "../home/Home";
import type { usersType } from "../../hook/useUsers";
import type { RefObject } from "react";

const getField = (keys: string[], obj: Record<string, unknown>): string => {
  const key = keys.find((k) => k in obj);
  return key ? String(obj[key] ?? "") : "";
};

const Suggestions = ({
  chat,
  handleClick,
  divRef,
  profileRef,
}: {
  chat: chatProps[] | usersType[];
  handleClick: (
    e: React.MouseEvent<HTMLImageElement>,
    id: number,
    chatId?: number,
  ) => void;
  divRef: RefObject<HTMLDivElement[]>;
  profileRef?: RefObject<HTMLDivElement[]>;
}) => {
  return (
    <div
      className="mt-2 bg-zinc-800 border border-zinc-700 rounded-xl overflow-hidden animate-[slideDown_0.2s_ease-out]"
      ref={(el) => {
        if (!el || divRef.current.includes(el)) return;
        divRef.current.push(el);
      }}
    >
      <div className="p-2 text-xs text-zinc-500 border-b border-zinc-700">
        Sugerencias
      </div>
      {chat.map((c, i) => (
        <Users
          key={i}
          chat={c}
          handleClick={handleClick}
          profileRef={profileRef}
        />
      ))}
    </div>
  );
};

const Users = ({
  chat,
  profileRef,
  handleClick,
}: {
  chat: chatProps | usersType;
  handleClick: (
    e: React.MouseEvent<HTMLImageElement>,
    id: number,
    chatId?: number,
  ) => void;
  profileRef?: RefObject<HTMLDivElement[]>;
}) => {
  const navigate = useNavigate();
  const c = chat as Record<string, unknown>;

  return (
    <button
      className="w-full flex items-center gap-3 p-3 hover:bg-zinc-700/50 transition-colors"
      onMouseDown={(e) => {
        e.stopPropagation();
        if (!("friend" in chat)) return;
        const ch = chat as chatProps;
        navigate(`/Chat/${ch.chat_id}/${ch.user_id}`, {
          state: { name: ch.friend, photo: ch.friendPhoto, isOnline: false },
        });
      }}
    >
      <img
        ref={(el) => {
          if (!el || profileRef?.current.includes(el)) return;
          profileRef?.current.push(el);
        }}
        src={getField(["friendPhoto", "photo"], c)}
        className="w-10 h-10 rounded-full object-cover"
        onMouseDown={(e) => {
          e.stopPropagation();
          handleClick(
            e,
            Number(getField(["user_id", "id"], c)),
            "chat_id" in c ? Number(c.chat_id) : undefined,
          );
        }}
      />
      <div className="flex-1 text-left">
        <p className="text-white text-sm font-medium">
          {getField(["friend", "name"], c)}
        </p>
        <p className="text-zinc-500 text-xs">
          {getField(["friendJob", "job"], c) || "No especificado"}
        </p>
      </div>
    </button>
  );
};

export default Suggestions;