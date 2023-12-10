//Zoe Levings: This script is used to hide and unhide parts of the quiz page as needed for quiz 1, as well as some basic functions for usability
	//var to tally score for quiz, global, so can be updated by multiple functions and called later
	var resultsTally = 0;
	//var to track which question player is on, global to be updated by multiple functions
	var quiz1QuestionNumber = 0
	
	//pressing enter or button takes player to startup page
	document.querySelector("#quizNameButtonId").onclick
	= function() {
		startupProcedure();
	}

	document.querySelector("#nameInputId").onchange
	= function() {
		startupProcedure();
	}

	//when player clicks flora button on a question in quiz 1
	document.querySelector("#q1FlButtonId").onclick
	= function() {
		//hides past buttons
		document.querySelector("#q1FlButtonId").style.display = "none"
		document.querySelector("#q1FaButtonId").style.display = "none"
		
		//hides previous question block
		document.querySelector("#quiz1Q" + quiz1QuestionNumber + "Id").style.display = "none";
		
		//add to results tally if answer is correct
		if (quiz1QuestionNumber === 2 || quiz1QuestionNumber === 3) {
			//if right answer, show right answer block and next question button
			document.querySelector("#rightAnswerId").style.display = "block";
			document.querySelector("#q1NextQButtonId").style.display = "inline";
			resultsTally++;
		} else if (quiz1QuestionNumber === 1 || quiz1QuestionNumber === 4) {
			//if wrong answer, show wrong answer block and next question button
			document.querySelector("#wrongAnswerId").style.display = "block";
			document.querySelector("#q1NextQButtonId").style.display = "inline";
		} else {
			//for last question, show button to see results
			document.querySelector("#quiz1ResultsRightId").style.display = "block";
			document.querySelector("#quiz1SeeResults").style.display = "inline";
			resultsTally++;
		}
	}

	//when player clicks fauna button on a question in quiz 1
	document.querySelector("#q1FaButtonId").onclick
	= function() {
		//hides past buttons
		document.querySelector("#q1FlButtonId").style.display = "none"
		document.querySelector("#q1FaButtonId").style.display = "none"
		
		//hides previous question block
		document.querySelector("#quiz1Q" + quiz1QuestionNumber + "Id").style.display = "none";
		
		//add to results tally if answer is correct
		if (quiz1QuestionNumber === 1 || quiz1QuestionNumber === 4) {
			//if right answer, show right answer block and next question button
			document.querySelector("#rightAnswerId").style.display = "block";
			document.querySelector("#q1NextQButtonId").style.display = "inline";
			resultsTally++;
		} else if (quiz1QuestionNumber === 2 || quiz1QuestionNumber === 3) {
			//if wrong answer, show wrong answer block and next question button
			document.querySelector("#wrongAnswerId").style.display = "block";
			document.querySelector("#q1NextQButtonId").style.display = "inline";
		} else {
			//for last question, show button to see results
			document.querySelector("#quiz1ResultsWrongId").style.display = "block";
			document.querySelector("#quiz1SeeResults").style.display = "inline";
		}
	}

	//function hides and unhides parts of quiz as needed
	document.querySelector("#q1NextQButtonId").onclick 
	= function() {
		//hides previous parts for all questions
		document.querySelector("#q1NextQButtonId").style.display = "none"
		document.querySelector("#q1FlButtonId").style.display = "inline"
		document.querySelector("#q1FaButtonId").style.display = "inline"
		document.querySelector("#rightAnswerId").style.display = "none";
		document.querySelector("#wrongAnswerId").style.display = "none";
		document.querySelector("#loadupPageId").style.display = "none";
		
		//increments to next question on counter
		quiz1QuestionNumber++;
		
		//displays next question block
		document.querySelector("#quiz1Q" + quiz1QuestionNumber + "Id").style.display = "block";
	}
	
	//hides all quiz items and displays final results
	document.querySelector("#quiz1SeeResults").onclick 
	= function() {
		document.querySelector("#quiz1ResultsRightId").style.display = "none";
		document.querySelector("#quiz1ResultsWrongId").style.display = "none";
		document.querySelector("#quiz1SeeResults").style.display = "none";
		document.querySelector("#quiz1ResultsId").style.display = "block";
		document.getElementById("quiz1ResultFill").innerHTML = resultsTally;
	}

	//displays player name and screen to enter quizzes
	startupProcedure = function() {
		document.getElementById("nameSpanId").innerHTML = 					
			document.getElementById("nameInputId").value;
		document.querySelector("#quizMainPageId").style.display = "none";
		document.querySelector("#loadupPageId").style.display = "block";
		document.querySelector("#q1NextQButtonId").style.display = "inline";
	}