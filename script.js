const word = "graph"; //replace this with API call
let dictionary = [ //replace this as well!
    "bagle",
    "switch",
    "gross",
    "crater",
    "frame"
]
let guessesLeft = 6;

const input = document.querySelector("#input");
const feedbackEl = document.querySelector("#feedback");


let guesses = [

]

//fetching word of day
function getWord() {

}
//submitting a guess - client input, check if in dictionary
function submitGuess() {
    let guess = input.value();

    if (dictionary.includes(guess)) {
        validateGuess(guess);
        guessesLeft--;
    } else {
        alert("Please enter a valid 5-letter word.");
    }
}

//validating guess compared to word of day
function validateGuess(guess) {
    //for each character of guess
        //if character is in word
            //set letter to yellow
            //if character is also in correct position
                //set letter to green
        //else set letter to grey

    let guessLetters = [];

    for (let i = 0; i < guess.length; i++) {
        let state = "grey";
        let letter = guess.charAt(i);
        if (word.includes(letter)) {
            state = "yellow";

            if (word.charAt(i) === letter) {
                state = "green";
            }
        }

        guessLetters.push({
            "index": i,
            "letter": letter,
            "state": state
        });
    }

    guesses.push(guessLetters);
    showGuessResults();
}

validateGuess("grohe");
validateGuess("noerw");


//displaying result of guess
function showGuessResults() {


    for (let guess of guesses) {
        let guessRow = document.createElement("div");
        guessRow.classList.add("guessRow");
        for (let letter of [...guess]) {
            let letterEl = document.createElement("span");
            letterEl.classList.add("letter", letter.state);
            letterEl.innerHTML = letter.letter;
            guessRow.append(letterEl);
        }

        feedbackEl.append(guessRow);
    }

}

//handing game states