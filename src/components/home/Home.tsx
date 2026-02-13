import Suggestions from "../app/Suggestions";
import ChatItems from "../app/ChatItems";
import { Outlet, useLocation } from "react-router-dom";
import Nav from "../app/Nav";
import orderChats from "../../socket/logic/ordenChats";
import { useContext } from "react";
import MeContext from "../../context/MeContext";
import useLastMessages, {
  type lastMessagesProps,
} from "../../socket/hook/useLastMessages";
import useSearch from "../../hook/useSearch";
import ChatsContext from "../../context/ChatsContext";
import useClickMenu from "../../hook/useClickMenu";
import DropdownMenu from "./DropdownMenu";
export type chatProps = {
  user_id: number;
  chat_id: number;
  created_at: string;
  friend: string;
  friendPhoto: string;
  friendBio: string | null;
  friendJob: string;
  friendBirthDay: string;
  friendTime: string;
  lastMessages: lastMessagesProps | null;
};
const Home = () => {
  const chats = useContext(ChatsContext);
  const credendials = useContext(MeContext);
  const { lastMessages } = useLastMessages({ userId: credendials?.data?.id });
  const chatsUser = orderChats({ chats: chats, lastMessages: lastMessages });
  const { search, handleSearch } = useSearch<chatProps>(["friend"]);
  const location = useLocation();
  const { openMenu, setOpenMenu, divRef } = useClickMenu();
  const {
    openMenu: openSuggestions,
    setOpenMenu: setOpenSuggestions,
    divRef: refSuggestions,
  } = useClickMenu();
  return (
    <>
      <div className="h-screen bg-zinc-950 flex overflow-hidden">
        <div
          className={`
        flex-col
        bg-zinc-900 border-r border-zinc-800
        w-full sm:w-80 md:w-96
        ${location.pathname !== "/" ? "hidden md:flex" : "flex"}
      `}
        >
          <div className="p-3 sm:p-4 border-b border-zinc-800">
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <h1 className="text-lg sm:text-xl font-bold text-white">Chats</h1>
              <div className="flex items-center gap-1 sm:gap-2">
                <button className="p-1.5 sm:p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg sm:rounded-xl transition-all">
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5"
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
                <div className="relative" ref={divRef}>
                  <button
                    className="p-1.5 sm:p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg sm:rounded-xl transition-all"
                    onClick={() => setOpenMenu((prev) => !prev)}
                  >
                    <svg
                      className="w-4 h-4 sm:w-5 sm:h-5"
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

                  {openMenu && <DropdownMenu />}
                </div>
              </div>
            </div>

            {/* Search */}
            <div className="relative" ref={refSuggestions}>
              <div className="absolute inset-y-0 left-0 pl-2.5 sm:pl-3 flex items-center pointer-events-none">
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5 text-zinc-500"
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
                className="w-full bg-zinc-800 border border-zinc-700 text-white placeholder-zinc-500 rounded-lg sm:rounded-xl py-2 sm:py-2.5 pl-8 sm:pl-10 pr-3 sm:pr-4 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all duration-200 text-xs sm:text-sm"
                value={search.value}
                onFocus={() => setOpenSuggestions(true)}
                onChange={(e) => handleSearch({ e, list: chatsUser })}
              />
            </div>

            {search.value && openSuggestions && search.filter.length > 0 && (
              <Suggestions chat={search.filter} />
            )}
          </div>

          {/* Chat List */}
          <div className="flex-1 overflow-y-auto">
            {chatsUser
              .filter((c) => c.lastMessages)
              .map((chat, i) => (
                <ChatItems key={i} chat={chat} id={credendials?.data?.id} />
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