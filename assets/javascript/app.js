// VARIABLES
// ==============================================================================
let isFirstTimePlaying = true;			// Boolean for checking if it is the first time playing game
let gameTime = 90;                      // Allotted time for entire game (90 seconds)
let questionTime = 30;                  // Allotted time for answering trivia question (30 seconds)
let intervalGame = 0;                   // Interval for playing game
let intervalQuestion = 0;               // Interval for guessing trivia question
let isGameTimeout = false;				// Boolean for checking game's timeout
let isQuestionTimeout = false;			// Boolean for checking guessing question's timeout
let strH3 = "";                         // String for displaying <h3> dynamically
let strH4 = "";                         // String for displaying <h4> dynamically
let strIMG = "";						// String for displaying <img> dynamically

let arrTriviaDataLength = 0;            // Length of triviaData[]
let compIndexQuestion = 0;              // Index (random number) pointing to chosen trivia question
let compQuestion = "";                  // String for storing picked trivia question
let compAnswers = [];                   // Array for storing answers of chosen trivia question
let compImageName = "";					// Array for storing image of correct answer
let arrTriviaDataAnswersLength = 0      // Length of triviaData[].answers[]

let userAnswer = "";                    // String for storing chosen answer
let userAnswerIsCorrect = false;        // Boolean for validating chosen answer
let gameStatusMsg = ""                  // String for messaging about game status
let correctAnswerMsg = ""               // String for messaging about correct answer
let correctAnswerImage = ""				// String for showing image of correct answer

let corrects = 0;                       // Total for correct answers
let incorrects = 0;                     // Total for incorrect answers
let unaswered = 0;                      // Total for skipped answers

