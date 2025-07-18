import { Server, Socket } from 'socket.io';

export function registerChatHandler(io: Server) {
  io.on('connection', (socket: Socket) => {
    socket.on('chat:message', (data) => {
      // Broadcast message to all clients
      io.emit('chat:message', data);
    });
  });
} 