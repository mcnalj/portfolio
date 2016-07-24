
$(document).ready(function () {
	var screenArray = [],
		storedNumber = [],
		firstArray = [],
		secondArray = [],
		firstNum = '',
		secondNum = '',
		operators = {
			"/": function(a, b) { return a / b },
			"x": function(a, b) { return a * b },
			"-": function(a, b) { return a - b },
			"+": function(a, b) { return a + b }
		},
		op = '',
		answer = null,
		previous = 'num',
		first = true,
		mostRecent = '',
		recentNum = 0,
		allClear = false;

// Darken the background on mousedown and return (slowly) on mousup.
$(".number, .decimal").on({'mousedown' : numberPress, 'mouseup' : numberRelease });
$(".misc").on({'mousedown' : miscPress, 'mouseup' : miscRelease });
$(".operator, .equals").on({'mousedown' : opPress, 'mouseup' : opRelease });

function numberPress() {
	$(this).addClass("pressedNum");
}

function numberRelease() {
	var selector = $(this);
	setTimeout(function () {
		selector.removeClass("pressedNum")
	},
	200);
}

function miscPress() {
	$(this).addClass("pressedMisc");
}

function miscRelease() {
	var selector = $(this);
	setTimeout(function () {
		selector.removeClass("pressedMisc")
	},
	200);
}

function opPress() {
	$(this).addClass("pressedOp");
}

function opRelease() {
	var selector = $(this);
	setTimeout(function () {
		selector.removeClass("pressedOp")
	},
	200);
}

function displayTime() {
	var now = new Date();
	var hour = now.getHours();
	var minutes = now.getMinutes();
	var am_pm;
	if (hour < 12) {
		am_pm = "AM";
	} else {
		am_pm = "PM";
	}
	hour = hour % 12;
	if (hour == 0) {
		hour = 12;
	}

	$("#time").text(hour + ":" + minutes + " " + am_pm);
}

// format the display, shrink to fit on screen
function display(arg) {
	if (typeof arg == "NaN") {
		$("#screen").text(" ");
	}
	if (typeof arg == "number") {
		arg = arg.toString();
	}
	var scientific = 0;
	if (arg.length <= 7) {
		$("#screen").text(arg);
	} else if (arg.length > 7 && arg.length < 10) {
		$("#screen").animate({
			fontSize : "3em",
			marginTop : "17%"
		});
		$("#screen").text(arg);
	} else if (arg.length >= 10) {
		arg = parseFloat(arg);
		scientific = arg.toExponential(9);
		$("#screen").text(scientific);
				$("#screen").animate({
			fontSize : "2em",
			marginTop : "24%"
		});
	}
}
// Take action based on which key is clicked.
function keyRouter () {
// If a number is clicked, show it on the screen.
	if ($(this).hasClass("number")) {
		if (first == true) {
			firstArray.push($(this).text());
			firstNum = firstArray.join('');
			display(firstNum);
			previous = 'num';
			

		} else {
		secondArray.push($(this).text());
		secondNum = secondArray.join('');
		display(secondNum);
		previous = 'num';
		}

	} else if ($(this).hasClass("operator")) {
		
		if (firstNum != '' && secondNum != '') {
			secondNum = parseFloat(secondNum);
			firstNum = operators[op](firstNum, secondNum);
			mostRecent = secondNum;
			secondArray = [];
			secondNum = '';
			display(firstNum);
			first = false;	
		}
			firstNum = parseFloat(firstNum);
			previous = 'op';
			first = false;
			op = $(this).text();
	
// If "C" is clicked, clear the previously entered number 
// Display "0" on the screen
	} else if ($(this).hasClass("clear_entry")) {
		if (first == true) {
			firstArray = []; 
			firstNum = '';
			$("#screen").text("0");			
		}
			mostRecent = '';
			secondArray = [];
			secondNum = '';
			$("#screen").text("0");


	} else if ($(this).hasClass("all_clear")) {
			mostRecent = '';
			secondArray = [];
			secondNum = '';
			firstArray = [];
			firstNum = '';
			$("#screen").text("0");
			first = true;
	
// If % is pressed / 100. 
	} else if ($(this).hasClass("percent")) {
		if (first == true) {
			firstNum = parseFloat(firstNum / 100);
			display(firstNum);
		} else {
			secondNum = parseFloat(secondNum / 100);
			display(secondNum);	
		}

	} else if ($(this).hasClass("equals")) {
// If no operator has been clicked, do nothing.
		if (op == '') {
			
		} else {
			first = true;
			if (previous == 'equal') {
				firstNum = operators[op](firstNum, mostRecent);
				display(firstNum);
			} else {
				secondNum = parseFloat(secondNum);
				firstNum = operators[op](firstNum, secondNum);
				display(firstNum);
				mostRecent = secondNum;
				secondNum = '';
				secondArray = [];
				firstArray = [];
			}
		}
		previous = 'equal';
	}
} // end keyRouter
displayTime();
$("#screen").text(0); // start with "0" on the screen;
$(".key").on("click", keyRouter); 
}); // end ready
