$(document).ready(function(){

//  *** Beginning of drawing the game. ***

// Get canvas and "2d" context.
var canvas = document.getElementById("gameConsole");
var context = canvas.getContext("2d");

// Draw the base of the console.
context.beginPath();
context.arc(400, 340, 318, 0, Math.PI*2);
context.fillStyle = "Black";
context.fill();
context.strokeStyle = "Black";
context.stroke();

// This is the key object. audioKey is the id of the html audio element
function Key(startingAngle, endingAngle, thirdX, thirdY, color, gradient, audioKey, isSelected) {
	this.centerX = 400;
	this.centerY = 340;
	this.radius = 140;
	this.bigRadius = 303;
	this.startingAngle = startingAngle;
	this.endingAngle = endingAngle;
	this.thirdX = thirdX;
	this.thirdY = thirdY;
	this.color = color;
	this.gradient = gradient;
	this.audioKey = document.getElementById(audioKey); 
	this.isSelected = false;
}

// Construct the four keys.
var redKey = new Key(((1.5 * Math.PI) + 0.05 ), (0 - 0.05), (this.centerX + this.bigRadius), this.centerY, "hsla(0, 100%, 45%, 1.0)", "hsla(0, 100%, 70%, 1.0)", "redAudio");
var blueKey = new Key((0 + 0.05), ((0.5 * Math.PI)- 0.05), this.centerX, (this.centerY + this.bigRadius), "hsla(240, 100%, 45%, 1.0)", "hsla(240, 100%, 60%, 1.0)", "blueAudio");
var yellowKey = new Key(((0.5 * Math.PI) + 0.05), ((1 * Math.PI) - 0.05), (this.centerX - this.bigRadius), this.centerY, "hsla(60, 100%, 45%, 1.0", "hsla(60, 100%, 70%, 1.0)", "yellowAudio");
var greenKey = new Key(((1 * Math.PI) + 0.05), ((1.5 * Math.PI) - 0.05), this.centerX, (this.centerY - this.bigRadius), "hsla(90, 100%, 25%, 1.0", "hsla(90, 100%, 60%, 1.0)", "greenAudio");

// The function for drawing the keys takes a Key object (eg. redKey) as its argument.
function drawKey(Key) {
	context.beginPath();
	context.arc(Key.centerX, Key.centerY, Key.radius, Key.startingAngle, Key.endingAngle);
	context.lineTo(Key.thirdX, Key.thirdY);
	context.arc(Key.centerX, Key.centerY, Key.bigRadius, (Key.endingAngle + 0.027) , (Key.startingAngle - 0.027), true);
	context.closePath();
	if (Key.isSelected == true) {
		context.fillStyle = Key.gradient;
	} else {
		context.fillStyle = Key.color;
	}
	context.fill();
	context.strokeStyle = Key.color;
	context.stroke();
}

// Draw each key.
drawKey(redKey);
drawKey(blueKey);
drawKey(yellowKey);
drawKey(greenKey);

// Draw the green start button.
context.beginPath();
context.arc(435, 375, 13, 0, Math.PI*2);
context.fillStyle = "LightGreen";
context.fill();
context.strokeStyle = "LightGreen";
context.stroke();

// Draw the turn counter (so it exists before pressing play).
context.beginPath();
context.moveTo(385, 355);
context.lineTo(385, 395);
context.lineTo(345, 395);
context.lineTo(345, 355);
context.closePath();
context.fillStyle = "Gray";
context.fill();
context.strokeStyle = "Black";
context.stroke();

// Add the SiMON label.
context.font = "bold 70px Arial";
context.textBaseline = "top";
context.fillStyle = "Gray";
context.fillText("SIMON", 282, 270);

// Add the START/RESET label.
context.font = "bold 12px Arial";
context.textBaseline = "top";
context.fillStyle = "Gray";
context.fillText("START/RESET", 395, 395);

// Add YOU WIN!
function drawWinner() {
context.font = "bold 30px Arial";
context.textBaseline = "top";
context.fillStyle = "White";
context.fillText("YOU WIN!", 335, 410);
}
// *** End of drawing the game. ***
// *** Beginning of the game play. ***

// "Play" a key.
function playKey(keyColor) {
// Draw a lighted (="played) key.
	keyColor.isSelected = true;
	drawKey(keyColor);
	keyColor.isSelected = false;
	keyColor.audioKey.play();
// Redraw the unlighted key.
	setTimeout(function(){
		drawKey(keyColor);
	},
	300);
}

var count = 0, // the number of turns successfully completed by the player
	sequence = [], // an array of SiMON's randomly generated moves
	i = 0, // the position  in SiMON's array of moves 
	move; // an individual move in the array of SiMON's moves

// Generate the array of Simon's moves.
function establishSequence() {
		var choice = Math.floor((Math.random() * 4) + 1);
		sequence.push(choice);
};

// Play Simon's sequence of moves with a delay before each one.
function myLoop() {
	var timer = 1200;
		if (count >= 5 && count < 9) {
			timer = 1000;
		} else if (count >= 9 && count < 13) {
			timer = 800;
		} else if (count >= 13) {
			timer = 600;
		}

	setTimeout(function() {


// Draw the turn counter box here so it is a clean slate for the turn count. Make it a function.
		context.beginPath();
		context.moveTo(385, 355);
		context.lineTo(385, 395);
		context.lineTo(345, 395);
		context.lineTo(345, 355);
		context.closePath();
		context.fillStyle = "Gray";
		context.fill();
		context.strokeStyle = "Black";
		context.stroke();

// Text the count to the turn counter.
		context.font = "bold 25px Arial";
		context.textBaseline = "top";
		context.fillStyle = "Black";
// Place a leading zero before turns < 10.
		var score;
		if (count < 10) {
				score = "0" + count;
		} else {
				score = count;
		}
		context.fillText(score, 350, 362);

// Play keys based on the random numbers stored in sequence.
// Disable clicks while this is happening.
		move = sequence[i];
			switch (move) {
				case 1:
					playKey(redKey);
					break;
				case 2:
					playKey(blueKey);
					break;
				case 3:
					playKey(yellowKey);
					break; 
				case 4:
					playKey(greenKey); 
					break;
				default:
					break;
			} // end switch

		i++;
		if (i < sequence.length) {
				myLoop();
			}
	}, 
	timer); // end setTimeout;
} // end myLoop


// Listen for a key click (or the start button).
var j = 0; // moves to the next play in the sequence loop after a click;
$("canvas").click(function(e){
	var clickX = e.pageX - canvas.offsetLeft;
	var clickY = e.pageY - canvas.offsetTop;
	var playAudio;
	var answer = []; // Do I need this?
	var identity;

// Check to see if the click was the start/reset button.
	var distanceFromCenter = 
		Math.sqrt(Math.pow(435 - clickX, 2) + Math.pow(375 - clickY,2));
	if(distanceFromCenter < 13) {
	// Start/reset the game.
		turn = 0;
		count = 0;
		sequence = [];
		i = 0;

		establishSequence();
		myLoop();
		return;
	} else {
	// Check to see which key was pressed.		
		distanceFromCenter =
			Math.sqrt(Math.pow(400 - clickX, 2) + Math.pow(340 - clickY, 2));
		if(distanceFromCenter > 140 && distanceFromCenter < 303) {
			if (clickX > 400) {
				if (clickY < 340) {
					whichKey = redKey
					playAudio = document.getElementById("redAudio"); // can this be jQuery
					identity = 1; // do I need identity?
					answer.push(1);
				} else {
					whichKey = blueKey;
					playAudio = document.getElementById("blueAudio");
					identity = 2;
					answer.push(2);
				}
				} else if (clickY > 340) {
					whichKey = yellowKey;
					playAudio = document.getElementById("yellowAudio");
					identity = 3;
					answer.push(3);
			} else {  
				whichKey = greenKey;
				playAudio = document.getElementById("greenAudio");
				identity = 4;
				answer.push(4);		
			}
		}
	} // end of "if sequence" that determines which key was pressed
// Draw a played (lighter) key and the audio
	whichKey.isSelected = true;
	drawKey(whichKey);
	whichKey.audioKey.play();
// Pause and redraw the original key.
	whichKey.isSelected = false;
		setTimeout(function(){
			drawKey(whichKey)
		},
		300);

//Test the key played against the answer sequence.
console.log("What is identity: " + identity);
console.log("What is j: " + j);
console.log("What is sequence.length -1: " + (sequence.length - 1));
console.log("What is sequence[j]: " + sequence[j]);
// If play is correct, move play in the sequence and wait for a click.
	if (identity == sequence[j] && j < (sequence.length - 1)) {
		j++;
// If all the plays have been played, add another.
	} else if (identity == sequence[j] && j == (sequence.length - 1)) { 
// Add another randomly generated key to SiMON's sequence.
		i = 0;
		j = 0;
		var add = Math.floor((Math.random() * 4) + 1);
		sequence.push(add);
		count++;
		if (count <= 20) {
			myLoop();
// If the player has made 20 successful moves, draw "YOU WIN!" and freeze game.
		} else {
			drawWinner();
			$("canvas").off("click");
		}
	} else {
// Play the losing sound.
		setTimeout(function() {
			document.getElementById("redAudio").play();
		},
		700);
		setTimeout(function() {
			document.getElementById("blueAudio").play();
		},
		900);
		setTimeout(function() {
			document.getElementById("yellowAudio").play();
		},
		1100);
		setTimeout(function() {
		document.getElementById("greenAudio").play();
		},
		1300);
// Replay the correct sequence.

		setTimeout(function() {
			i = 0;
			j = 0;
			myLoop();
		}, 
		3000); // end timeout
	}

// Stop searching.
	return;
}); // end click








/* This is the info for the red gradient
var centerX = 150;
var centerY = 300;
var radius = 100;
var startingAngle = 1.5 * Math.PI;
var endingAngle = 0;

var gradient = context.createRadialGradient(250, 200, 0, 250, 200, 400);
gradient.addColorStop(0, "hsla(0, 100%, 60%, .5)");
gradient.addColorStop(1, "hsla(0, 100%, 50%, 1.0)"); 

context.arc(centerX, centerY, radius, startingAngle, endingAngle);
context.lineTo(350, 300);
context.arc(centerX, centerY, 200, 0, 1.5 * Math.PI, true);
context.closePath(); 


context.fillStyle = gradient;
context.fill();
context.lineWidth = 4;
context.strokeStyle =  "hsla(0, 100%, 60%, .5)"


context.stroke();

*/

}); // end ready

