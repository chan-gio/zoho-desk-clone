import { Server, Socket } from 'socket.io';

export function registerNotificationHandler(io: Server) {
  io.on('connection', (socket: Socket) => {
    socket.on('notification:send', (data) => {
      // Broadcast notification to all clients
      io.emit('notification:send', data);
    });
  });
} 