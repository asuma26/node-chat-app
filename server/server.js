const path = require('path');
const socketIo=require('socket.io');
const http=require('http');

const express = require('express');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
//see video to understand it
var server=http.createServer(app);
var io=socketIo(server);
app.use(express.static(publicPath));

io.on('connection',(socket)=>{
  console.log('New user connected!!');

  socket.on('disconnect',()=>{
    console.log('User was disconnected');
  });
});


server.listen(port, () => {
  console.log(`Server is up on ${port}`);
});
