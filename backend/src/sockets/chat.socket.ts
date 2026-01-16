import { Server, Socket } from "socket.io";
export const chatOnline = (oi: Server) => {
  oi.on("connection", (socket: Socket) => {
    socket.on("message", (text: string) => {
      oi.emit("message", {
        user: socket.id,
        text: text,
        date: new Date(),
        status: "sent",
        idMessage: crypto.randomUUID() + "/" + new Date(),
      });
    });
    socket.on("typing", (isTrue: boolean) => {
      socket.broadcast.emit("typing", isTrue);
    });
    socket.on("delivered", (idMensaje: string) => {
      socket.broadcast.emit("delivered", idMensaje);
    });
    socket.on("seen", (idMsg: string) => {
      socket.broadcast.emit("seen", idMsg);
    });
  });
};
