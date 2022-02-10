class Model {
  constructor() {
    this.wotd = "crane"; //todo call dynamically
    this.guessesLeft = 6;
    this.guesses = [];
  }

  getGuesses() {
      return this.guesses;
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
    this.view.displayGuesses(this.model.getGuesses());
  };
}

const app = new Controller(new Model(), new View());
