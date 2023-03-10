const express = require('express'); // import the express package
const app = express(); // create an express app
const http = require('http'); // import the Node server package
const server = http.createServer(app);// use our app file with the server

//add in the socket stuff
const { Server } = require("socket.io");
const io = new Server(server);


const port = process.env.PORT || 2000;

app.use(express.static('public'));

//this is a routh  handler -> listen for incoming requests and send back a response
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});


//set up the server to listen for incoming connections at this port
server.listen(port, () => {
  console.log(`listening on ${port}`);
});

//socket.io script goes here
io.on('connection', (socket) => {
    console.log('chat user connected:');
    socket.emit('connected', { sID: socket.id, message: 'new connection' });

     // step 1 -recive incoming messages
    socket.on('chat_message', function(msg) {
      console.log(msg);// have a look at message data


      //step 2
      // rebroadcast the current message to everyone connected to our chat service
      // it gets sent to all users, including the original message creator

      io.emit('new-message', { message: msg });
    })

    socket.on('typing_event', function(user) {
      io.emit('typing', user);
    })

    //my rules
    socket.on('disconnect_event', function(user) {
      console.log('chat user is disconnected');
      io.emit('notification', user);
    })
});