let triviaData = [
	{
		"questionText": "What breed of dog was Marley in the film \"Marley \& Me\" (2008)?",
		"answers": [
			{ "answerText": "Golden Retriever", "isCorrect": false },
			{ "answerText": "Dalmatian", "isCorrect": false },
			{ "answerText": "Labrador Retriever", "isCorrect": true },
			{ "answerText": "Shiba Inu", "isCorrect": false }
		],
		"imageName": "Marley&Me.jpg"
	},
	{
		"questionText": "Which of the following movies was not based on a novel by Stephen King?",
		"answers": [
			{ "answerText": "The Thing", "isCorrect": true },
			{ "answerText": "Carrie", "isCorrect": false },
			{ "answerText": "The Green Mile", "isCorrect": false },
			{ "answerText": "Misery", "isCorrect": false }
		],
		"imageName": "TheThing.jpg"
	},
	{
		"questionText": "Daniel Radcliffe became a global star in the film industry due to his performance in which film franchise?",
		"answers": [
			{ "answerText": "Pirates of the Caribbean", "isCorrect": false },
			{ "answerText": "Spy Kids", "isCorrect": false },
			{ "answerText": "Ted", "isCorrect": false },
			{ "answerText": "Harry Potter", "isCorrect": true }
		],
		"imageName": "HarryPotter.jpg"
	},
	{
		"questionText": "Who starred as Bruce Wayne and Batman in Tim Burton\'s 1989 movie \"Batman\"?",
		"answers": [
			{ "answerText": "Val Kilmer", "isCorrect": false },
			{ "answerText": "Michael Keaton", "isCorrect": true },
			{ "answerText": "George Clooney", "isCorrect": false },
			{ "answerText": "Adam West", "isCorrect": false }
		],
		"imageName": "Batman.jpg"
	},
	{
		"questionText": "Who directed \"E.T. the Extra-Terrestrial\" (1982)?",
		"answers": [
			{ "answerText": "Stanley Kubrick", "isCorrect": false },
			{ "answerText": "James Cameron", "isCorrect": false },
			{ "answerText": "Steven Spielberg", "isCorrect": true },
			{ "answerText": "Tim Burton", "isCorrect": false }
		],
		"imageName": "ET.jpg"
	},
	{
		"questionText": "What is the highest grossing film of all time (without adjusting for inflation)?",
		"answers": [
			{ "answerText": "Avatar", "isCorrect": true },
			{ "answerText": "Jurassic World", "isCorrect": false },
			{ "answerText": "Star Wars: The Force Awakens", "isCorrect": false },
			{ "answerText": "Titanic", "isCorrect": false }
		],
		"imageName": "Avatar.jpg"
	},
	{
		"questionText": "Which animated movie was first to feature a celebrity as a voice actor?",
		"answers": [
			{ "answerText": "Toy Story", "isCorrect": false },
			{ "answerText": "Aladdin", "isCorrect": true },
			{ "answerText": "James and the Giant Peach", "isCorrect": false },
			{ "answerText": "The Hunchback of Notre Dame", "isCorrect": false }
		],
		"imageName": "Alladin.jpg"
	},
	{
		"questionText": "When was the movie \"Con Air\" released?",
		"answers": [
			{ "answerText": "1999", "isCorrect": false },
			{ "answerText": "1985", "isCorrect": false },
			{ "answerText": "1997", "isCorrect": true },
			{ "answerText": "1990", "isCorrect": false }
		],
		"imageName": "ConAir.jpg"
	},
	{
		"questionText": "Who wrote and directed the 1986 film \"Platoon\"?",
		"answers": [
			{ "answerText": "Francis Ford Coppola", "isCorrect": false },
			{ "answerText": "Michael Cimino", "isCorrect": false },
			{ "answerText": "Stanley Kubrick", "isCorrect": false },
			{ "answerText": "Oliver Stone", "isCorrect": true }
		],
		"imageName": "Platoon.jpg"
	},
	{
		"questionText": "Who played Deputy Marshal Samuel Gerard in the 1993 film \"The Fugitive\"?",
		"answers": [
			{ "answerText": "Tommy Lee Jones", "isCorrect": true },
			{ "answerText": "Harrison Ford", "isCorrect": false },
			{ "answerText": "Harvey Keitel", "isCorrect": false },
			{ "answerText": "Martin Landau", "isCorrect": false }
		],
		"imageName": "TheFugitive.jpg"
	},
	{
		"questionText": "Which actress danced the twist with John Travolta in \"Pulp Fiction\"?",
		"answers": [
			{ "answerText": "Kathy Griffin", "isCorrect": false },
			{ "answerText": "Uma Thurman", "isCorrect": true },
			{ "answerText": "Pam Grier", "isCorrect": false },
			{ "answerText": "Bridget Fonda", "isCorrect": false }
		],
		"imageName": "PulpFiction.jpg"
	},
	{
		"questionText": "Who directed the movies \"Pulp Fiction\", \"Reservoir Dogs\" and \"Django Unchained\"?",
		"answers": [
			{ "answerText": "Martin Scorcese", "isCorrect": false },
			{ "answerText": "Steven Spielberg", "isCorrect": false },
			{ "answerText": "Quentin Tarantino", "isCorrect": true },
			{ "answerText": "James Cameron", "isCorrect": false }
		],
		"imageName": "QuentinTarantino.jpg"
	},
	{
		"questionText": "Who directed the 2015 movie \"The Revenant\"?",
		"answers": [
			{ "answerText": "Christopher Nolan", "isCorrect": false },
			{ "answerText": "David Fincher", "isCorrect": false },
			{ "answerText": "Wes Anderson", "isCorrect": false },
			{ "answerText": "Alejandro G. Iñárritu", "isCorrect": false }
		],
		"imageName": "TheRevenant.jpg"
	},
	{
		"questionText": "This movie contains the quote, \"I feel the need ... the need for speed!\"",
		"answers": [
			{ "answerText": "Top Gun", "isCorrect": true },
			{ "answerText": "Days of Thunder", "isCorrect": false },
			{ "answerText": "The Color of Money", "isCorrect": false },
			{ "answerText": "Cocktail", "isCorrect": false }
		],
		"imageName": "TopGun.jpg"
	},
	{
		"questionText": "What was the first James Bond film?",
		"answers": [
			{ "answerText": "Goldfinger", "isCorrect": false },
			{ "answerText": "Dr. No", "isCorrect": true },
			{ "answerText": "From Russia With Love", "isCorrect": false },
			{ "answerText": "Thunderball", "isCorrect": false }
		],
		"imageName": "DrNo.jpg"
	},
	{
		"questionText": "This movie contains the quote, \"Nobody puts Baby in a corner.\"",
		"answers": [
			{ "answerText": "Three Men and a Baby", "isCorrect": false },
			{ "answerText": "Ferris Bueller\'s Day Off", "isCorrect": false },
			{ "answerText": "Dirty Dancing", "isCorrect": true },
			{ "answerText": "Pretty in Pink", "isCorrect": false }
		],
		"imageName": "DirtyDancing.jpg"
	},
	{
		"questionText": "Which of these actors/actresses is NOT a part of the cast for the 2016 movie \"Suicide Squad\"?",
		"answers": [
			{ "answerText": "Jared Leto", "isCorrect": false },
			{ "answerText": "Will Smith", "isCorrect": false },
			{ "answerText": "Margot Robbie", "isCorrect": false },
			{ "answerText": "Scarlett Johansson", "isCorrect": true }
		],
		"imageName": "SuicideSquad.jpg"
	},
	{
		"questionText": "Which of these movies did Jeff Bridges not star in?",
		"answers": [
			{ "answerText": "The Hateful Eight", "isCorrect": true },
			{ "answerText": "Tron: Legacy", "isCorrect": false },
			{ "answerText": "The Giver", "isCorrect": false },
			{ "answerText": "True Grit", "isCorrect": false }
		],
		"imageName": "TheHatefulEight.jpg"
	},
	{
		"questionText": "Who plays Alice in the Resident Evil movies?",
		"answers": [
			{ "answerText": "Milla Johnson", "isCorrect": false },
			{ "answerText": "Milla Jovovich", "isCorrect": true },
			{ "answerText": "Madison Derpe", "isCorrect": false },
			{ "answerText": "Kim Demp", "isCorrect": false }
		],
		"imageName": "ResidentEvil.jpg"
	},
	{
		"questionText": "What is the oldest Disney film?",
		"answers": [
			{ "answerText": "Pinocchio", "isCorrect": false },
			{ "answerText": "Dumbo", "isCorrect": false },
			{ "answerText": "Snow White and the Seven Dwarfs", "isCorrect": true },
			{ "answerText": "Fantasia", "isCorrect": false }
		],
		"imageName": "SnowWhite.jpg"
	}
];

