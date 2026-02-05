import { useContext, useEffect, useRef, useState } from "react";
import Typing from "../message/Typing";
import useSeen from "../../socket/hook/useSeen";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { SocketContext } from "../../context/SocketContext";
import useSocketMessages from "../../socket/hook/useSocketMessages";
import useMessages from "../../socket/hook/useMessages";
import MeContext from "../../context/MeContext";
import { Delivered, Sent } from "../message/Status";

const ChatView = () => {
  const navegate = useNavigate();
  const { chatId } = useParams<{ chatId: string }>();
  const { state } = useLocation();
  const socketRef = useContext(SocketContext);
  const [message, setMessage] = useState<{ message: string }>({ message: "" });
  const typingTimeOut = useRef<number | null>(null);
  const { messagesSocket, isWriting } = useSocketMessages(socketRef);
  const { messages } = useMessages(Number(chatId));
  const { isSeen } = useSeen(socketRef);
  const credendials = useContext(MeContext);
  useEffect(() => {
    const container = document.getElementById("chat-messages");
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }, [messages]);
  useEffect(() => {
    console.log(state?.photo);
  }, [state]);
  return (
    <div className="flex-1 flex flex-col bg-zinc-950">
      {/* Chat Header */}
      <div className="bg-zinc-900 border-b border-zinc-800 p-4 flex items-center gap-4 animate-[fadeIn_0.3s_ease-out]">
        <button
          className="md:hidden p-2 text-zinc-400 
        hover:text-white hover:bg-zinc-800 rounded-xl transition-all"
          onClick={() => navegate("/")}
        >
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
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        <div className="relative">
          <img
            src={state?.photo}
            alt={state?.name}
            className="w-10 h-10 rounded-full object-cover"
          />
          {state?.online && (
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-zinc-900"></div>
          )}
        </div>

        <div className="flex-1">
          <h2 className="text-white font-semibold">{state?.name}</h2>
          <p className="text-emerald-500 text-sm">
            {isWriting ? "Escribiendo..." : state?.online ? "Online" : ""}
          </p>
        </div>

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
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
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
                d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
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

      {/* Messages Area */}
      <div
        id="chat-messages"
        className="flex-1 overflow-y-auto p-4 space-y-4"
        style={{
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%2327272a" fill-opacity="0.4"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
        }}
      >
        {/* Date Separator */}
        <div className="flex items-center justify-center animate-[fadeIn_0.3s_ease-out]">
          <span className="bg-zinc-800 text-zinc-400 text-xs px-3 py-1 rounded-full">
            Hoy
          </span>
        </div>
        {[...messages, ...messagesSocket].map((m, i) => (
          <div
            key={i}
            ref={(el) => {
              if (
                !el ||
                m.userId === credendials?.data?.id ||
                m.status !== "delivered"
              )
                return;
              isSeen.current?.observe(el);
            }}
            id={m.id}
            className={`flex ${
              m.userId === credendials?.data?.id
                ? "justify-end"
                : "justify-start"
            } animate-[slideIn_0.1s_ease-out_0.2s_both]`}
          >
            <div className="max-w-[85%] sm:max-w-[70%]">
              <div
                className={`${
                  m.userId === credendials?.data?.id
                    ? "bg-emerald-600"
                    : "bg-zinc-800"
                } text-white px-4 py-2.5 rounded-2xl ${
                  m.userId === credendials?.data?.id
                    ? "rounded-br-md"
                    : "rounded-bl-md"
                } w-fit ${
                  m.userId === credendials?.data?.id ? "ml-auto" : "mr-auto"
                } max-w-[250px] break-words`}
              >
                <p>{m.content}</p>
              </div>
              <div className={`flex items-center justify-end gap-1 mt-0.5`}>
                <span className="text-xs text-zinc-600">
                  {new Date(m.date).toLocaleTimeString("es", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
                {m.userId === credendials?.data?.id && (
                  <>
                    {m.status === "sent" && <Sent />}
                    {m.status === "delivered" && <Delivered />}
                    {m.status === "seen" && <Sent />}
                  </>
                )}
              </div>
            </div>
          </div>
        ))}

        {isWriting && <Typing />}
      </div>

      {/* Message Input */}
      <div className="bg-zinc-900 border-t border-zinc-800 p-4 animate-[fadeIn_0.3s_ease-out]">
        <div className="flex items-end gap-3">
          {/* Attachment Button */}
          <button className="p-2.5 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-xl transition-all">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
              />
            </svg>
          </button>

          {/* Image Button */}
          <button className="p-2.5 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-xl transition-all">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </button>

          {/* Text Input */}
          <div className="flex-1 relative">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!message.message || !socketRef?.current) return;
                socketRef.current?.emit("typing", false, "id");
                socketRef.current?.emit("message", message.message, "id");
                setMessage({ message: "" });
              }}
            >
              <input
                type="text"
                placeholder="Escribe un message..."
                className="w-full bg-zinc-800 border border-zinc-700 text-white placeholder-zinc-500 rounded-xl py-3 px-4 pr-12 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all duration-200"
                maxLength={1000}
                onChange={(e) => {
                  if (!socketRef?.current) return;
                  setMessage({ message: e.target.value });
                  socketRef.current?.emit("typing", true, "id");
                  if (typingTimeOut.current)
                    clearTimeout(typingTimeOut.current);
                  typingTimeOut.current = setTimeout(() => {
                    socketRef.current?.emit("typing", false, "id");
                  }, 1000);
                }}
                value={message.message}
              />
              <button
                className="absolute right-3 top-1/2 -translate-y-1/2 
            text-zinc-400 hover:text-white transition-colors"
                type="submit"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </button>
            </form>
          </div>

          {/* Voice / Send Button */}
          <button className="p-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl transition-all">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
              />
            </svg>
          </button>
        </div>
      </div>
      {/* Estilos de animación */}
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(10px);
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

export default ChatView;
