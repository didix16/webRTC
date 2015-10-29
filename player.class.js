
/*Player class */

var Player = function(oOptions){
	
	//Private vars
	var that = this;
	var vars = {

		name : '',
		num: 0,
		position: new Position(
			{
				x: 0,
				y: 0
			}
		),
	};

	//Private constructor
	function __construct(oOptions){

		that.setName(oOptions.name ? oOptions.name : "Player"+oOptions.num);
		that.setNum(oOptions.num);

		//At the moment not used
		//that.setPosition(oOptions.position);
	};

	//public functions
	
	this.setName = function(_name){

		vars.name = _name;
		return this;
	};

	this.getName = function(){

		return vars.name;
	};

	this.setNum = function(_num){

		vars.num = _num;
		return this;
	};

	this.getNum = function(){
		return vars.num;
	};

	this.setPosition = function(oPos){

		vars.position.setX(oPos.x);
		vars.position.setY(oPos.y)
		return this;
	};

	this.getPosition = function(){

		return vars.position;
	}

	__construct(oOptions);
};

/* Position class */

var Position = function(oPoint){

	this.x = oPoint.x;
	this.y = oPoint.y;

	this.getX = function(){

		return this.x;
	};

	this.setX = function(x){

		this.x = x;
	};

	this.getY = function(){

		return this.y;
	};

	this.setY = function(y){

		this.y = y;
	};
}