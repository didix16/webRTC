/*	Game Core of SnackBall
	
	Require: ball.class.js
			 player.class.js
			 socket.io.js
*/
_w = window,_d = document;
_w.game = {

	fps: 0,				//Frames per second
	interval: 0,		//
	delta: 0,			//Delta time
	now: 0,				//Current time
	then: Date.now(),	//Last time from last frame
	balls: [],			//Balls in the game
	players: [],		//Players in the game
	stage: null,		//Stage where the balls will be. a presonal DOMElement,
	socket: io(),		//The socket where the game listens

	/* Game controll actions listen to controller actions*/
	controls: {

		moveUp: function(obj){
			
		},
		moveDown: function(obj){
			
		},
		moveLeft: function(obj){
			
			var ball = game.balls[obj.player.num];

			if(obj.pressed && !ball.getTurn()){
				ball.turnDirection('left');
			}else if(!obj.pressed && ball.getTurn()){
				ball.turnDirection('forward');
			}
		},
		moveRight: function(obj){

			var ball = game.balls[obj.player.num];

			if(obj.pressed && !ball.getTurn()){
				ball.turnDirection('right');
			}else if(!obj.pressed && ball.getTurn()){

				ball.turnDirection('forward');
			}
		},
		btnA: function(obj){

			var ball = game.balls[obj.player.num];

			console.log("BTN_A",obj);
			if(obj.pressed && !ball.getGas()){
				ball.setGas(1);
			}else if(!obj.pressed && ball.getGas()){
				ball.setGas(0);
			}

			//ball.setColor(game.getRandomColor());
		},
		btnB: function(obj){

			var ball = game.balls[obj.player.num];

			if(obj.pressed && !ball.getGas()){

				ball.setGas(-1);

			}else if(!obj.pressed && ball.getGas()){
				
				ball.setGas(0);
			}
		}
	},

	addPlayer: function(oOptions){

		var player = new Player(oOptions);

		this.players[player.getNum()] = player;

		var bOptions = {

			propietary: null,
			color: '#000000',
			radius: 0,
			position: {
				x: 0,
				y: 0
			}

		};

		bOptions.propietary = game.players[player.getNum()];

		

		bOptions.color = this.getRandomColor();
		bOptions.radius = 40;

		//Calc random position
		//-----------------------------------------------------------------
		var maxX = _w.innerWidth - bOptions.radius;
		var maxY = _w.innerHeight - bOptions.radius;

		var x = Math.floor(Math.random() * maxX);
		var y = Math.floor(Math.random() * maxY);

		bOptions.position.x = x;
		bOptions.position.y = y;
		//-----------------------------------------------------------------


		game.addBall(bOptions);

		console.info("GAME::Player added!");
	},

	addBall: function(oOptions){

		var ball = new Ball(oOptions);

		this.balls[oOptions.propietary.getNum()] = ball;

		ball.spawn(this.stage);

		console.info("GAME::Ball spawned at: {X:"+ball.getPosition().x+", Y:"+ball.getPosition().y+"}");

	},

	getRandomColor: function(){
		//Calc random color
		//----------------------------------------------------------------
		var colLetters = "0123456789ABCDEF".split('');
		var color = "#";
		for(var i= 0; i< 6; i++){
			color += colLetters[Math.floor(Math.random() * 16)];
		}
		//----------------------------------------------------------------

		return color;
	},

	render: function(){

		var that = this;
		var bLen = that.balls.length;

		
		for(var i=0;i<bLen;i++){
			if(that.balls[i]){
				that.balls[i].move(this.delta,that.balls).draw();
			}

		}
	},


	/* Initialise the game at fps*/
	init: function(fps){

		var that = this;
		this.fps = fps;
		this.interval = 1000/fps;
		this.then = Date.now();

		//Set the game stage
		this.stage = _d.getElementsByTagName('stage').length ? _d.getElementsByTagName('stage')[0] : _d.body;

		//***********Socket listen commands***************

		//Player events
		this.socket
		.on("playerJoin",function(oMsg){

			that.addPlayer(oMsg);
		});
		//Controls events
		this.socket
		.on("moveUp",function(oMsg){

			that.controls.moveUp(oMsg);
		})
		.on("moveDown",function(oMsg){

			that.controls.moveDown(oMsg);
		})
		.on("moveLeft",function(oMsg){

			that.controls.moveLeft(oMsg);
		})
		.on("moveRight",function(oMsg){

			that.controls.moveRight(oMsg);
		})
		.on("btnA",function(oMsg){

			that.controls.btnA(oMsg);
		})
		.on("btnB",function(oMsg){

			that.controls.btnB(oMsg);
		});

		//************************************************

		if(_w.requestAnimationFrame){

			(function gameLoop(){

				requestAnimationFrame(gameLoop);

				that.now = Date.now();
				that.delta = that.now - that.then;
				that.render();
				that.then = that.now;

			})();

			console.info("GAME:: Game has been initialized!");
		}else{

			alert("Your Browser cannot run this game!");
			console.error("GAME:: Game could not be initialized!");
		}

	}

};
