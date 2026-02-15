import { useContext,  useEffect,  useState } from "react";
import Nav from "../app/Nav";
import useUsers from "../../hook/useUsers";
import { useFetch } from "../../hook/useFetch";
import UsersOnlineContext from "../../context/UsersOnlineContext";
import useFollow from "../../hook/useFollow";
import LoadingUsers from "./LoadingUsers";
interface FollowingStatus {
  [key: number]: { followers: number; iFollow: boolean };
}
const Search = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const { handleRequest } = useFetch<{ idP2: number }>();
  const { usersOnline } = useContext(UsersOnlineContext) ?? { usersOnline: [] };
  const handleFollowing = (id: number) => {
    setFollowingStatus((prev) => {
      if (prev[id].iFollow)
        return {
          ...prev,
          [id]: {
            followers: prev[id].followers === 0 ? 0 : prev[id].followers - 1,
            iFollow: false,
          },
        };
      else
        return {
          ...prev,
          [id]: { followers: prev[id].followers + 1, iFollow: true },
        };
    });
  };
  const { handlerFollow } = useFollow();
  const { users, loading } = useUsers({ amount: "ALL" });
  const [followingStatus, setFollowingStatus] = useState<FollowingStatus>({});
  useEffect(() => {
    const dbFollowing: FollowingStatus = Object.fromEntries(
      users.map((u) => [
        u.id,
        { followers: Number(u.followers), iFollow: u.iFollow },
      ]),
    );
    setFollowingStatus((prev) => ({ ...prev, ...dbFollowing }));
  }, [users]);
  return (
    <div className="h-screen bg-zinc-950 flex overflow-hidden">
      <div
        className={`
        flex-col
        bg-zinc-900 border-r border-zinc-800
        w-full md:w-96 flex
      `}
      >
        <div className="flex-1 bg-zinc-950 h-screen overflow-hidden flex flex-col fade-in">
          <div className="p-4 border-b border-zinc-800">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-xl font-bold text-white">Contactos</h1>
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

            <div className="relative animate-[fadeIn_0.3s_ease-out]">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none animate-[fadeIn_0.3s_ease-out]">
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
                placeholder="Buscar personas"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-zinc-800 border border-zinc-700 text-white placeholder-zinc-500 rounded-xl py-2.5 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all duration-200 text-sm"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto animate-[fadeIn_0.3s_ease-out]">
            <div className="p-4 space-y-2">
              <div className="text-xs text-zinc-500 px-2 mb-2 font-medium uppercase tracking-wider">
                Sugerencias
              </div>

              {(loading && <LoadingUsers />) ||
                users.map((user) => {
                  const notFollowed = user.followMe ? "Te sigue" : "Seguir";
                  const followed = user.followMe ? "Amigos" : "Siguiendo";
                  return (
                    <div
                      key={user.id}
                      className="group relative bg-zinc-900/40 border border-zinc-800/50 rounded-xl p-4 hover:bg-zinc-900/60 hover:border-zinc-700/80 transition-all duration-200 cursor-pointer"
                    >
                      <div className="flex items-start gap-4">
                        <div className="relative flex-shrink-0">
                          <div className="w-14 h-14 rounded-xl overflow-hidden ring-1 ring-zinc-800 group-hover:ring-zinc-700 transition-all">
                            <img
                              src={user.photo}
                              alt={user.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          {usersOnline
                            .flatMap((u) => u.userId)
                            .includes(user.id) && (
                            <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-emerald-500 rounded-md border-2 border-zinc-900"></div>
                          )}
                        </div>

                        {/* Información */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between mb-1">
                            <div className="flex-1 min-w-0">
                              <h3 className="text-white text-sm font-semibold truncate group-hover:text-emerald-400 transition-colors">
                                {user.name}
                              </h3>
                              <p className="text-zinc-500 text-xs truncate mb-2">
                                @{user.username}
                              </p>
                            </div>
                          </div>

                          <p className="text-zinc-400 text-sm mb-3 line-clamp-1">
                            {user.job ?? "No especificado"}
                          </p>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1.5 text-zinc-500 text-xs">
                              <svg
                                className="w-3.5 h-3.5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                                />
                              </svg>

                              <span>
                                {followingStatus[user.id]?.followers} Seguidores
                              </span>
                            </div>

                            <button
                              onClick={async (e) => {
                                e.stopPropagation();
                                try {
                                  await handlerFollow(user.id);
                                  handleFollowing(user.id);
                                  await handleRequest({
                                    href: "api/chat/create",
                                    method: "POST",
                                    isCredentials: true,
                                    user: {
                                      idP2: user.id,
                                    },
                                  });
                                } catch (e) {
                                  console.error(e);
                                  return;
                                }
                              }}
                              className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                                followingStatus[user.id]?.iFollow
                                  ? "bg-zinc-800 text-zinc-400 hover:bg-zinc-700"
                                  : "bg-emerald-500 text-white hover:bg-emerald-600"
                              }`}
                            >
                              {followingStatus[user.id]?.iFollow
                                ? followed
                                : notFollowed}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
        <Nav />
      </div>
    </div>
  );
};

export default Search;
