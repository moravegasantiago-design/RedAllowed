const LoadingUsers = () => {
  return (
    <div className="p-4 space-y-2">
      <div className="text-xs text-zinc-500 px-2 mb-2 font-medium uppercase tracking-wider">
        Cargando...
      </div>
      {[1, 2, 3, 4, 5, 6].map((item) => (
        <div
          key={item}
          className="relative bg-zinc-900/40 border border-zinc-800/50 rounded-xl p-4"
        >
          <div className="flex items-start gap-4">
            <div className="relative flex-shrink-0">
              <div className="w-14 h-14 bg-zinc-800 rounded-xl animate-pulse"></div>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between mb-1">
                <div className="flex-1 min-w-0 space-y-2">
                  <div className="h-4 w-32 bg-zinc-800 rounded animate-pulse"></div>
                  <div className="h-3 w-24 bg-zinc-800/60 rounded animate-pulse mb-2"></div>
                </div>
              </div>

              <div className="h-3 w-full bg-zinc-800/40 rounded animate-pulse mb-3"></div>

              <div className="flex items-center justify-between">
                <div className="h-3 w-28 bg-zinc-800/60 rounded animate-pulse"></div>
                <div className="h-7 w-20 bg-emerald-500/20 rounded-lg animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
export default LoadingUsers;
