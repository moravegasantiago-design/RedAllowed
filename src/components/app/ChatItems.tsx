import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import ChatsContext from "../../context/ChatsContext";
import UsersOnlineContext from "../../context/UsersOnlineContext";
import MeContext from "../../context/MeContext";
import useLastMessages from "../../socket/hook/useLastMessages";
import orderChats from "../../socket/logic/ordenChats";

const ChatItems = () => {
  const navegate = useNavigate();
  const chatsUser = useContext(ChatsContext);
  const { usersOnline } = useContext(UsersOnlineContext)!;
  const credendials = useContext(MeContext);
  const { lastMessages } = useLastMessages({ userId: credendials?.data.id });
  const chats = orderChats({ chats: chatsUser, lastMessages: lastMessages });
  return chats.map((C) => (
    <div
      className="flex items-center gap-3 p-4 bg-zinc-800/50 border-l-2 border-emerald-500 cursor-pointer animate-[fadeIn_0.3s_ease-out]"
      key={C.chat_id}
      onClick={() => navegate(`/Chat/${C.chat_id}`)}
    >
      <div className="relative">
        <img
          src={C.friendPhoto}
          alt={C.friend}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div
          className={`absolute bottom-0 right-0 w-3 h-3 ${
            usersOnline.flatMap((u) => u.userId).includes(C.user_id)
              ? "bg-emerald-500"
              : "bg-zinc-500"
          } rounded-full border-2 border-zinc-900`}
        ></div>
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <h3 className="text-white font-medium truncate">{C.friend}</h3>
          <span className="text-xs text-emerald-500">
            {new Date(C.lastMessages.date).toLocaleTimeString("es-CO", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-zinc-400 text-sm truncate">
            {C.lastMessages.content}
          </p>
          <span className="bg-emerald-500 text-white text-xs rounded-full px-2 py-0.5 ml-2">
            3
          </span>
        </div>
      </div>
    </div>
  ));
};

// offine : <div className="absolute bottom-0 right-0 w-3 h-3  rounded-full border-2 border-zinc-900"></div>'
// messageNotSeen: <span className="bg-emerald-500 text-white text-xs rounded-full px-2 py-0.5 ml-2">3</span>
// hour : <span className="text-xs text-emerald-500">12:45</span>
//ChatSelect: flex items-center gap-3 p-4 hover:bg-zinc-800/30 cursor-pointer transition-colors animate-[fadeIn_0.3s_ease-out_0.2s_both]
/*
img grup: 
<div className="relative w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center">
  <svg
    className="w-6 h-6 text-white"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
    />
  </svg>
</div>
*/
export default ChatItems;
