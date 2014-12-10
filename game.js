Array.prototype.indexOf = function (searchElement , fromIndex) {
	var i,
		pivot = (fromIndex) ? fromIndex : 0,
		length;

	if (!this) {
	  throw new TypeError();
	}

	length = this.length;

	if (length === 0 || pivot >= length) {
	  return -1;
	}

	if (pivot < 0) {
	  pivot = length - Math.abs(pivot);
	}

	for (i = pivot; i < length; i++) {
	  if (this[i] === searchElement) {
		return i;
	  }
	}
	return -1;
  };

var i=0;
var y=0;
var fps = 120;
var direction_vertical = 0;
var direction_horizontal = 0;
var center = [500, 250];
var img = new Image();      // Новый объект
img.src = 'sprites.png';    // Путь к изобра
var movotov = new Image();
movotov.src = 'molotov.gif';
var world_res = new Image();
world_res.src = 'platform1.png';
var molotovs = [];
function Molotov(x,y){
	this.speed = 620;
	this.x=x;
	this.y=y;
	this.s_x = x;
	this.s_y = y;
	this.delay = 5;
	this.toNextFrame=0;
	this.rotation = 0;
	this.len = 500;
	this.height;
	this.state =  'flying';
	
}
Molotov.prototype={
	render : function(x){
		if (this.toNextFrame==0){
			this.rotation+=15;
			
			this.toNextFrame=this.delay;
		} else {
			this.toNextFrame--;
		}
		
		x.save();
		x.setTransform(1,0,0,1,0,0);
		x.translate(this.x+5, this.y+15)
		
		var angleInRadians = this.rotation * Math.PI / 180;
		x.rotate(angleInRadians);
		x.drawImage(movotov, 0,0,31,92,-5,-15,10,30);
		x.restore();
	},
	update : function(){
		if (this.x>0){
			//пуля просто летит 
			var s = Math.round(this.speed/fps);
			this.x-=s;
			/*if (this.len/2>this.s_x-this.x){
				
				this.y=this.s_y-Math.sqrt(this.x);
			} else if (this.len/2<this.s_x-this.x){
			this.y=this.s_y+Math.sqrt(this.x);*/
			/*
			console.log('down');
				var b = this.len-this.x;
				var c = 2*(b);
				var l = Math.round(Math.sqrt(Math.pow(c,2)-Math.pow(b,2)));
				this.y = this.s_y+l;*/
		} else{
			if (this.state!='exploding'){
				this.state = 'exploding';
			} else if (this.state=='exploding'){
				
			}
		}

			
		
		
	}
}


