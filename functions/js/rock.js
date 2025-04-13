// ======= Score Setup =======
let score = JSON.parse(localStorage.getItem("score")) || {
  wins: 0,
  losses: 0,
  ties: 0,
};

updateScoreElement();

// ======= Game Logic =======
function pickComputerMove() {
  const randomNumber = Math.random();

  if (randomNumber < 1 / 3) {
    return "rock";
  } else if (randomNumber < 2 / 3) {
    return "paper";
  } else {
    return "scissors";
  }
}

function playGame(playerMove) {
  const computerMove = pickComputerMove();
  let result = "";

  if (playerMove === computerMove) {
    result = "Tie";
    score.ties++;
  } else if (
    (playerMove === "rock" && computerMove === "scissors") ||
    (playerMove === "paper" && computerMove === "rock") ||
    (playerMove === "scissors" && computerMove === "paper")
  ) {
    result = "You win";
    score.wins++;
  } else {
    result = "You lose";
    score.losses++;
  }

  localStorage.setItem("score", JSON.stringify(score));
  updateScoreElement();

  // Show result and moves
  document.querySelector(".js-result").textContent = result;
  document.querySelector(".js-moves").innerHTML = `
    You <img src="Images/${playerMove}-emoji.png" alt="" class="move-icon" />
    <img src="Images/${computerMove}-emoji.png" alt="" class="move-icon" /> Computer
  `;
}

function updateScoreElement() {
  document.querySelector(
    ".js-score"
  ).textContent = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}

// ======= Auto Play Feature =======
let isAutoPlaying = false;
let intervalId;

function autoPlay() {
  if (!isAutoPlaying) {
    intervalId = setInterval(() => {
      const playerMove = pickComputerMove(); // Simulate random player move
      playGame(playerMove);
    }, 1000);
    isAutoPlaying = true;
    document.querySelector(".autoplay").textContent = "Pause";
  } else {
    clearInterval(intervalId);
    isAutoPlaying = false;
    document.querySelector(".autoplay").textContent = "Autoplay";
  }
}

// ======= Event Listeners =======
// Buttons for player moves
document.querySelector(".js-rock-button").addEventListener("click", () => {
  playGame("rock");
});

document.querySelector(".js-paper-button").addEventListener("click", () => {
  playGame("paper");
});

document.querySelector(".js-scissors-button").addEventListener("click", () => {
  playGame("scissors");
});

// Reset button
document.querySelector(".js-reset").addEventListener("click", () => {
  score.wins = 0;
  score.losses = 0;
  score.ties = 0;
  localStorage.setItem("score", JSON.stringify(score));
  updateScoreElement();
});

// Autoplay button
document.querySelector(".autoplay").addEventListener("click", () => {
  autoPlay();
});

document.body.addEventListener("keydown", (event) => {
  if (event.key === "r") {
    playGame("rock");
  } else if (event.key === "s") {
    playGame("scissors");
  } else if (event.key === "p") {
    playGame("paper");
  }
});
