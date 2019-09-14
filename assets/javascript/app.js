// VARIABLES
// ==============================================================================
let gameTime = 90;                      // Aloted time for entire game (90 seconds)
let questionTime = 30;                  // Aloted time for answering trivia question (30 seconds)
let intervalGame = 0;                   // Interval for playing game
let intervalQuestion = 0;               // Interval for guessing trivia question

let arrTriviaDataLength = 0;            // Length of triviaData[]
let compIndexQuestion = 0;              // Index (random number) pointing to chosen trivia question
let compQuestion = "";                  // String for storing chosen trivia question
let compAnswers = {};                   // Object for storing answers of chosen trivia question
let arrTriviaDataAnswersLength = 0      // Length of triviaData[].answers[]


let triviaData = [
    {
        "questionText": "What breed of dog was Marley in the film \"Marley \& Me\" (2008)?",
        "answers": [
            {"answerText": "Golden Retriever", "isCorrect": false},
            {"answerText": "Dalmatian", "isCorrect": false},
            {"answerText": "Labrador Retriever", "isCorrect": true},
            {"answerText": "Shiba Inu", "isCorrect": false}
        ]
    },
    {
        "questionText": "Which of the following movies was not based on a novel by Stephen King?",
        "answers": [
            {"answerText": "The Thing", "isCorrect": true},
            {"answerText": "Carrie", "isCorrect": false},
            {"answerText": "The Green Mile", "isCorrect": false},
            {"answerText": "Misery", "isCorrect": false}
        ]
    },
    {
        "questionText": "Daniel Radcliffe became a global star in the film industry due to his performance in which film franchise??",
        "answers": [
            {"answerText": "Pirates of the Caribbean", "isCorrect": false},
            {"answerText": "Spy Kids", "isCorrect": false},
            {"answerText": "Ted", "isCorrect": false},
            {"answerText": "Harry Potter", "isCorrect": true}
        ]
    },
    {
        "questionText": "Who starred as Bruce Wayne and Batman in Tim Burton\'s 1989 movie \"Batman\"?",
        "answers": [
            {"answerText": "Val Kilmer", "isCorrect": false},
            {"answerText": "Michael Keaton", "isCorrect": true},
            {"answerText": "George Clooney", "isCorrect": false},
            {"answerText": "Adam West", "isCorrect": false}
        ]
    },
    {
        "questionText": "Who directed \"E.T. the Extra-Terrestrial\" (1982)?",
        "answers": [
            {"answerText": "Stanley Kubrick", "isCorrect": false},
            {"answerText": "James Cameron", "isCorrect": false},
            {"answerText": "Steven Spielberg", "isCorrect": true},
            {"answerText": "Tim Burton", "isCorrect": false}
        ]
    }/*, ojo                            LAST QUESTION
    {
        "questionText": "?",
        "answers": [
            {"answerText": "", "isCorrect": false},
            {"answerText": "", "isCorrect": false},
            {"answerText": "", "isCorrect": false},
            {"answerText": "", "isCorrect": false}
        ]        
    }*/
];

// FUNCTIONS
// ==============================================================================

// Function to decrement time remaining since game began
function decrementGameTime() {
    gameTime--;
    console.log("Executed decrementGameTime() --> gameTime: " + gameTime);
                            //ojo       Must have clearInterval() once the game has timed out!
                            //          Must comment out console.log() when done!
}


// Function to decrement time remaining for guessing trivia question
function decrementQuestionTime() {
    questionTime--;
    console.log("Executed decrementQuestionTime() --> questionTime: " + questionTime);
                            //ojo       Must have clearInterval() once the question has timed!!!
                            //          Must comment out console.log() when done!
}


