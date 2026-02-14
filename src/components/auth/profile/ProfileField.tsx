import { useState, type Dispatch, type SetStateAction } from "react";

const Field = ({
  values,
  type,
  setEditing,
  editing,
}: {
  type: "name" | "username" | "job" | "birthDay" | "bio";
  values: string | null;
  setEditing: Dispatch<SetStateAction<boolean>>;
  editing: boolean;
}) => {
  const title = {
    name: "Nombre",
    username: "Username",
    job: "Job",
    birthDay: "Cumpleaños",
    bio: "Biografia",
  };
  const [text, setText] = useState<{ text: string; textUpdate: string | null }>(
    { text: "", textUpdate: null },
  );
  const [disabled, setDisabled] = useState<boolean>(true);
  const [updated, setUpdated] = useState<boolean>(false);
  console.log(editing && !disabled);
  return (
    <div className="bg-zinc-800/30 rounded-xl p-4 hover:bg-zinc-800/50 transition-colors group">
      <div className="flex items-center gap-4">
        <Icon type={type} />
        <div className="flex-1 min-w-0">
          <p className="text-xs text-zinc-500 mb-0.5">{title[type]}</p>
          <input
            type="text"
            value={
              !disabled || updated ? text.text : (values ?? "Sin especificar")
            }
            disabled={disabled}
            className={
              editing && disabled
                ? `bg-transparent text-zinc-400 disabled:bg-transparent disabled:opacity-100 disabled:cursor-not-allowed`
                : `text-white font-medium bg-transparent border-none outline-none w-full cursor-pointer`
            }
            onChange={(e) =>
              setText((prev) => ({
                text: e.target.value,
                textUpdate: prev.textUpdate,
              }))
            }
          />
        </div>
        <Pencil
          type={type}
          setDisabled={setDisabled}
          disabled={disabled}
          setUpdated={setUpdated}
          setText={setText}
          values={values ?? null}
          setEditing={setEditing}
          editing={editing}
        />
      </div>
    </div>
  );
};

const Icon = ({
  type,
}: {
  type: "name" | "username" | "job" | "birthDay" | "bio";
}) => {
  const icons = {
    name: (
      <div className="w-10 h-10 bg-emerald-500/10 rounded-xl flex items-center justify-center flex-shrink-0">
        <svg
          className="w-5 h-5 text-emerald-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
      </div>
    ),
    username: (
      <div className="w-10 h-10 bg-purple-500/10 rounded-xl flex items-center justify-center flex-shrink-0">
        <svg
          className="w-5 h-5 text-purple-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      </div>
    ),
    bio: (
      <div className="w-10 h-10 bg-blue-500/10 rounded-xl flex items-center justify-center flex-shrink-0">
        <svg
          className="w-5 h-5 text-blue-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>
    ),
    job: (
      <div className="w-10 h-10 bg-orange-500/10 rounded-xl flex items-center justify-center flex-shrink-0">
        <svg
          className="w-5 h-5 text-orange-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      </div>
    ),
    birthDay: (
      <div className="w-10 h-10 bg-pink-500/10 rounded-xl flex items-center justify-center flex-shrink-0">
        <svg
          className="w-5 h-5 text-pink-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      </div>
    ),
  };
  return icons[type];
};

const Pencil = ({
  type,
  disabled,
  setDisabled,
  setUpdated,
  values,
  setText,
  setEditing,
  editing,
}: {
  type: "name" | "username" | "job" | "birthDay" | "bio";
  disabled: boolean;
  setDisabled: Dispatch<SetStateAction<boolean>>;
  setUpdated: Dispatch<SetStateAction<boolean>>;
  values: string | null;
  setText: Dispatch<
    SetStateAction<{ text: string; textUpdate: string | null }>
  >;
  setEditing: Dispatch<SetStateAction<boolean>>;
  editing: boolean;
}) => {
  const className = {
    name: "w-5 h-5 text-zinc-500 group-hover:text-emerald-500 transition-colors",
    username:
      "w-5 h-5 text-zinc-500 group-hover:text-purple-500 transition-colors",
    job: "w-5 h-5 text-zinc-500 group-hover:text-orange-500 transition-colors",
    birthDay:
      "w-5 h-5 text-zinc-500 group-hover:text-pink-500 transition-colors",
    bio: "w-5 h-5 text-zinc-500 group-hover:text-blue-500 transition-colors",
  };
  return !disabled ? (
    <div className="flex items-center gap-2 animate-in fade-in slide-in-from-right-2 duration-200">
      <button
        className="flex-shrink-0 p-1.5 rounded-lg bg-green-500/10 hover:bg-green-500/20 transition-all duration-200 hover:scale-110 active:scale-95"
        onClick={() => {
          setDisabled(true);
          setUpdated(true);
          setEditing(false);
          setText((prev) => ({ ...prev, textUpdate: prev.text }));
        }}
      >
        <svg
          className="w-5 h-5 text-green-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </svg>
      </button>

      <button
        className="flex-shrink-0 p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 transition-all duration-200 hover:scale-110 active:scale-95"
        onClick={() => {
          setDisabled(true);
          setText((prev) =>
            prev.textUpdate
              ? { ...prev, text: prev.textUpdate }
              : { ...prev, text: "" },
          );
          setEditing(false);
        }}
      >
        <svg
          className="w-5 h-5 text-red-500"
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
  ) : (
    <button
      className="flex-shrink-0 p-1.5 rounded-lg hover:bg-zinc-700/50 transition-all duration-200 hover:scale-110 active:scale-95 animate-in fade-in slide-in-from-left-2"
      disabled={editing}
      onClick={() => {
        if (editing) return;
        setDisabled(false);
        setText((prev) =>
          prev.text
            ? { ...prev, text: prev.text }
            : { ...prev, text: values ?? "Sin especificar" },
        );
        setEditing(true);
      }}
    >
      <svg
        className={editing ? "w-5 h-5 opacity-40" : className[type]}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
        />
      </svg>
    </button>
  );
};
export default Field;
