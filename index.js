var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res){
  res.sendFile('index.html');
});

var incr = 0;
io.on('connection', function (socket) {
	socket.name = 'Default' + incr++;
	io.emit('user-connect', { username: socket.name });

	socket.on('chat-message', function (msg) {
		io.emit('chat-message', { username: socket.name, message: msg });
	});

	socket.on('disconnect', function (msg) {
		io.emit('user-disconnect', {username: socket.name });
	});
});

http.listen(3000, function (){
  console.log('listening on *:3000');
});