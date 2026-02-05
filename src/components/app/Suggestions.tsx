import { useNavigate } from "react-router-dom";
import type { chatProps } from "../home/Home";

const Suggestions = ({
  chat,
  method,
}: {
  chat: chatProps | chatProps[];
  method: "input" | "friend";
}) => {
  return (
    <div className="mt-2 bg-zinc-800 border border-zinc-700 rounded-xl overflow-hidden animate-[slideDown_0.2s_ease-out]">
      <div className="p-2 text-xs text-zinc-500 border-b border-zinc-700">
        {method === "input" ? "Sugerencias" : "Amigo reciente"}
      </div>

      {Array.isArray(chat) ? (
        chat.map((c, i) => <Users key={i} chat={c} />)
      ) : (
        <Users chat={chat} />
      )}
    </div>
  );
};

const Users = ({ chat }: { chat: chatProps }) => {
  const navegate = useNavigate();
  return (
    <button
      className="w-full flex items-center gap-3 p-3 hover:bg-zinc-700/50 transition-colors"
      onClick={() =>
        navegate(`/Chat/${chat?.chat_id}`, {
          state: {
            name: chat?.friend,
            photo: chat?.friendphoto,
            isOnline: false,
          },
        })
      }
    >
      <img
        src={chat?.friendphoto}
        alt={chat?.friend}
        className="w-10 h-10 rounded-full object-cover"
        onClick={(e) => e.stopPropagation()}
      />
      <div className="flex-1 text-left">
        <p className="text-white text-sm font-medium">{chat?.friend}</p>
        <p className="text-zinc-500 text-xs">
          {chat?.friendJob ?? "No especificado"}
        </p>
      </div>
    </button>
  );
};
export default Suggestions;
