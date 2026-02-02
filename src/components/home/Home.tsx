import Suggestions from "../app/Suggestions";
import ChatItems from "../app/ChatItems";
import { Outlet } from "react-router-dom";
import Nav from "../app/Nav";
import orderChats from "../../socket/logic/ordenChats";
import { useContext, useState } from "react";
import ChatsContext from "../../context/ChatsContext";
import MeContext from "../../context/MeContext";
import useLastMessages, {
  type lastMessagesProps,
} from "../../socket/hook/useLastMessages";
export type chatProps = {
  user_id: number;
  chat_id: number;
  created_at: Date;
  friend: string;
  friendPhoto: string;
  friendBio: string | null;
  friendJob: string;
  friendBirthDay: string;
  friendTime: string;
  lastMessages: lastMessagesProps;
};
const Home = () => {
  const chatsUser = useContext(ChatsContext);
  const credendials = useContext(MeContext);
  const { lastMessages } = useLastMessages({ userId: credendials?.data.id });
  const chats = orderChats({ chats: chatsUser, lastMessages: lastMessages });
  const [unSeenChats, setSeenChats] = useState<string[]>(() =>
    chats
      .filter((c) => c.lastMessages.unreadMessages !== 0)
      .map((c) => `${c.chat_id}`)
  );

  return (
    <>
      <div className="h-screen bg-zinc-950 flex overflow-hidden">
        {/* Sidebar */}
        <div
          className={`
        flex-col
        bg-zinc-900 border-r border-zinc-800
        w-full md:w-96
        ${location.pathname === "/Chat" ? "hidden md:flex" : "flex"}
      `}
        >
          <div className="p-4 border-b border-zinc-800">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-xl font-bold text-white">Chats</h1>
              <div className="flex items-center gap-2">
                <button className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-xl transition-all">
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
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                </button>
                <button className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-xl transition-all">
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
                      d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Search */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  className="w-5 h-5 text-zinc-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
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
              <Suggestions />
            </div>
          </div>

          {/* Chat List */}
          <div className="flex-1 overflow-y-auto">
            {chats.map((chat) => (
              <ChatItems
                chat={chat}
                setSeenChats={setSeenChats}
                unSeenChats={unSeenChats}
                id={credendials?.data.id}
              />
            ))}
          </div>
          <Nav />
        </div>
        <Outlet />
      </div>
    </>
  );
};

export default Home;
