var socket = io();

$('form').submit(function(){
	socket.emit('chat message', $('#m').val());
	$('#m').val('');
	return false;
});

socket.on('chat message', function(msg){
	$('#messages').append($('<li>').text(msg));
});

socket.on('user-connect', function(msg){
	$('#messages').append($('<li class="connect">').text(msg));
});

socket.on('user-disconnect', function(msg){
	$('#messages').append($('<li class="disconnect">').text(msg));
});
