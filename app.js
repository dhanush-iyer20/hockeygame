const ball = document.querySelector(".ball");
const container = document.querySelector(".container");
const left_player = document.querySelector(".left_player");
const right_player = document.querySelector(".right_player");
const player1score = document.querySelector(".player1score");
const player2score = document.querySelector(".player2score");
const modal = document.querySelector(".modal");
const play_game = document.querySelector(".play_game");
const resetgame = document.querySelector(".reset");
const win_statement = document.querySelector(".win_statement");
const pause = document.querySelector(".pause");
ball.style.position = "absolute";
modal.style.position = "absolute";
left_player.style.position = "absolute";
right_player.style.position = "absolute";
player1score.style.position = "absolute";
player2score.style.position = "absolute";
player1score.style.left = window.innerWidth / 2 - 30 + "px";
modal.style.left = window.innerWidth / 2 - 300 + "px";
player2score.style.left = window.innerWidth / 2 + 30 + "px";
player1score.style.top = 10 + "px";
modal.style.top = window.innerHeight / 2 - 200 + "px";
player2score.style.top = 10 + "px";
let lastRoundWin = true;
let scoreOfPlayer1 = 0;
let scoreOfPlayer2 = 0;
let t = 0;
let l = 0;
var x = document.createElement("AUDIO");
var y = document.createElement("AUDIO");
let counter = 1;
if (x.canPlayType("audio/mpeg")) {
  x.setAttribute("src", "horse.mp3");
}
if (y.canPlayType("audio/mpeg")) {
  y.setAttribute("src", "of.mp3");
}

x.setAttribute("loop", "loop");
document.body.appendChild(x);
console.log(window.innerWidth);
let leftPlayerTop;
let leftPlayerLeft;
let rightPlayerLeft;

play_game.addEventListener("click", () => {
  pause.style.visibility = "visible";
  resetgame.style.visibility = "hidden";
  if (play_game.textContent === "Resume") {
    x.play();
    modal.style.visibility = "hidden";
    ball.style.visibility = "visible";
    play();
  } else {
    left_player.style.top = leftPlayerTop + "px";
    left_player.style.left = leftPlayerLeft - 100 + "px";
    right_player.style.top = leftPlayerTop + "px";
    right_player.style.left = rightPlayerLeft + "px";
    x.play();
    modal.style.visibility = "hidden";
    ball.style.visibility = "visible";
    reset();
    play();
  }
});
window.addEventListener("DOMContentLoaded", () => {
  container.style.visibility = "visible";
  ball.style.visibility = "hidden";
  play_game.textContent = "Click to start";
  win_statement.innerText = "Browser Hockey";
  leftPlayerTop = left_player.offsetTop;
  leftPlayerLeft = left_player.offsetLeft;
  rightPlayerLeft = right_player.offsetLeft;
  pause.style.visibility = "hidden";
  resetgame.style.visibility = "hidden";
});

