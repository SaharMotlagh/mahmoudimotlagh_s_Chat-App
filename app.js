const express = require('express'); // import the express package
const app = express(); // create an express app
const http = require('http'); // import the Node server package
const server = http.createServer(app);// use our app file with the server


const port = process.env.PORT || 3000;

//this is a routh  handler -> listen for incoming requests and send back a response
app.get('/', (req, res) => {
  res.send('<h1>Hello world</h1>');
});


//set up the server to listen for incoming connections at this port
server.listen(3000, () => {
  console.log(`listening on ${port}`);
});