var cWidth = 800;
var cHeight = 600;

var bgColor = "#EEEEFF"

var g = 9.81;

var calcRate = 60;

var collisionTresh = 10;

var c = document.getElementById("canvas");
ctx = c.getContext("2d");

c.width = cWidth;
c.height = cHeight;

var pixelsPerMeter = 10;

var rects = [
	//[accX,accY,velX,velY,posX,posY,width,height,color]
//	[0,g,0,0,100,50,80,50,"#3333EE"],
//	[0,g,50,0,200,100,50,40,"#EE33EE"],
	[0,0,0,0,0,300,cWidth,60,"#EE3333"],
	[0,0,0,0,200,50,60,50,"#3333EE"],
	[0,g/5,0,-30,180,250,50,40,"#33DD77"]
];

function addSquare(accX,accY,velX,velY,posX,posY,width,height,color){
	var newSquare = [accX,accY,velX,velY,posX,posY,width,height,color];
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
			if(	(rects[i][4] + rects[i][6] >= rects[j][4] && rects[i][4] <= rects[j][4] + rects[j][6]) &&
				(rects[i][5] + rects[i][7] >= rects[j][5] && rects[i][5] <= rects[j][5] + rects[j][7])){
				//console.log(i + " collides with " + j);
			}

			// On top
			if((rects[i][4] + rects[i][6] > rects[j][4] && rects[i][4] < rects[j][4] + rects[j][6]) &&
				rects[i][5] <= rects[j][5] + rects[j][7] && rects[i][5] >= rects[j][5] + rects[j][7] - collisionTresh){
				//console.log(i + " is on top of " + j);
				rects[j][3] = 0; // Remove all velY
				rects[j][1] = 0; // Remove all accY

				rects[j][5] = rects[i][5] - rects[j][7];
			}

			// Collides from the left ->#
			if((rects[i][5] + rects[i][7] >= rects[j][5] && rects[i][5] <= rects[j][5] + rects[j][7]) &&
				(rects[i][4] + rects[i][6] >= rects[j][4] && rects[i][4] + rects[i][6] <= rects[j][4] + collisionTresh)){
				//console.log(i + " is on top of " + j);
				if(rects[i][2] > 0){rects[i][2] = 0}; // Remove all velX
				rects[i][0] = 0; // Remove all accX

				rects[i][4] = rects[j][4] - rects[i][6];
				console.log(i + " is left of " + j);
			}

			// Collides from the right #<-
			if((rects[i][5] + rects[i][7] >= rects[j][5] && rects[i][5] <= rects[j][5] + rects[j][7]) &&
				(rects[i][4] <= rects[j][4] + rects[j][6] && rects[i][4] >= rects[j][4] + rects[j][6] - collisionTresh)){
				//console.log(i + " is on top of " + j);
				if(rects[i][2] < 0){rects[i][2] = 0}; // Remove all velX
				rects[i][0] = 0; // Remove all accX

				rects[i][4] = rects[j][4] + rects[j][6];
				console.log(i + " is left of " + j);
			}

			// Underneath
			if((rects[i][4] + rects[i][6] > rects[j][4] && rects[i][4] < rects[j][4] + rects[j][6]) &&
				rects[i][5] <= rects[j][5] + rects[j][7] && rects[i][5] >= rects[j][5] + rects[j][7] - collisionTresh){
				console.log(i + " is under " + j);
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
