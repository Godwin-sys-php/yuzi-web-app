const express = require('express');

const app = express()
const port = 3003


const server = require('http').Server(app);

// // Default Index Page
app.use(express.static(__dirname + '/dist'));
// Send all other items to index file
app.get('*', (req, res) => res.sendFile(__dirname + '/dist/index.html'));

server.listen(port, function () {
  console.debug(`listening on port ${port}`);
});