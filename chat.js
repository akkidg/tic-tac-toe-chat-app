var socket = io('http://tic-tac-toe-chat-app.herokuapp.com/');

function submitfunction(){
	var user = $('#userName').val();
	var msg = $('#m').val();
	var id = $('#userId').val();
	//alert("I am an alert box!");
	if(msg != ''){
		$('#messages').append('<li><b style="color:green"> Me: </b>' + msg +' </li>');
		socket.emit('chatMessage',msg,id);
	}
	$('#m').val('').focus();
	return false;
}

function notifyTyping(){
	//alert('typing user'+user);
	socket.emit('typing');
}

socket.on('systemMessage',function(jsonText){	
	var obj = JSON.parse(JSON.stringify(jsonText));	
	$('#messages').append('<li>' + obj.message + ' </li>');
});

socket.on('login',function(numUsers){
	var obj = JSON.parse(JSON.stringify(numUsers));
	$('#messages').append('<li>' + obj.numUsers + ' participants.</li>');
});

socket.on('addUser',function(jsonText){
	var obj = JSON.parse(JSON.stringify(jsonText));
	var user = obj.username;
	var numUsers  = obj.numUsers;
	$('#messages').append('<li><b style="color:#009afd">' + user + '</b> joined room.</li>');	
	$('#messages').append('<li>' + numUsers + '</b> participants.</li>');
});

socket.on('typing',function(jsonText){
	var obj = JSON.parse(JSON.stringify(jsonText));
	var user = obj.username;
	$('#notifyUser').text(user + ' is typing...');
	setTimeout(function(){$('#notifyUser').text('');},10000);
});

socket.on('directMessage',function(jsonText){
	var me = $('#userName').val();
	var obj = JSON.parse(JSON.stringify(jsonText));
	var from = obj.username;
	var msg = obj.message;
	$('#messages').append('<li><b style="color:#009afd">' + from + '</b>:' + msg + '</li>');	
});

socket.on('userLeft',function(jsonText){
	var obj = JSON.parse(JSON.stringify(jsonText));
	var user = obj.username;
	var numUsers  = obj.numUsers;
	$('#messages').append('<li><b style="color:#009afd">' + user + '</b> left room.</li>');	
	$('#messages').append('<li>' + numUsers + '</b> participants.</li>');	
});

$(document).ready(function(){
	var id = 1;		
	//alert(name);
	var name = prompt("What's Your Name?");
	$('#userId').val(id);
	$('#userName').val(name);	

	$('#messages').append('<li> Welcome ' + name + ' </li>');
	socket.emit('addUser',name,id);
	//socket.emit('chatMessage','System','<b>' + name + '</b> has joined discussion.');
});

// create new User Id
function makeid() {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
 
  for( var i=0; i < 5; i++ ) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}