let bottomCrash = false;
let topCrash = true;
let rightCrash = false;
let leftCrash = true;
let timerId;
const play = () => {
  timerId = setInterval(() => {
    if (t > window.innerHeight - 50) {
      bottomCrash = true;
      topCrash = false;
    } else if (t < 0) {
      bottomCrash = false;
      topCrash = true;
    }
    if (l > window.innerWidth) {
      scoreOfPlayer1 = scoreOfPlayer1 + 1;
      player1score.innerText = scoreOfPlayer1;
      console.log(scoreOfPlayer1);
      lastRoundWin = true;
      y.play();
      reset();
    } else if (l < 0) {
      scoreOfPlayer2 = scoreOfPlayer2 + 1;
      player2score.innerText = scoreOfPlayer2;
      console.log(scoreOfPlayer2);
      lastRoundWin = false;
      y.play();
      reset();
    }

    if (
      ball.offsetLeft < right_player.offsetLeft + right_player.offsetWidth &&
      ball.offsetLeft + ball.offsetWidth > right_player.offsetLeft &&
      ball.offsetTop < right_player.offsetTop + right_player.offsetHeight &&
      ball.offsetTop + ball.offsetHeight > right_player.offsetTop
    ) {
      rightCrash = true;
      leftCrash = false;
    } else if (
      left_player.offsetLeft < ball.offsetLeft + ball.offsetWidth &&
      left_player.offsetLeft + left_player.offsetWidth > ball.offsetLeft &&
      left_player.offsetTop < ball.offsetTop + ball.offsetHeight &&
      left_player.offsetTop + left_player.offsetHeight > ball.offsetTop
    ) {
      rightCrash = false;
      leftCrash = true;
    }

    if (bottomCrash && leftCrash) {
      t = t - 10;
      l = l + 10;
    } else if (bottomCrash && rightCrash) {
      t = t - 10;
      l = l - 10;
    } else if (topCrash && leftCrash) {
      t = t + 10;
      l = l + 10;
    } else if (topCrash && rightCrash) {
      t = t + 10;
      l = l - 10;
    }
    ball.style.top = t + "px";
    ball.style.left = l + "px";
  }, 15);
};
window.addEventListener("keydown", (e) => {
  if (e.key === "ArrowUp") {
    if (right_player.offsetTop > 0) {
      right_player.style.top = right_player.offsetTop - 20 + "px";
    }
  } else if (e.key === "ArrowDown") {
    if (right_player.offsetTop < window.innerHeight - 100) {
      right_player.style.top = right_player.offsetTop + 20 + "px";
    }
  } else if (e.key === "s") {
    if (left_player.offsetTop < window.innerHeight - 100) {
      left_player.style.top = left_player.offsetTop + 20 + "px";
    }
  } else if (e.key === "w") {
    if (left_player.offsetTop > 0) {
      left_player.style.top = left_player.offsetTop - 20 + "px";
    }
  } else if (e.key === "p") {
    pauseFunction();
  }
});
const reset = () => {
  y.currentTime = 0;
  if (scoreOfPlayer1 === 5) {
    scoreOfPlayer1 = 0;
    scoreOfPlayer2 = 0;
    modal.style.visibility = "visible";
    win_statement.innerText = "Player 1 won";
    play_game.textContent = "Play again";
    pause.style.visibility = "hidden";
    clearInterval(timerId);
  } else if (scoreOfPlayer2 === 5) {
    scoreOfPlayer1 = 0;
    scoreOfPlayer2 = 0;
    modal.style.visibility = "visible";
    win_statement.innerText = "Player 2 won";
    play_game.textContent = "Play again";
    pause.style.visibility = "hidden";

    clearInterval(timerId);
  }
  player1score.innerText = scoreOfPlayer1;
  player2score.innerText = scoreOfPlayer2;
  ball.style.top = window.innerHeight / 2 + "px";
  ball.style.left = window.innerWidth / 2 + "px";
  t = ball.offsetTop;
  l = ball.offsetLeft;
  if (lastRoundWin) {
    bottomCrash = false;
    topCrash = true;
    rightCrash = false;
    leftCrash = true;
  } else {
    bottomCrash = true;
    topCrash = false;
    rightCrash = true;
    leftCrash = false;
  }
};

pause.addEventListener("click", () => {
  pauseFunction();
});
resetgame.addEventListener("click", () => {
  x.currentTime = 0;
  pause.style.visibility = "visible";
  left_player.style.top = leftPlayerTop + "px";
  left_player.style.left = leftPlayerLeft - 100 + "px";
  right_player.style.top = leftPlayerTop + "px";
  right_player.style.left = rightPlayerLeft + "px";
  x.play();
  modal.style.visibility = "hidden";
  ball.style.visibility = "visible";
  reset();
  play();
  resetgame.style.visibility = "hidden";
  scoreOfPlayer1 = 0;
  scoreOfPlayer2 = 0;
  player1score.innerText = scoreOfPlayer1;
  player2score.innerText = scoreOfPlayer2;
});

const pauseFunction = () => {
  clearInterval(timerId);
  x.pause();
  modal.style.visibility = "visible";
  win_statement.innerText = "Game paused";
  play_game.textContent = "Resume";
  resetgame.style.visibility = "visible";
  resetgame.textContent = "Restart";
  pause.style.visibility = "hidden";
};
