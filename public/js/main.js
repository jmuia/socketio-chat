var OPTIONS = [
	'/help',
	'/setname'
];

var HELP = [
	"Available Commands:",
    "/setname <name>"
];

var socket = io();

$('form').submit(function(){
	var input = $('#m').val()
	var pieces = input.split(' ');
	var index = OPTIONS.indexOf(pieces[0]);
	
	if (index < 0) {
		socket.emit('chat-message', input);
		var username = $('<strong>').text('You: ');
		var chatmsg = $('<li>').append(username).append(input);
		$('#messages').append(chatmsg);

	} else if (OPTIONS[index] === '/help') {
		appendHelp();
	} else if (OPTIONS[index] === '/setname') {
		socket.emit('name-change', pieces[1]);
	}

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

socket.on('name-change', function (data) {
	var username = $('<strong>').text(data.username);
	var oldname = $('<strong>').text(data.oldname);
	var chatmsg = $('<li class="update">').append(oldname).append(' changed their username to ').append(username).append('.');
	$('#messages').append(chatmsg);
});

function appendHelp() {
	var helpList = $('<ul>');
	
	$.each(HELP, function (i, item) {
		var helpItem = $('<li>').text(item);
		helpList.append(helpItem);
	});

	$('#messages').append(helpList);	
}
