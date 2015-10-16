var cWidth = 800;
var cHeight = 600;

var left = false;
var right = false;
var up = false;
var down = false;

var bgColor = "#EEEEFF"

var g = 9.81;

var calcRate = 60;

var collisionTresh = 10;

var maxVelX = 30;

var playerAcc = 15;

var c = document.getElementById("canvas");
ctx = c.getContext("2d");

c.width = cWidth;
c.height = cHeight;

var pixelsPerMeter = 10;

var rects = [
	//[accX,accY,velX,velY,posX,posY,width,height,color,fixed]
//	[0,g,0,0,100,50,80,50,"#3333EE"],
//	[0,g,50,0,200,100,50,40,"#EE33EE"],
	[0,g,0,0,400,200,20,50,"#33DD77",false],
	[0,0,0,0,0,300,cWidth,60,"#EE3333",true],
	[0,0,0,0,200,50,60,50,"#3333EE",false],
	[0,g/5,0,-30,180,250,50,40,"#33DD77",false]
];

var player = rects[0];

function addSquare(accX,accY,velX,velY,posX,posY,width,height,color,fixed){
	var newSquare = [accX,accY,velX,velY,posX,posY,width,height,color,fixed];
	rects.push(newSquare);
}

function background(){
	ctx.fillStyle = bgColor;
	ctx.fillRect(0,0,cWidth,cHeight);
}

function calcCollisions(){
	for (var i = 0; i < rects.length; i++) {
		for (var j = 0; j < rects.length; j++) {
			if(j == i){ continue; } // Don't calculate collision of the same element
			//console.log("Does " + i + "(i) collide with " + j + "(j)?");

			// Check if the squares hare similar coordinates for x or y coordinates

			// General collision
			/*if(	(rects[i][4] + rects[i][6] >= rects[j][4] && rects[i][4] <= rects[j][4] + rects[j][6]) &&
				(rects[i][5] + rects[i][7] >= rects[j][5] && rects[i][5] <= rects[j][5] + rects[j][7])){
				//console.log(i + " collides with " + j);
			}*/

			// On top
			if((rects[i][4] + rects[i][6] > rects[j][4] && rects[i][4] < rects[j][4] + rects[j][6]) &&
				rects[i][5] < rects[j][5] + rects[j][7] && rects[i][5] > rects[j][5] + rects[j][7] - collisionTresh){
				//console.log(i + " is on top of " + j);
				if(rects[j][3] > 0){rects[j][3] = 0}; // Remove all velY
				if(rects[j][1] > 0){rects[j][1] = 0}; // Remove all accY

				rects[j][5] = rects[i][5] - rects[j][7];
			}else{
				if(!rects[j][9]){rects[j][1] = g};
			}

			// Collides from the left ->#
			if((rects[i][5] + rects[i][7] > rects[j][5] && rects[i][5] < rects[j][5] + rects[j][7]) &&
				(rects[i][4] + rects[i][6] > rects[j][4] && rects[i][4] + rects[i][6] < rects[j][4] + collisionTresh)){
				if(rects[i][2] > 0){rects[i][2] = 0}; // Remove all velX
				if(rects[i][0] > 0){rects[i][0] = 0}; // Remove all accX

				rects[i][4] = rects[j][4] - rects[i][6];
			}

			// Collides from the right #<-
			if((rects[i][5] + rects[i][7] > rects[j][5] && rects[i][5] < rects[j][5] + rects[j][7]) &&
				(rects[i][4] < rects[j][4] + rects[j][6] && rects[i][4] > rects[j][4] + rects[j][6] - collisionTresh)){
				if(rects[i][2] < 0){rects[i][2] = 0}; // Remove all velX
				if(rects[i][0] < 0){rects[i][0] = 0}; // Remove all accX

				rects[i][4] = rects[j][4] + rects[j][6];
			}

			// Underneath
			if((rects[i][4] + rects[i][6] > rects[j][4] && rects[i][4] < rects[j][4] + rects[j][6]) &&
				rects[i][5] < rects[j][5] + rects[j][7] && rects[i][5] > rects[j][5] + rects[j][7] - collisionTresh){
				if(rects[i][3] < 0){rects[i][3] = 0}; // Remove all velY
				if(rects[i][1] < 0){rect[i][1] = 0}; // Remove all accY

				rects[i][5] = rects[j][5] + rects[j][7];
			}

			// Similar x-coordinates
			//if(rect[i][4] + rect[i][6])
		};
	};
}

function calcRects(){
	for (var i = 0; i < rects.length; i++) {
		rects[i][2] += rects[i][0] * pixelsPerMeter / calcRate; // Increase velX by accX
		rects[i][3] += rects[i][1] * pixelsPerMeter / calcRate; // Increase velY by accY

		rects[i][4] += rects[i][2] * pixelsPerMeter / calcRate; // Increase posX by velX
		rects[i][5] += rects[i][3] * pixelsPerMeter / calcRate; // Increase posY by velY
	};
}

// Left
document.addEventListener("keydown", function(event){
	if(event.keyCode == 37){
		left = true;
	}
},false);
document.addEventListener("keyup", function(event){
	if(event.keyCode == 37){
		left = false;
	}
},false);

// Up
document.addEventListener("keydown", function(event){
	if(event.keyCode == 38){
		up = true;
	}
},false);
document.addEventListener("keyup", function(event){
	if(event.keyCode == 38){
		up = false;
	}
},false);

// Right
document.addEventListener("keydown", function(event){
	if(event.keyCode == 39){
		right = true;
	}
},false);
document.addEventListener("keyup", function(event){
	if(event.keyCode == 39){
		right = false;
	}
},false);

// Down
document.addEventListener("keydown", function(event){
	if(event.keyCode == 40){
		down = true;
	}
},false);
document.addEventListener("keyup", function(event){
	if(event.keyCode == 40){
		down = false;
	}
},false);

function checkControls(){
	if(left){
		// Accelerate to the left
		if(player[2] <= maxVelX && player[2] >= -1 * maxVelX){
			player[0] = -1 * playerAcc;
		}
	}else{
		if(player[0] < 0){player[0] = 0};
	}

	if(up){
		// Jump
		// Add velocity upwards
		player[3] = -30;
	}

	if(right){
		// Accelerate to the right
		if(player[2] < maxVelX && player[2] >= -1 * maxVelX){
			player[0] = playerAcc;
		}
	}else{
		if(player[0] > 0){player[0] = 0};
	}


	if(player[2] > maxVelX){
		player[2] = maxVelX;
	}

	if(player[2] < -1 * maxVelX){
		player[2] = -1 * maxVelX;
	}

	if(down){
		console.log("down");
	}
}

function drawRects(){
	for (var i = 0; i < rects.length; i++) {
		ctx.fillStyle = rects[i][8]; // Set color
		ctx.fillRect(rects[i][4],rects[i][5],rects[i][6],rects[i][7]); // Draw rectangle
	};
}

// Draw loop
function draw(){
	requestAnimationFrame(draw);

	background();
	drawRects();
}

function calc(){
	checkControls();
	calcCollisions();
	calcRects();
}

// Calculation tick
window.setInterval(function(){
	calc();
},1000/calcRate);

window.onload = function(){
	draw();
}
