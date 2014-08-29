var socket = io();

$('form').submit(function(){
	socket.emit('chat-message', $('#m').val());
	$('#m').val('');
	return false;
});

socket.on('chat-message', function (data){
	var username = $('<strong>').text(data.username + ': ');
	var chatmsg = $('<li>').append(username).append(data.message);
	$('#messages').append(chatmsg);
});

socket.on('user-connect', function (data){
	var username = $('<strong>').text(data.username + ' ');
	var chatmsg = $('<li class="connect">').append(username).append('connected.');
	$('#messages').append(chatmsg);
});

socket.on('user-disconnect', function (data){
	var username = $('<strong>').text(data.username + ' ');
	var chatmsg = $('<li class="disconnect">').append(username).append('disconnected.');
	$('#messages').append(chatmsg);
});
