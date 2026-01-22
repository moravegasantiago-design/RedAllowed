import { Server, Socket } from "socket.io";
export const chatOnline = (oi: Server) => {
  const usersOnline: { userId: number; socketId: string }[] = [];

  oi.on("connection", (socket: Socket) => {
    const userId = socket.handshake.auth.userId;

    usersOnline.push({ userId: userId, socketId: socket.id });

    socket.on("online_users", () => oi.emit("online_users", usersOnline));

    socket.on("join_chat", (chat_id: string) => socket.join(chat_id));

    socket.on("message", (text: string, chat_id: string) => {
      oi.to(chat_id).emit("message", {
        user: socket.id,
        text: text,
        date: new Date(),
        status: "sent",
        idMessage: crypto.randomUUID() + "/" + new Date(),
      });
    });
    socket.on("typing", (isTrue: boolean, chat_id: string) => {
      socket.to(chat_id).emit("typing", isTrue);
    });

    socket.on("delivered", (idMensaje: string, chat_id: string) => {
      socket.to(chat_id).emit("delivered", idMensaje);
    });

    socket.on("seen", (idMsg: string, chat_id: string) => {
      socket.to(chat_id).emit("seen", idMsg);
    });
    socket.on("disconnect", () => {
      const index = usersOnline.findIndex((u) => u.socketId === socket.id);
      if (index === -1) return;
      usersOnline.splice(index, 1);
    });
  });
};