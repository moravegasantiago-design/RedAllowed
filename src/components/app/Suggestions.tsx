const Suggestions = () => {
  return (
    <>
      <div className="p-2 text-xs text-zinc-500 border-b border-zinc-700">
        Sugerencias
      </div>

      <Users />
    </>
  );
};

const Users = () => {
  return (
    <button className="w-full flex items-center gap-3 p-3 hover:bg-zinc-700/50 transition-colors">
      <img
        src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100"
        alt=""
        className="w-10 h-10 rounded-full object-cover"
      />
      <div className="flex-1 text-left">
        <p className="text-white text-sm font-medium">Carlos López</p>
        <p className="text-zinc-500 text-xs">Diseñador UI/UX</p>
      </div>
    </button>
  );
};
export default Suggestions;
