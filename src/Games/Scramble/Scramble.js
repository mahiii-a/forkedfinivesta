import React from "react";
import "./Scramble.css";

const Game = () => {
  React.useEffect(() => {
    const words = [
      { word: "LOAN", hint: "Often used for things like buying a car, home, or funding education" },
      { word: "BANK", hint: "A place where people deposit their money" },
      { word: "CASH", hint: "Physical form of money" },
      { word: "STOCK", hint: "Represents a share in a company" },
      { word: "BUDGET", hint: "A plan for managing expenses" },
      { word: "INVEST", hint: "To put money into assets for future returns" },
      { word: "TAX", hint: "A mandatory contribution to the government" },
      { word: "SAVINGS", hint: "Money set aside for future use" },
      { word: "INTEREST", hint: "The cost of borrowing money" },
      { word: "INFLATION", hint: "The rise in general price levels" }
    ];

    let currentWord = {};
    let score = 0;
    let timer;
    let timeLeft = 0;
    let isTimedMode = false;

    const shuffleWord = (word) => {
      return word.split('').sort(() => 0.5 - Math.random()).join(' ');
    };

    const startGame = () => {
      document.querySelector('.landing-page').style.display = 'none';
      document.querySelector('.game-container').style.display = 'block';

      currentWord = words[Math.floor(Math.random() * words.length)];
      document.getElementById("scrambled-word").textContent = shuffleWord(currentWord.word);
      document.querySelector(".hint").textContent = `Hint: ${currentWord.hint}`;

      document.getElementById("answer").value = "";

      if (isTimedMode) {
        timeLeft = 30;
        document.getElementById("timer").textContent = `${timeLeft}s`;
        clearInterval(timer);
        timer = setInterval(() => {
          timeLeft--;
          document.getElementById("timer").textContent = `${timeLeft}s`;
          if (timeLeft === 0) {
            clearInterval(timer);
            showWrongMessage("Time's up! ⏳ Moving on...");
            setTimeout(startGame, 2000);
          }
        }, 1000);
      } else {
        document.getElementById("timer").textContent = "∞";
        clearInterval(timer);
      }
    };

    const showCorrectMessage = () => {
      const correctMessage = document.getElementById("correct-message");
      correctMessage.style.display = "flex";
      setTimeout(() => {
        correctMessage.style.display = "none";
      }, 2000);
    };

    const showWrongMessage = (msg = "Wrong! ❌") => {
      const wrongMessage = document.getElementById("wrong-message");
      wrongMessage.innerHTML = `<span>${msg}</span>`;
      wrongMessage.style.display = "flex";
      setTimeout(() => {
        wrongMessage.style.display = "none";
      }, 2000);
    };

    document.getElementById("check").addEventListener("click", function () {
      const answer = document.getElementById("answer").value.trim().toUpperCase();
      const correctWord = currentWord.word.toUpperCase();

      if (answer === correctWord) {
        score++;
        document.getElementById("score").textContent = score;
        clearInterval(timer);
        showCorrectMessage();
        startGame();
      }else {
        clearInterval(timer);
        if (isTimedMode) {
          showWrongMessage("Wrong! ❌ Moving on...");
          startGame();
        } else {
          showWrongMessage("Try again!");
        }
      }
    });

    document.getElementById("refresh").addEventListener("click", function () {
      clearInterval(timer);
      startGame();
    });

    document.getElementById("timed-mode-btn").addEventListener("click", function () {
      isTimedMode = true;
      startGame();
    });

    document.getElementById("infinite-mode-btn").addEventListener("click", function () {
      isTimedMode = false;
      startGame();
    });

    // Init UI state
    document.querySelector('.landing-page').style.display = 'block';
    document.querySelector('.game-container').style.display = 'none';
  }, []);

  return (
    <div className="scramble-game">
      <div className="landing-page">
        <div className="intro-container">
          <h1>Welcome to Finivesta's Scramble Game!</h1>
          <p>Choose your mode and start unscrambling financial terms!</p>
          <div style={{ display: 'flex', gap: '20px' }}>
            <button id="timed-mode-btn">Timed Mode</button>
            <button id="infinite-mode-btn">Infinite Mode</button>
          </div>
        </div>
      </div>

      <div className="game-container">
        <div className="info">
          <div>Time: <span id="timer">∞</span></div>
          <div>Score: <span id="score">0</span></div>
        </div>
        <div className="guess">GUESS!</div>
        <div id="scrambled-word">N O L A</div>
        <div className="hint">Hint: Often used for things like buying a car, home, or funding education</div>
        <input type="text" id="answer" placeholder="Enter if you dare..." />
        <div className="buttons">
          <button id="refresh">REFRESH</button>
          <button id="check">CHECK</button>
        </div>
      </div>

      <div id="correct-message" className="correct-message">
        <span>Correct!</span> ✅
      </div>
      <div id="wrong-message" className="wrong-message">
        <span>Wrong!</span>❌ 
      </div>
    </div>
  );
};

export default Game;