var world = {
	tile_width:32,
	tile_height:32,
	y:0,
	x:0,
	map : [
		   [35,35,35,35,35,35,35,35,35, 35, 35, 35, 35, 35, 35,35, 35,35,35,35,35,35,35,35,35,35, 35, 35,35,35, 35],
		   [35,93,94,95,35,35,35,35,96, 97, 98, 99, 100, 101, 35,35, 35,35,93,94,95,35,35,35,35,96, 97, 35,98,99, 100],
		   [35,35,35,35,35,35,35,35,35, 35, 35, 35, 35, 35, 35,35, 35,35,35,35,35,35,35,35,35,35, 35, 35,35,35, 35],
		   [35,35,35,35,35,35,35,35,35, 35, 35, 35, 35, 35, 35,35, 35,35,35,35,35,35,35,35,35,35, 35, 35,35,35, 35],
		   [35,35,35,35,35,35,35,35,35, 35, 35, 35, 35, 35, 35,35, 35,35,35,35,35,35,35,35,35,35, 35, 35,35,35, 35],
		   [35,35,35,35,35,35,35,35,35, 35, 35, 35, 35, 35, 35,35, 35,35,35,35,35,35,35,35,35,35, 35, 35,35,35, 35],
		   [35,35,35,35,35,35,35,35,35, 35, 35, 35, 35, 35, 35,35, 35,35,35,35,35,35,35,35,35,35, 35, 35,35,35, 35],
		   [35,35,35,35,35,35,35,35,35, 35, 35, 35, 35, 35, 35,35, 35,35,35,35,35,35,35,35,35,35, 35, 35,35,35, 35],
		   [35,35,35,35,35,35,35,35,35, 126, 127, 128, 129, 130, 131,132, 35,35,35,35,35,35,35,35,35,35, 35, 35,35,35, 35],
		   [35,35,35,35,35,35,35,35,35, 35, 108, 108, 108, 108, 108,35, 35,35,35,35,35,35,35,35,35,35, 35, 35,35,35, 35],
		   [103,103,103,103,103,103,103,103,103, 103, 103, 103, 103, 103, 103,103, 103,103,103,103,103,103,103,103,103,103, 103, 103,103,103, 103],
		   [35,35,35,35,35,35,35,35,35, 35, 35, 35, 35, 35, 35,35, 35,35,35,35,35,35,35,35,35,35, 35, 35,35,35, 35],
		   [35,35,35,35,35,35,35,35,35, 35, 35, 35, 35, 35, 35,35, 35,35,35,35,35,35,35,35,35,35, 35, 35,35,35, 35],
		   [35,35,35,35,35,35,35,35,35, 35, 35, 35, 35, 35, 35,35, 35,35,35,35,35,35,35,35,35,35, 35, 35,35,35, 35],
		   [35,35,35,35,35,35,35,35,35, 35, 35, 35, 35, 35, 35,35, 35,35,35,35,35,35,35,35,35,35, 35, 35,35,35, 35],
		   [35,35,35,35,35,35,35,35,35, 35, 35, 35, 35, 35, 35,35, 35,35,35,35,35,35,35,35,35,35, 35, 35,35,35, 35]
		   ],
	render:function(x){
		for (var i=0;i<15;i++){
			for (j=0;j<40;j++){
			
				var s_x = Math.floor(this.map[i][j]%18)*this.tile_width+2*Math.floor(this.map[i][j]%18);
				var s_y = Math.floor(this.map[i][j]/18)*this.tile_height+2*(Math.floor(this.map[i][j]/18));
			
				//x.drawImage(world_res, s_x,s_y,this.tile_width,this.tile_height,this.x+this.tile_width*i,this.y+this.tile_height*j,this.tile_width,this.tile_height);
				var x_d = this.x+this.tile_width*j-1;
				var y_d = this.y+this.tile_height*i;
				//console.log('i='+i+', j='+j+' x='+x_d+' y='+y_d );
				//console.log(this.map[i][j]+' i='+i+', j='+j+' s_x='+s_x+' s_y='+s_y );
				x.drawImage(world_res, s_x,s_y,this.tile_width,this.tile_height,x_d,y_d,this.tile_width,this.tile_height);
				
				
			}
		}
	}		
}
var circle = {
	x : 500,
	y : 246,
	speed: 700,
	jump_height:200,
	jump_speed:80,
	state:'stand',
	direction_move:1,
	direction_jump:1,
	indexes:[],
	cur_index:0,
	toNextFrame:0,
	pushed:0,
	
	is_flying_move:false,
	flying_move_speed:80,
	/*
	параметры героя
	*/
	w:48,
	h:74,
	/*
	параметры спрайтспета
	*/
	//отступы
	s_x :135,
	s_y : 23,
	is_on_ground:function(){
		//найти крайние координаты ноги
		
		
	},
	shot:function(){
		var m = new Molotov(this.x, this.y+this.h/2);
		molotovs.push(m);
	},
	start_move : function(direction){
		if (this.state!='walk' && this.state!='jumping'){
			this.direction_move = direction;
			this.state = 'walk';
			this.indexes = [203, 265, 326, 391];
			this.cur_index = 0;
			this.toNextFrame=0;
		}
		if (this.state=='jumping'){
			this.flying_move(direction);
		}
	},
	flying_move:function(direction){
		if(this.is_flying_move==false){
			this.direction_move = direction;
			this.is_flying_move=true;
		} 
	},
	flying_move_disable:function(){
		if(this.is_flying_move==true){
			this.is_flying_move=false;
		}
	},
	start_jump:function(){
		if (this.state!='jumping'){
			if (this.state=='walk'){
				this.flying_move(this.direction_move);
			}
			this.state = 'jumping';
			this.direction_jump = 1;
			this.pushed=1;
			this.indexes = [13, 72];
			this.cur_index = 0;
			this.toNextFrame=0;
		}
		
	},
	stop:function(){
		if (this.state!=='jumping'){
			this.state = 'stand';
			this.indexes = [135];
		} else {
			this.flying_move_disable();
		}

	},
	move:function(direction, delay){
		/*directions:
		1-top
		2-right
		3-bottom
		4-left
		*/
		if (this.toNextFrame==0){//меняем кадр
			this.s_x = this.indexes[this.cur_index];
			if (this.cur_index==this.indexes.length-1){

				this.cur_index = 0;

			} else {
				this.cur_index++;
			}
			
			this.toNextFrame = delay;
		} else {
			this.toNextFrame--;
		}
		var s = Math.round(this.speed/fps);
		
		switch (direction){
			case 1: this.y-=s; break;
			case 2: this.x+=s;break;
			case 3: this.y+=s;break;
			case 4 : this.x-=s;break;
			default:
			break;
		}
	},
	jump:function(direction, delay){
		
			//console.log(this.x+' '+this.y);
			if (this.toNextFrame==0 && this.pushed==1){
				this.s_x = this.indexes[this.cur_index];
				this.toNextFrame=delay;
				this.cur_index++;
				this.pushed=0;
				console.log('pushed');
			} else if (this.toNextFrame==0 && this.pushed==0){
				console.log('flying');
				this.s_x = this.indexes[this.cur_index];
			} 
				this.toNextFrame--;
			
			
			
			if(this.is_flying_move==true){
				console.log('flying move');
				var s = Math.round(this.flying_move_speed/fps);
					switch (this.direction_move){
					case 2: this.x+=s;break;
					case 4 : this.x-=s;break;
					default:
					break;
				}
			}
			
				
	
			var l = Math.round(this.speed/fps);
			if (direction==1){
				if (this.y>245-this.jump_height){
					
					this.y -= l; 
				} else {
					this.direction_jump = 0;
				}
			} else if(direction==0){
				if (this.y<245){
					this.y += l; 
				} else {
					this.flying_move_disable();
					this.state = 'stand';
				}
			}
		


	},
	update:function(){

		
		if (this.state!='stand'){
			if (this.state=='walk'){
				this.move(this.direction_move, 5);
			} else if(this.state=='jumping'){
				this.jump(this.direction_jump, 5);
			}
		
		} else {
			this.s_x=135;
		}

	},
	render : function(x){
		//drawImage(img, this.x, this.y);
		x.drawImage(img, this.s_x, this.s_y, this.w, this.h, this.x, this.y, this.w, this.h);

		/*x.drawImage(img, this.s_x, this.s_y, this.w, this.h, this.x+50, this.y+50, this.w, this.h);
		x.drawImage(img, this.s_x, this.s_y, this.w, this.h, this.x+150, this.y+60, this.w, this.h);
		x.drawImage(img, this.s_x, this.s_y, this.w, this.h, this.x+200, this.y+80, this.w, this.h);*/
// Первый параметр указывает на изображение
// sx, sy, sWidth, sHeight указывают параметры фрагмента на изображение-источнике
// dx, dy, dWidth, dHeight ответственны за координаты отрисовки фрагмента на холсте
		/*x.beginPath();
		x.fillStyle = '#000';
		x.arc(this.x,this.y,20,0,Math.PI*2, true);
		x.closePath();
		x.fill();*/
	}
};
window.onload = function(){
	document.onkeydown =checkKeycode_down;
	document.onkeyup =checkKeycode_up;
	var canvas=document.getElementById("canvas");;
	var x=canvas.getContext("2d");

	var g=x.createLinearGradient(0,0,1008,500);
	g.addColorStop(0,"white");
	g.addColorStop(1,"black");
	x.fillStyle=g;
	x.fillRect(0,0,canvas.width,canvas.height);
		/*x.strokeRect(150,70,55,55);
		x.clearRect(68,57,20,20); */

/*	x.beginPath();
	x.fillStyle = '#000';
	x.arc(0,0,20,0,Math.PI*2, true);
	x.closePath();
	x.fill();*/
	circle.render(x);


	setInterval(function(){
		//update(100, fps);
		update();
		
		render(x, g);
	}, 1000/fps);
}

	function update(){
	//каждый объект должен за один кадр поменят свое состояние
		//пока у на столько один обьект  - круг
		circle.update();
			for(var i=0; i<molotovs.length; i++){
			molotovs[i].update();
		}
	}

	/*function update (speed, fps){
		var s = speed/fps;

		if (direction_vertical==0 && direction_horizontal==0){
			i+=s;
			y+=s;
		} else if (direction_vertical==1 && direction_horizontal==0){
			i+=s;
			y-=s;
		} else if (direction_vertical==1 && direction_horizontal==1){
			i-=s;
			y-=s;
		} else if (direction_vertical==0 && direction_horizontal==1){
			i-=s;
			y+=s;
		}
		
		i_dot = Math.round(i);
		y_dot = Math.round(y);
		//Смена направления
		if (y_dot+20>=500){
			
			direction_vertical=1;
			console.log('up');
		}
		if (y_dot-20<=0){
			direction_vertical=0;
			console.log('down');
		}
		if (i_dot+20>=1000){
			direction_horizontal=1;
			console.log('left');
		}
		if (i_dot-20<=0){
			direction_horizontal=0;
			console.log('right');
		}
	}*/
	function render(x, g){
		
		i_dot = Math.round(i);
		y_dot = Math.round(y);

		x.fillStyle=g;
		x.fillRect(0,0,canvas.width,canvas.height);
		world.render(x);
		circle.render(x);
		for(var i=0; i<molotovs.length; i++){
			molotovs[i].render(x);
		}
		
/*		x.beginPath();
		x.fillStyle = '#000';
		x.arc(i_dot,y_dot,20,0,Math.PI*2, true);
		x.closePath();

		x.fill();*/
	}

function checkKeycode_down(event) // 
{
	var keycode;
	if(!event) var event = window.event;
	if (event.keyCode) keycode = event.keyCode; // IE
	else if(event.which) keycode = event.which; // all browsers
	switch (keycode){
	//case 38: circle.start_move(1);break;
	case 39: circle.start_move(2);break;
	//case 40: circle.start_move(3);break;
	case 37: circle.start_move(4);break;
	case 32: circle.start_jump();break;
	case 68: circle.shot();break;
	default: console.log(keycode);
	break;
	}
	
}	

function checkKeycode_up(event) // 
{
	var keycode;
	if(!event) var event = window.event;
	if (event.keyCode) keycode = event.keyCode; // IE
	else if(event.which) keycode = event.which; // all browsers
	switch (keycode){
	case 38: circle.stop();break;
	case 39: circle.stop();break;
	case 40: circle.stop();break;
	case 37: circle.stop();break;
	case 32: break;
	default: console.log(keycode);
	break;
	}
	
}	