// Function to generate random numbers between a max and a min value
function generateRandom(min, max) {
    console.log("Executed generateRandom() --> min:  " + min + ";  max:  " + max);
                            // ojo      Must comment out console.log() when done! 
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


// Function for picking trivia question and corresponding answers
function pickQuestion() {
    console.log("Executed pickQuestion() --> ");

    arrTriviaDataLength = 0;
    compIndexQuestion = 0;
    compQuestion = "";
    compAnswers = {};
    arrTriviaDataAnswersLenght = 0;

    // Length of triviaData[]
    arrTriviaDataLength = triviaData.length;
    console.log("arrTriviaDataLength: " + arrTriviaDataLength);

    // Get random number between 0 and lenght of triviaData[] to chose question
    compIndexQuestion = generateRandom(0, triviaData.length - 1);
    compQuestion = triviaData[compIndexQuestion].questionText;
    console.log("compIndexQuestion : " + compIndexQuestion);
    console.log("compQuestion : " + compQuestion);

    // Length of triviaData[].answers[]
    arrTriviaDataAnswersLength = triviaData[compIndexQuestion].answers.length;
    console.log("arrTriviaDataAnswersLength: " + arrTriviaDataAnswersLength);

    // Load answers of chosen trivia question
    for (var i = 0; i < arrTriviaDataAnswersLenght; i++) {
        compAnswers[i] = {};                                    // Creates a new object
        compAnswers[i].answerText = triviaData[compIndexQuestion].answers[i].answerText;
        compAnswers[i].isCorrect = triviaData[compIndexQuestion].answers[i].isCorrect;
        console.log("compAnswers[i].answerText : " + compAnswers[i].answerText);
        console.log("compAnswers[i].isCorrect : " + compAnswers[i].isCorrect);
    }



}

// Function to kick off game
function startGame() {
    console.log("Executed startGame() after onclick of start button");

    // Set the timers for the game after 3 seconds
    clearInterval(intervalGame);
    intervalGame = setInterval(decrementGameTime, 3000);
    clearInterval(intervalQuestion);
    intervalQuestion = setInterval(decrementQuestionTime, 3000);

    // Remove START button
    $("#start-button").remove();

    // Pick trivia question with answers
    //ojo
    console.log("question1:  " + triviaData[0].questionText);
    console.log("answers1.text:  " + triviaData[0].answers.answerText[0]);
    console.log("answers1.isCorrect:  " + triviaData[0].answers.isCorrect[0]);
    console.log("question2:  " + triviaData[1].questionText);
    console.log("answers2.text:  " + triviaData[1].answers.answerText[1]);
    console.log("answers2.isCorrect:  " + triviaData[1].answers.isCorrect[1]);

    // Display trivia question time remaining, question and answers (buttons)  



}

// MAIN PROCESS
// ==============================================================================

// Start game as soon as the page loads and set its timeout to 90 secs
window.onload = (function() {
    console.log("Main() --> Start of game!");

    $("#start-button").append("<button id=\"start-button\">Start</button>");

    $("#start-button").on("click", startGame);
});




        // Reset game
        // Set game timeout - First Interval (For starting over) -> decrement interval by 90 secs
        // Pick trivia question + answers
        // Display trivia question timeout and question + answers (buttons)
        // Set trivia question timeout - Second Interval (For next question) -> decrement interval by 30 secs

        // On click ANSWERS buttons (any button) FUNCTION

            // If game timeout > 0
                // ojo --- pause game timeout???
                // Validate answer
                    // Check if trivia question timeout (skipped answer)
                    // Check if answer is correct
                    // Check if answer is incorrect
                    // Display trivia question timeout + status + correct answer msg + image of correct answer
                // Display Trivia timeout and results

                // Set delay after display of results - Third Interval (For next question) -> decrement interval by 3 secs
                // ojo --- resume game timeout???

                // Pick trivia question + answers
                // Display trivia question timeout and question + answers (buttons)
                // Reset second interval back to 30 seconds to continue game with next question

            // else (Game time out!)
                // Display game stats
                // Set delay after display of game status - Fourth Interval (For Start Over button) -> decrement by 3 secs
                // Display Start Over button

                // On click Start Over button

                    // Reset first interval back to 90 seconds to continue with game
                    // Pick trivia question + answers
                    // Display trivia question timeout and question + answers (buttons)
                    // Reset second interval back to 30 seconds to continue game with next question              

