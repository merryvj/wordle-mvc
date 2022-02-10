class Model {
  constructor() {
    this.wotd = "crane";

    this.guesses = [];
  }

  addGuess(guess) {
      //TODO: validate guess
    let word = [];
    for (let i = 0; i < guess.length; i++) {
      let state = "grey";
      let letter = guess.charAt(i);
      if (this.wotd.includes(letter)) {
        state = "yellow";

        if (this.wotd.charAt(i) === letter) {
          state = "green";
        }
      }

      word.push({
        index: i,
        letter: letter,
        state: state,
      });
    }

    this.guesses.push(word);

    console.log(this.guesses);
  }
}

class View {
  constructor() {
    this.guesses = document.querySelector("#guesses");
    this.instructions = document.querySelector("#instructions");
    this.input = document.querySelector("#input");
    this.enterBtn = document.querySelector("#enterBtn");
  }
  getGuess() {
    //TODO: check for validity (length)
    return this.input.value;
  }

  _resetInput() {
    this.input.value = "";
  }

  _addGuess(guess) {
    let guessRow = document.createElement("div");
    guessRow.classList.add("guessRow");
    for (let letter of [...guess]) {
      let letterEl = document.createElement("span");
      letterEl.classList.add("letter", letter.state);
      letterEl.innerHTML = letter.letter;
      guessRow.append(letterEl);
    }
    return guessRow;
  }

  displayGuesses(guesses) {
    this.guesses.textContent = "";
    for (let guess of guesses) {
      this.guesses.append(this._addGuess(guess));
    }
  }

  bindEnterBtn(handler) {
    this.enterBtn.addEventListener("click", () => {
      handler(this.getGuess());
      this._resetInput();
    });
  }
}

class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    this.view.bindEnterBtn(this.handleGuessInput);
  }

  handleGuessInput = (guess) => {
    this.model.addGuess(guess);
  };
}

const app = new Controller(new Model(), new View());

// const word = "graph"; //replace this with API call
// let dictionary = [ //replace this as well!
//     "bagel",
//     "earth",
//     "shelf",
//     "field",
//     "frame",
//     "amaze"
// ]
// let guessesLeft = 6;

// let guesses = [

// ]

// //fetching word of day
// function getWord() {

// }
// //submitting a guess - client input, check if in dictionary
// function submitGuess() {
//     let guess = input.value;
//     console.log(guess);

//     if (dictionary.includes(guess)) {
//         validateGuess(guess);
//         guessesLeft--;
//         instructions.innerHTML = `You have ${guessesLeft} guesses left`;
//         input.value = '';
//     } else {
//         alert("Please enter a valid 5-letter word.");
//     }
// }

// //validating guess compared to word of day
// function validateGuess(guess) {

//     let guessLetters = [];

//     for (let i = 0; i < guess.length; i++) {
//         let state = "grey";
//         let letter = guess.charAt(i);
//         if (word.includes(letter)) {
//             state = "yellow";

//             if (word.charAt(i) === letter) {
//                 state = "green";
//             }
//         }

//         guessLetters.push({
//             "index": i,
//             "letter": letter,
//             "state": state
//         });
//     }

//     guesses.push(guessLetters);
//     showGuessResults();
// }

//handing game states