// FUNCTIONS
// ==============================================================================

// Function to decrement time remaining since game began
function decrementGameTime() {
	gameTime--;
	if (gameTime === 0) {
		isGameTimeout = true;
	}
}

// Function to decrement time remaining for guessing trivia question
function decrementQuestionTime() {
	questionTime--;
	if (questionTime === 0) {
		isQuestionTimeout = true;
	}
	else {
		strH4 = "";
		strH4 = "<h4 id=\"time-remaining\">Time Remaining: " + questionTime + " Seconds</h4>";
		$("#time-remaining").html(strH4);
	}
}

// Function to generate random numbers between a max and a min value
function generateRandom(min, max) {
	//console.log("Executed generateRandom() --> min:  " + min + ";  max:  " + max);

	return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Function for picking trivia question and corresponding answers
function pickQuestion() {
	//console.log("Executed pickQuestion() --> ");

	arrTriviaDataLength = 0;
	compIndexQuestion = 0;
	compQuestion = "";
	compAnswers = [];
	compImageName = "";
	arrTriviaDataAnswersLenght = 0;

	// Length of triviaData[]
	arrTriviaDataLength = triviaData.length;

	// Get random number between 0 and lenght of triviaData[] to chose question
	compIndexQuestion = generateRandom(0, triviaData.length - 1);
	compQuestion = triviaData[compIndexQuestion].questionText;

	// Length of triviaData[].answers[]
	arrTriviaDataAnswersLength = triviaData[compIndexQuestion].answers.length;

	// Load answers of chosen trivia question
	for (var i = 0; i < arrTriviaDataAnswersLength; i++) {
		compAnswers.push({ answerText: triviaData[compIndexQuestion].answers[i].answerText, isCorrect: triviaData[compIndexQuestion].answers[i].isCorrect });
	}

	// Load image of chosen trivia question
	compImageName = triviaData[compIndexQuestion].imageName;
}

// Function to render trivia question's remaining time, plus question and answers (buttons)
function renderQuestionAnswers() {
	//console.log("Executed renderQuestionAnswers() --> ");

	// Display time remaining
	strH4 = "";
	strH4 = "<h4 id=\"time-remaining\">Time Remaining: " + questionTime + " Seconds</h4>";
	$("#time-remaining").html(strH4);

	// Display chosen question
	strH3 = "";
	strH3 = "<h3 id=\"question-status\" class=\"font-italic\">" + compQuestion + "</h3>";
	$("#question-status").html(strH3);

	$("#answers-buttons").empty();

	// Display answers for chosen question
	arrTriviaDataAnswersLength = triviaData[compIndexQuestion].answers.length;
	for (var i = 0; i < arrTriviaDataAnswersLength; i++) {
		// Create buttons dynamically for each answer to the trivia question
		let newButton = $("<button>");
		newButton.attr("type", "button");
		newButton.addClass("answers");
		newButton.addClass("btn btn-light btn-lg btn-block");
		newButton.addClass("mx-auto");
		newButton.attr("data-name", compAnswers[i].answerText);
		newButton.html(compAnswers[i].answerText);
		$("#answers-buttons").append(newButton);
	}	
}

// Function to validate chosen answer
function validateAnswerChosen() {
	console.log("Executed validateAnswerChosen() --> ");

	userAnswerIsCorrect = false;
	gameStatusMsg = "";
	correctAnswerMsg = "";
	correctAnswerImage = "";

	for (var i = 0; i < compAnswers.length; i++) {
		if (userAnswer === compAnswers[i].answerText) {
			userAnswerIsCorrect = compAnswers[i].isCorrect;
		}
		if (compAnswers[i].isCorrect) {
			correctAnswerMsg = "The correct answer was " + compAnswers[i].answerText;
			correctAnswerImg = compAnswers[i].answerText;
		}
	}
	// Debugging
	//console.log("validateAnswerChosen() --> userAnswerIsCorrect: " + userAnswerIsCorrect);
	//console.log("isQuestionTimeout: " + isQuestionTimeout);

	if (!isQuestionTimeout) {
		if (userAnswerIsCorrect) {
			// Answer was correct
			corrects++;
			gameStatusMsg = "Correct!";
			correctAnswerMsg = "";
		}
		else {
			// Answer was incorrect
			incorrects++;
			gameStatusMsg = "Nope!!!";
		}
	}
	else {
		// No buttons were clicked so question timed out
		unaswered++;
		gameStatusMsg = "Out of Time!";
		isQuestionTimeout = false;
	}
	// Debugging
	// console.log("corrects: " + corrects + "; incorrects: " + incorrects + "; unanswered: " + unaswered);
	// console.log("gameStatusMsg: " + gameStatusMsg);
	// console.log("correctAnswerMsg: " + correctAnswerMsg);

	// Display validation results
	// Clear start button
	$("#start-button").empty();

	// Display time remaining
	strH4 = "";
	strH4 = "<h4 id=\"time-remaining\">Time Remaining: " + questionTime + " Seconds</h4>";
	// Debugging
	console.log("strH4: " + strH4);
	$("#time-remaining").html(strH4);

	// Display game status
	strH3 = "";
	strH3 = "<h3 id=\"question-status\" class=\"font-italic\">" + gameStatusMsg + "</h3>";
	// Debugging
	console.log("strH3: " + strH3);
	$("#question-status").html(strH3);

	// Clear the answers buttons
	$("#answers-buttons").empty();

	
	// Display correct answer image
	strIMG = "";
	strIMG = "<img id=\"answer-image\" src=\"./assets/images/" + compImageName + "\">";
	$("#answer-image").html(strIMG);
	// Debugging
	console.log("compImageName: " + compImageName);
	console.log("strIMG: " + strIMG);
	// ojo $("#answer-image").html("<h3>" + compImageName + "</h3>");

	// Display correct answer message
	strH4 = "";
	strH4 = "<h4 id=\"answer-text\">" + correctAnswerMsg + "</h4>";
	// Debugging
	console.log("strH4: " + strH4);
	$("#answer-text").html(strH4);

}

// Function to clear place holders for dynamic HTML elements 
function clearElements() {
	console.log("Executed clearHtmlDivs() --> ");

	$("#start-button").empty();
	$("#time-remaining").empty();
	$("#answers-buttons").empty();
	$("#question-status").empty();
	$("#answer-text").empty();
	$("#answer-image").empty();
	$("#stats").empty();
	$("#restart-button").empty();
}

// Function to display game Stats
function displayStats() {
	//console.log("Executed displayStats() --> ");

	$("#start-button").empty();
	$("#answers-buttons").empty();
	$("#question-status").empty();
	$("#answer-text").empty();
	$("#answer-image").empty();

	// Display time remaining
	strH4 = "";
	strH4 = "<h4 id=\"time-remaining\">Time Remaining: " + questionTime + " Seconds</h4>";
	$("#time-remaining").html(strH4);

	// Display total of correct, incorrect and skipped answers
	strH4 = "";
	strH4 = "<h4 id=\"correct-answers\">Correct Answers: " + corrects + "</h4>";
	$("#correct-answers").html(strH4);
	strH4 = "";
	strH4 = "<h4 id=\"incorrect-answers\">Incorrect Answers: " + incorrects + "</h4>";
	$("#incorrect-answers").html(strH4);
	strH4 = "";
	strH4 = "<h4 id=\"skipped-answers\">Unanswered: " + unaswered + "</h4>";
	$("#skipped-answers").html(strH4);

	// Display Start Over button
	$("#restart-button").append("<button id=\"restart-button\" type=\"button\" class=\"btn btn-info btn-lg btn-block\">Start Over?</button>");
}

// Function to delay the showing of results before going to the next trivia question
function delayDisplay() {

	// Clear dynamic HTML elements
	clearElements();

	// Pick NEXT trivia question with answers
	pickQuestion();

	// Adjust game timer after delaying game for 10 seconds
	gameTime += 10;

	// Reset time for answering trivia question back to 30 seconds
	questionTime = 30;

	// Render NEXT trivia question and answers (buttons)
	renderQuestionAnswers();
}

// Function to adjust timers after delaying game for 10 seconds
function adjustTimers() {
	gameTime += 10;
	questionTime += 10;
}

// MAIN PROCESS
// ==============================================================================

// Start game as soon as the page loads and set its timeout to 90 secs
window.onload = (function () {

	// Check if game hasn't timed out yet
	if (!isGameTimeout) {

		//console.log("main() --> Start of game!");

		$("#start-button").append("<button id=\"start-button\" type=\"button\" class=\"btn btn-info btn-lg btn-block\">Start</button>");

		$("#start-button").on("click", function () {

			if (isFirstTimePlaying) {

				// Clear START button
				$("#start-button").empty();

				isFirstTimePlaying = false;
			}

			// Set the timers for the game after 1 second
			clearInterval(intervalGame);
			intervalGame = setInterval(decrementGameTime, 1000);
			clearInterval(intervalQuestion);
			intervalQuestion = setInterval(decrementQuestionTime, 1000);

			// Pick trivia question with answers
			pickQuestion();

			// Render trivia question and answers (buttons)
			renderQuestionAnswers();

			// Add a click event listenerer for all dynamically generated buttons with the class .answers
			$(document).on("click", ".answers", function () {

				// Capture the answer to the trivia question from the button's data-attribute
				userAnswer = "";
				userAnswer = $(this).attr("data-name");
				// Debugging
				//console.log("main() --> userAnswer: " + userAnswer);

				// Validate answer chosen for trivia question and display results
				validateAnswerChosen();

				setTimeout(delayDisplay, 5000);

			});
		});
	}
	else {                                                      // Game Timed Out!

		// Clear dynamic HTML elements
		clearElements();

		// Display game Stats
		displayStats();

		setTimeout(displayStats, 5000);

		isGameTimeout = false;

		// Clear game timers
		clearInterval(intervalGame);
		clearInterval(intervalQuestion);

		$("#restart-button").on("click", function () {

			// Clear RESTART button
			$("#restart-button").empty();

			// Reset timers
			gameTime = 90;
			questionTime = 30;

			// Set the timers for the game after 1 second
			clearInterval(intervalGame);
			intervalGame = setInterval(decrementGameTime, 1000);
			clearInterval(intervalQuestion);
			intervalQuestion = setInterval(decrementQuestionTime, 1000);
		});
	}
});

