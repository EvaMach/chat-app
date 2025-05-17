import { createServer } from "node:http";
import next from "next";
import { Server } from "socket.io";

const dev = process.env.NODE_ENV !== "production";
const hostname = process.env.HOSTNAME || "localhost";
const port = parseInt(process.env.PORT || "3000");

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = createServer(handle);
  const io = new Server(server);
  io.on("connection", (socket) => {
    console.log(`User connected:" ${socket.id}`);

    socket.on("join-room", ({ room, username }) => {
      socket.join(room);
      console.log(`User ${username} joined room ${room}`);

      socket.to(room).emit("user-joined", `User ${username} joined room ${room}`);
    });

    socket.on('message', ({ message, sender, room }) => {
      console.log(`Message from ${sender}: ${message} in room ${room}`);
      socket.to(room).emit('message', { message, sender });
    });

    socket.on("disconnect", () => {
      console.log("User disconnected");
    });

  });

  server.listen(port, () => {
    console.log(`> Ready on http://${hostname}:${port}`);
  });
});