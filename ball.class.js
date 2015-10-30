
/* Ball class*/
var Ball = function(oOptions){

	var that = this;
	var vars = {

		position: { // Also this would be the center
			x: 0,
			y: 0
		},
		position0: { //Pos sub0; Initial pos
			x: 0,
			y: 0
		},
		propietary: null, //Object type Player
		color: '#000000',
		area: 0, //in pixels square,                                r c
		radius: 0, //radius of the ball. It can be used as MIDSIZE ---x---
		speed: 0, //current Speed px/s of the ball. Modulus of velocity,
		speedV: { //Vectorial speed (X,Y)
			x: 0,
			y: 0
		},
		acceleration: 1, //Increase amount of speed by seconds => Speed/s
		MAX_SPEED: 20, //Max speed of the ball . Will vary by its area. +area, -max_speed
		element: null, //HTML DOMElement
		alpha: 0, //Current direction Angle of the ball in degrees
		alpha0: 0, //Initial angle of the ball
		friction: 0.97, //Initial friction constant for a ball
		turn: 0, // -1 = left, 0 = forward, 1 = right
		gas: 0, // -1 = break, 0 = nothing, 1 = throttle

	};

	this.setPosition = function(oPos){

		vars.position.x = oPos.x - vars.radius;
		vars.position.y = oPos.y - vars.radius;

		return this;
	};

	this.getPosition = function(){

		return vars.position;
	};

	this.setPosition0 = function(oPos){

		vars.position0.x = oPos.x;
		vars.position0.y = oPos.y;

		return this;
	};

	this.getPosition0 = function(){

		return vars.position0;
	};

	this.setPropietary = function(oPlayer){

		vars.propietary = oPlayer;
		return this;
	};

	this.getPropietary = function(){

		return vars.propietary;
	};

	this.setColor = function(sColor){

		vars.color = sColor ? sColor : vars.color;
		return this;
	};

	this.getColor = function(){

		return vars.color;
	};

	//Deprecated
	this.setCenter = function(oPos){

		vars.center.x = oPos.x;
		vars.center.y = oPos.y;
		return this;
	};

	//Deprecated
	this.getCenter = function(){

		return vars.center;
	};

	this.setArea = function(){

		vars.area = 2 * Math.PI * vars.radius;
		return this;
	};

	this.getArea = function(){

		return vars.area;
	};

	this.setRadius = function(iRadius){

		vars.radius = iRadius;
		return this;
	};

	this.getRadius = function(){

		return vars.radius;
	};

	this.setSpeed = function(speed){

		vars.speed = speed;
		return this;
	};

	this.getSpeed = function(){

		return vars.speed;
	};

	this.setMaxSpeed = function(k){

		vars.MAX_SPEED = k;
		return this;
	};

	this.getMaxSpeed = function(){

		return vars.MAX_SPEED;
	};

	this.setVectorialSpeed = function(oVSpeed){

		vars.speedV.x = oVSpeed.x;
		vars.speedV.y = oVSpeed.y;

		return this;
	};

	this.getVectorialSpeed = function(){

		return vars.speedV;
	};

	this.setElement = function(DOMElement){

		vars.element = DOMElement;
		return this;
	};

	this.getElement = function(){

		return vars.element;
	};

	this.setAcceleration = function(acceleration){

		vars.acceleration = acceleration;
		return this;
	};

	this.getAcceleration = function(){

		return vars.acceleration;
	};

	this.setAlpha = function(alpha){

		vars.alpha = alpha;
		return this;
	};

	this.getAlpha = function(){

		return vars.alpha;
	};

	this.setAlpha0 = function(alpha0){

		vars.alpha0 = alpha0;
		return this;
	};

	this.getAlpha0 = function(){

		return vars.alpha0;
	};

	this.setFriction = function(k){

		vars.setFriction = k;
		return this;
	};

	this.getFriction = function(){

		return vars.friction;
	};

	this.turnDirection = function(sDirection){

		switch(sDirection){

			case "right":
				vars.turn = 1;
				break;
			case "left":
				vars.turn = -1;
				break;
			case "forward":
			default:
				vars.turn = 0;
				break;

		}

		return this;
	};

	this.getTurn = function(){

		return vars.turn;
	};

	this.setGas = function(gas){

		vars.gas = gas;
		return this;
	};

	this.getGas = function(){

		return vars.gas;
	};

	function __construct(oOptions){

		that.setPropietary(oOptions.propietary);
		that.setColor(oOptions.color);
		that.setRadius(oOptions.radius);
		that.setPosition(oOptions.position);
		//that.setCenter({ x: oOptions.position.x + oOptions.radius, y: oOptions.position.y + oOptions.radius });
		that.setArea();

		return that;
	};

	__construct(oOptions);
};

