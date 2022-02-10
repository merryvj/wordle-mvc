
class Model {
    constructor() {}
}

class View {
    constructor() {}
}

class Controller {
    constructor(model, view) {
        this.model = model
        this.view = view
    }
}

const app = new Controller(new Model(), new View());

const word = "graph"; //replace this with API call
let dictionary = [ //replace this as well!
    "bagel",
    "earth",
    "shelf",
    "field",
    "frame",
    "amaze"
]
let guessesLeft = 6;

const instructions = document.querySelector("#instructions");
const input = document.querySelector("#input");
const feedbackEl = document.querySelector("#feedback");


let guesses = [

]

//fetching word of day
function getWord() {

}
//submitting a guess - client input, check if in dictionary
function submitGuess() {
    let guess = input.value;
    console.log(guess);

    if (dictionary.includes(guess)) {
        validateGuess(guess);
        guessesLeft--;
        instructions.innerHTML = `You have ${guessesLeft} guesses left`;
        input.value = '';
    } else {
        alert("Please enter a valid 5-letter word.");
    }
}

//validating guess compared to word of day
function validateGuess(guess) {

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



//displaying result of guess
function showGuessResults() {
    feedbackEl.innerHTML = '';
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