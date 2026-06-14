// server.js
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

let rooms = {};

io.on('connection', (socket) => {
  console.log('玩家連線:', socket.id);

  socket.on('createRoom', (roomId) => {
    rooms[roomId] = { players: [], scores: {} };
    socket.join(roomId);
    rooms[roomId].players.push(socket.id);
    rooms[roomId].scores[socket.id] = 0;
    io.to(roomId).emit('roomCreated', roomId);
  });

  socket.on('joinRoom', (roomId) => {
    if (rooms[roomId]) {
      socket.join(roomId);
      rooms[roomId].players.push(socket.id);
      rooms[roomId].scores[socket.id] = 0;
      io.to(roomId).emit('playerJoined', socket.id);
    }
  });

  socket.on('playCard', (data) => {
    io.to(data.roomId).emit('cardPlayed', { player: socket.id, card: data.card });
  });

  socket.on('win', (roomId) => {
    rooms[roomId].scores[socket.id] += 10; // 胡牌加分
    io.to(roomId).emit('scoreUpdate', rooms[roomId].scores);
  });
});

server.listen(3000, () => {
  console.log('伺服器啟動在 http://localhost:3000');
});
