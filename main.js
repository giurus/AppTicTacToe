const selectBox = document.querySelector(".selectBox"),
  playBoard = document.querySelector(".playBoard"),
  allBox = document.querySelectorAll("section span"),
  players = document.querySelector(".players"),
  resultBox = document.querySelector(".resultBox"),
  selectXBtn = selectBox.querySelector(".playerX"),
  selectOBtn = selectBox.querySelector(".playerO"),
  wonText = resultBox.querySelector(".wonText"),
  replayBtn = resultBox.querySelector("button");

let playerXIcon = "fa-solid fa-xmark";
let playerOIcon = "fa-solid fa-circle-dot";
let playerSign = "X";
let runBot = true;

window.onload = () => {
  for (let i = 0; i < allBox.length; i++) {
    allBox[i].setAttribute("onClick", "clickedBox(this)");
  }

  selectXBtn.onclick = () => {
    selectBox.classList.add("hide");
    playBoard.classList.add("show");
  };
  selectOBtn.onclick = () => {
    selectBox.classList.add("hide");
    playBoard.classList.add("show");
    players.setAttribute("class", "players active player");
  };
};

function clickedBox(e) {
  if (players.classList.contains("player")) {
    e.innerHTML = `<i class="${playerOIcon}"></i>`;
    players.classList.remove("active");
    playerSign = "O";
    e.setAttribute("id", playerSign);
  } else {
    e.innerHTML = `<i class="${playerXIcon}"></i>`;
    players.classList.add("active");
    e.setAttribute("id", playerSign);
  }
  selectingWinner();
  playBoard.style.pointerEvents = "none";
  e.style.pointerEvents = "none";
  let randomDelayTime = (Math.random() * 1000 + 200).toFixed();
  setTimeout(() => {
    bot(runBot);
  }, randomDelayTime);
}

function bot(runBot) {
  if (runBot) {
    playerSign = "O";
    let array = [];
    for (let i = 0; i < allBox.length; i++) {
      if (allBox[i].childElementCount == 0) {
        array.push(i);
      }
    }
    let randomBox = array[Math.floor(Math.random() * array.length)];
    if (array.length > 0) {
      if (players.classList.contains("player")) {
        allBox[randomBox].innerHTML = `<i class="${playerXIcon}"></i>`;
        players.classList.add("active");
        playerSign = "X";
        allBox[randomBox].setAttribute("id", playerSign);
      } else {
        allBox[randomBox].innerHTML = `<i class="${playerOIcon}"></i>`;
        players.classList.remove("active");
        allBox[randomBox].setAttribute("id", playerSign);
      }
      selectingWinner();
    }
    allBox[randomBox].style.pointerEvents = "none";
    playBoard.style.pointerEvents = "auto";
    playerSign = "X";
  }
}

function getId(n) {
  return document.querySelector(".box" + n).id;
}

function check(v1, v2, v3, sign) {
  if (getId(v1) == sign && getId(v2) == sign && getId(v3) == sign) {
    return true;
  }
}

function selectingWinner() {
  if (
    check(1, 2, 3, playerSign) ||
    check(4, 5, 6, playerSign) ||
    check(7, 8, 9, playerSign) ||
    check(1, 4, 7, playerSign) ||
    check(2, 5, 8, playerSign) ||
    check(3, 6, 9, playerSign) ||
    check(1, 5, 9, playerSign) ||
    check(3, 5, 7, playerSign)
  ) {
    runBot = false;
    setTimeout(() => {
      playBoard.classList.remove("show");
      resultBox.classList.add("show");
    }, 700);
    wonText.innerHTML = `Player <p>${playerSign}</p> won the game!`;
  } else {
    if (
      getId(1) !== "" &&
      getId(2) !== "" &&
      getId(3) !== "" &&
      getId(4) !== "" &&
      getId(5) !== "" &&
      getId(6) !== "" &&
      getId(7) !== "" &&
      getId(8) !== "" &&
      getId(9) !== ""
    ) {
      runBot = false;
      setTimeout(() => {
        playBoard.classList.remove("show");
        resultBox.classList.add("show");
      }, 700);
      wonText.innerHTML = `Match has ended in draw!`;
    }
  }
}

replayBtn.onclick = () => {
  window.location.reload();
};