//Calc distance between Ball and oBall. If euclidus, then distance is between centers
Ball.prototype.calcDistance = function(oBall,euclidus){

	euclidus = euclidus ? euclidus : false;

	var pos = this.getPosition();
	var pos2 = oBall.getPosition();
	var radius = this.getRadius();
	var radius2 = oBall.getRadius();

	var distance = Math.sqrt( Math.pow(pos2.x - pos.x,2) + Math.pow( pos2.y - pos.y,2) );
	
	if(!euclidus){
		distance -= (radius + radius2);
	}

	return distance;

};

//Check if collisions with an other Ball
//Return true if collisions, else false
Ball.prototype.collisionWithBall = function(oBall){

	var radius = this.getRadius();
	var radius2 = oBall.getRadius();
	return (this.calcDistance(oBall) <= (radius+radius2));
};

//Add the ball to the DOM Tree
//Optional parameter: eContainer = indicates if the ball must be injected to that container.
//If no parameter, then will be injected to body
Ball.prototype.spawn = function(eContainer){


	eContainer = eContainer ? eContainer : null;
	var pos = this.getPosition();
	var $p = this.getPropietary();

	//DOMElement Ball
	var eBall = document.createElement('div');

	eBall.setAttribute('id','ball-p-'+$p.getNum());
	eBall.setAttribute('data-propietary',$p.getNum());
	eBall.setAttribute('class','ball');

	$eBall = document.getElementById('ball-p-'+$p.getNum());
	//Ball CSSSTyleSheet
	var $bSt = null;

	if(!eContainer){
		eContainer = document.body;
	}

	//Check if ball exists in DOM. If not, inject it
	if(!$eBall){

		eContainer.appendChild(eBall);
		$eBall = document.getElementById('ball-p-'+$p.getNum());	

	}

	$bSt = $eBall.style;

	$bSt.width = (this.getRadius() * 2)+'px';
	$bSt.height = (this.getRadius() * 2)+'px';
	$bSt.backgroundColor = this.getColor();

	var oPos = {x:0,y:0};

	var x0 = this.getPosition().x;
	var y0 = this.getPosition().y;

	oPos.x = x0;
	oPos.y = y0;

	this.setPosition0(oPos);

	$bSt.top = y0+'px';
	$bSt.left = x0+'px';

	this.setElement($eBall);

	this.draw();
	return this;

};
//Draw the ball using HTML + CSS
//Optional parameter: eContainer = indicates if the ball must be injected to that container.
//If no parameter, then will be injected to body
Ball.prototype.draw = function(){
	
	$bSt = this.getElement().style;

	//Deberia restar el radio?...
	$bSt.top = this.getPosition().y - this.getRadius();
	$bSt.left = this.getPosition().x - this.getRadius();

	$bSt.backgroundColor = this.getColor();

	if(this.getAlpha()!==this.getAlpha0()){

		$bSt.style.transform = 'rotate3d(0,0,1,'+this.getAlpha()+'deg)';

		this.setAlpha0(this.getAlpha());
	}
	
	return this;
}

//Move the ball throught time
Ball.prototype.move = function(delta){

	var that = this;

	//Check if is turning
	if(this.turn){
		this.alpha += 4*this.turn;

		if(this.alpha >= 360){
			this.alpha -= 360; 
		}else if(this.alpha<0){
			this.alpha += 360;
		}
	}

	//Get alpha in radians
	var betaRad = (this.getAlpha()-90)*Math.PI/180;

	dir_x = Math.cos(betaRad);
	dir_y = Math.sin(betaRad);
	

	//Friction
	var oNewSpeed = null;
	oNewSpeed = this.getVectorialSpeed();

	oNewSpeed.x *= this.getFriction();
	oNewSpeed.y *= this.getFriction();

	this.setVectorialSpeed(oNewSpeed);
	
	
	//Check if is accelerating
	oNewSpeed = this.getVectorialSpeed();

	if(this.getGas()===1){
		oNewSpeed.x+=this.getAcceleration()/this.getFriction()/this.getFriction()*dir_x;
		oNewSpeed.y+=this.getAcceleration()/this.getFriction()/this.getFriction()*dir_y;
		this.setVectorialSpeed(oNewSpeed);
		this.setSpeed(Math.sqrt(this.getSpeed().x*this.getSpeed().x + this.getSpeed().y*this.getSpeed().y));
		if(this.getSpeed()>this.getMaxSpeed()) {

			oNewSpeed = this.getVectorialSpeed();

		 	oNewSpeed.x*=this.getMaxSpeed() / this.getSpeed();
		 	oNewSpeed.y*=this.getMaxSpeed() / this.getSpeed();

		 	this.setVectorialSpeed(oNewSpeed);
		}
	}

	var oNewPos = this.getPosition();

	oNewPos.x = this.getVectorialSpeed().x * delta / 25 + this.getPosition0().x;
	oNewPos.y = this.getVectorialSpeed().y * delta / 25 + this.getPosition0().y;

	this.setPosition(oNewPos);

	//Hit test here

	this.setPosition0(oNewPos);

	return this;

}