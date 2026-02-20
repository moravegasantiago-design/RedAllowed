import { Server, Socket } from "socket.io";
import { addMessage, modifyStatus } from "../db/chat";
export const chatOnline = (oi: Server) => {
  const usersOnline: { userId: number; socketId: string }[] = [];

  oi.on("connection", (socket: Socket) => {
    const userId = socket.handshake.auth.userId;
    if (!usersOnline.find((u) => u.socketId === socket.id))
      usersOnline.push({ userId: userId, socketId: socket.id });
    socket.on("online_users", () => oi.emit("online_users", usersOnline));

    socket.on("join_chat", (chat_id: number) => socket.join(String(chat_id)));

    socket.on("message", async (text: string, chat_id: number) => {
      const id = `${crypto.randomUUID()}/${new Date().toISOString()}`;
      oi.to(String(chat_id)).emit("message", {
        userId: userId,
        content: text,
        date: new Date(),
        status: "sent",
        id: id,
        chatId: chat_id,
      });
      try {
        await addMessage({
          idMessage: id,
          chatId: chat_id,
          userId: userId,
          content: text,
        });
      } catch (e) {
        console.error(e);
        return;
      }
    });
    socket.on("typing", (isTrue: boolean, chat_id: number) => {
      socket.to(String(chat_id)).emit("typing", isTrue, chat_id);
    });

    socket.on(
      "delivered",
      async ({ idMsg, chat_id }: { idMsg?: string; chat_id: number }) => {
        socket
          .to(String(chat_id))
          .emit("delivered", { id: idMsg, chatId: chat_id });
        try {
          await modifyStatus({
            idMessage: idMsg,
            chatId: chat_id,
            status: "delivered",
            userId: userId,
          });
        } catch (e) {
          console.error(e);
          return;
        }
      },
    );

    socket.on("seen", async (idMsg: string, chat_id: number) => {
      oi.to(String(chat_id)).emit("seen", { id: idMsg, chatId: chat_id });
      try {
        await modifyStatus({
          idMessage: idMsg,
          chatId: chat_id,
          status: "seen",
          userId: userId,
        });
      } catch (e) {
        console.error(e);
        return;
      }
    });
    socket.on("leave_group", (chat_id: number) => {
      socket.leave(String(chat_id));
    });
    socket.on("disconnect", () => {
      const index = usersOnline.findIndex((u) => u.userId === userId);
      if (index === -1) return;
      socket.on("online_users", () => oi.emit("online_users", usersOnline));
    });
  });
};