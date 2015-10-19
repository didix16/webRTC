var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var fileHandler = require('filehandler');
var serveStatic = require('serve-static');

var serve = serveStatic("./");
app.get('/',function(req,res){
	res.sendFile(__dirname + '/index.html');
});
app.get('/controller',function(req,res){
	res.sendFile(__dirname + '/controller.html');
});
app.use(serveStatic("./"));


io.on('connection',function(socket){
	console.log('user connected!');

	//Controls
	socket
	.on("moveUp",function(msg){
		console.log("Movement UP event received");
		socket.broadcast.emit('moveUp',msg);
	})
	.on("moveDown",function(msg){
		socket.broadcast.emit('moveDown',msg);
	})
	.on("moveLeft",function(msg){
		socket.broadcast.emit('moveLeft',msg);
	})
	.on("moveRight",function(msg){
		socket.broadcast.emit('moveRight',msg);
	});
	//

	socket
	.on('chat_msg',function(msg){

		console.log('User send a message: ' + msg);
		socket.broadcast.emit('chat_msg',msg);
	})
	.on('start_draw',function(msg){
		socket.broadcast.emit('start_draw',msg);
	})
	.on('move_draw',function(msg){
		socket.broadcast.emit('move_draw',msg);
	})
	.on('stop_draw',function(msg){
		socket.broadcast.emit('stop_draw',msg);
	})
	.on('motion',function(msg){
		socket.broadcast.emit('motion',msg);
	});

	socket.on('disconnect',function(){
		console.log('user disconnected!!');
	});
});

http.listen(3000, function(){

	console.log('listening on port 3000');
});