
// ELEMENTOS DO HTML

const scoreDisplay = document.getElementById("score");
const timeDisplay = document.getElementById("time");
const recordDisplay = document.getElementById("record");

const gameArea = document.getElementById("game-area");
const target = document.getElementById("target");

const startScreen = document.getElementById("start-screen");
const endScreen = document.getElementById("end-screen");

const startButton = document.getElementById("start-button");
const restartButton = document.getElementById("restart-button");

const finalScore = document.getElementById("final-score");

// VARIÁVEIS DO JOGO

let score = 0;
let time = 30;

let gameInterval;
let targetInterval;

let targetSpeed = 1000;

let record = Number(localStorage.getItem("arcadeRecord")) || 0;

recordDisplay.textContent = record;

// ESCOLHER DIFICULDADE

const difficultyButtons = document.querySelectorAll(".difficulty");

difficultyButtons.forEach(button => {

    button.addEventListener("click", () => {

        targetSpeed = Number(button.dataset.speed);

        difficultyButtons.forEach(btn => {
            btn.classList.remove("selected");
        });

        button.classList.add("selected");

    });

});

// INICIAR JOGO

function startGame() {

    score = 0;
    time = 30;

    scoreDisplay.textContent = score;
    timeDisplay.textContent = time;

    startScreen.hidden = true;
    endScreen.hidden = true;
    target.hidden = false;

    clearInterval(gameInterval);
    clearInterval(targetInterval);

    moveTarget();

    // MOVIMENTAÇÃO DO ALVO

    targetInterval = setInterval(() => {
        moveTarget();
    }, targetSpeed);

    // CRONÔMETRO

    gameInterval = setInterval(() => {

        time--;

        timeDisplay.textContent = time;

        if (time <= 0) {
            endGame();
        }

    }, 1000);

}

// MOVER ALVO

function moveTarget() {

    const maxX = gameArea.clientWidth - target.offsetWidth;
    const maxY = gameArea.clientHeight - target.offsetHeight;

    const randomX = Math.floor(Math.random() * maxX);
    const randomY = Math.floor(Math.random() * maxY);

    target.style.left = randomX + "px";
    target.style.top = randomY + "px";

}

// SOMAR PONTOS

target.addEventListener("click", () => {

    if (time <= 0 || target.hidden) {
        return;
    }

    score++;

    scoreDisplay.textContent = score;

    moveTarget();

});

// FINALIZAR JOGO

function endGame() {

    clearInterval(gameInterval);
    clearInterval(targetInterval);

    target.hidden = true;
    endScreen.hidden = false;

    finalScore.textContent = score;

    if (score > record) {

        record = score;

        localStorage.setItem("arcadeRecord", record);

        recordDisplay.textContent = record;

    }

}

// BOTÕES

startButton.addEventListener("click", startGame);

restartButton.addEventListener("click", startGame);