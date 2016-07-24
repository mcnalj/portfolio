// something's wrong with the moveRoutine addClass situation. I think
// it's loopeing through after the computer's move and trying to play????
// also turn on and off the clicks so it can't be broken by playing out 
// of turn.
$(document).ready(function() {
var turnCount = 1;
var xTurn;
var player = '';


$(".xButton, .yButton").click(function(){
	$(".start").fadeToggle(1400);
	if ($(this).text() == "X") {
		player = "X";
	} else {
		player = "O";
	}
	if (player == "X") {
		moveRoutine(player);		
	}
	else {
		setTimeout(function() {
		pickSquare(player);
		},
		1800);
	}
	return player; // do I need this
});

function moveRoutine(player) {
	console.log("This is player at moveRoutine: " + player);
	$(".xButton, yButton").off('click');
	$(".square").click(function() {
		if (!$(this).hasClass("closed")) {
			$(this).text(player);
			if (player == "X") {
				$(this).addClass("xPlayed closed");
				turnCount++; 
				checkVictory();
				xTurn = false;
				setTimeout(function(){
				pickSquare(player);
			}, 
			700);
				
			} else {
				$(this).addClass("yPlayed closed");
				turnCount++; 
				checkVictory();
				xTurn = true;
				setTimeout(function(){
				pickSquare(player);
			}, 
			700);
			}
		} 
	}); // end click	
}

function pickSquare(player) {
	if ($(".square").hasClass("victory")) {
		return;
	}
	var square = '';
	var choice = Math.floor((Math.random() * 9) + 1);
	switch (choice) {
		case 1: 
			square = "#one";
			break;
		case 2:
			square = "#two";
			break;
		case 3: 
			square = "#three";
			break;
		case 4:
			square = "#four";
			break;
		case 5: 
			square = "#five";
			break;
		case 6:
			square = "#six";
			break;
		case 7: 
			square = "#seven";
			break;
		case 8:
			square = "#eight";
			break;
		case 9: 
			square = "#nine";
			break;
	}

	if (player == "O" && !$(square).hasClass("closed")) {
		$(square).text("X");
		$(square).addClass("xPlayed closed");
		turnCount++
		checkVictory();
		xTurn = false;
		moveRoutine(player);

	} else if (player == "X" && !$(square).hasClass("closed")) {
		$(square).text("O");
		$(square).addClass("yPlayed closed");
		turnCount++
		checkVictory();
		xTurn = true;
		moveRoutine(player);

	} else {
		pickSquare(player);	
	}
}	

function checkVictory () {
if ($("#one").hasClass("xPlayed") && $("#two").hasClass("xPlayed") && $("#three").hasClass("xPlayed")) {
		$("#one, #two, #three").addClass("victory");
	} else if ($("#four").hasClass("xPlayed") && $("#five").hasClass("xPlayed") && $("#six").hasClass("xPlayed")) {
		$("#four, #five, #six").addClass("victory");
	} else if ($("#seven").hasClass("xPlayed") && $("#eight").hasClass("xPlayed") && $("#nine").hasClass("xPlayed")) {
		$("#seven, #eight, #nine").addClass("victory");
	} else if ($("#one").hasClass("xPlayed") && $("#four").hasClass("xPlayed") && $("#seven").hasClass("xPlayed")) {
		$("#one, #four, #seven").addClass("victory");
	} else if ($("#two").hasClass("xPlayed") && $("#five").hasClass("xPlayed") && $("#eight").hasClass("xPlayed")) {
		$("#two, #five, #eight").addClass("victory");
	} else if ($("#three").hasClass("xPlayed") && $("#six").hasClass("xPlayed") && $("#nine").hasClass("xPlayed")) {
		$("#three, #six, #nine").addClass("victory");
	} else if ($("#one").hasClass("xPlayed") && $("#five").hasClass("xPlayed") && $("#nine").hasClass("xPlayed")) {
		$("#one, #five, #nine").addClass("victory");
	} else if ($("#three").hasClass("xPlayed") && $("#five").hasClass("xPlayed") && $("#seven").hasClass("xPlayed")) {
		$("#three, #five, #seven").addClass("victory");
	} 
if ($("#one").hasClass("yPlayed") && $("#two").hasClass("yPlayed") && $("#three").hasClass("yPlayed")) {
		$("#one, #two, #three").addClass("victory");
	} else if ($("#four").hasClass("yPlayed") && $("#five").hasClass("yPlayed") && $("#six").hasClass("yPlayed")) {
		$("#four, #five, #six").addClass("victory");
	} else if ($("#seven").hasClass("yPlayed") && $("#eight").hasClass("yPlayed") && $("#nine").hasClass("yPlayed")) {
		$("#seven, #eight, #nine").addClass("victory");
	} else if ($("#one").hasClass("yPlayed") && $("#four").hasClass("yPlayed") && $("#seven").hasClass("yPlayed")) {
		$("#one, #four, #seven").addClass("victory");
	} else if ($("#two").hasClass("yPlayed") && $("#five").hasClass("yPlayed") && $("#eight").hasClass("yPlayed")) {
		$("#two, #five, #eight").addClass("victory");
	} else if ($("#three").hasClass("yPlayed") && $("#six").hasClass("yPlayed") && $("#nine").hasClass("yPlayed")) {
		$("#three, #six, #nine").addClass("victory");
	} else if ($("#one").hasClass("yPlayed") && $("#five").hasClass("yPlayed") && $("#nine").hasClass("yPlayed")) {
		$("#one, #five, #nine").addClass("victory");
	} else if ($("#three").hasClass("yPlayed") && $("#five").hasClass("yPlayed") && $("#seven").hasClass("yPlayed")) {
		$("#three, #five, #seven").addClass("victory");
	}
	if ($(".square").hasClass("victory") || turnCount == 10) {
		var win;
		if (turnCount == 10 && !$(".square").hasClass("victory")) {
			win = "IT'S A DRAW!";
		} else if (turnCount < 10 && xTurn == false) {
			win = "O WINS!";
		} else {
			win = "X WINS!"
		}
		$(".main").append("<div id='gameOver'><p>GAME OVER!</p></div>");
		$("#gameOver").animate(
			{
				marginLeft: '22.5%',
			},
		2500, function () {
			$("#gameOver p").html(win);
		 } 
		 ); // end animate
		$(".square").off('click');
		setTimeout(function() {
		$("#playAgain").text("PLAY AGAIN?");
		},
		4000);
		} 
}
$("#playAgain").click(function(){
	location.reload();
});
}); // end ready
//}); // end click



