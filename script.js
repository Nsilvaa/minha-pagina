
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
const backButton = document.getElementById("back-button");

const finalScore = document.getElementById("final-score");

const difficultyButtons = document.querySelectorAll(".difficulty");
const difficultyStatus = document.getElementById("difficulty-status");

// VARIÁVEIS

let score = 0;
let time = 30;

let gameInterval;
let targetInterval;

let targetSpeed = 900;
let selectedDifficulty = "MÉDIO";

let record = Number(localStorage.getItem("arcadeRecord")) || 0;

recordDisplay.textContent = record;

// ESCOLHER DIFICULDADE

difficultyButtons.forEach(button => {

    button.addEventListener("click", () => {

        targetSpeed = Number(button.dataset.speed);

        selectedDifficulty = button.textContent.trim();

        difficultyButtons.forEach(btn => {

            btn.classList.remove("selected");
            btn.setAttribute("aria-pressed", "false");

        });

        button.classList.add("selected");
        button.setAttribute("aria-pressed", "true");

        difficultyStatus.textContent =
            "✓ Dificuldade selecionada: " + selectedDifficulty;

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
    backButton.hidden = false;

    clearInterval(gameInterval);
    clearInterval(targetInterval);

    moveTarget();

    // VELOCIDADE CONFORME A DIFICULDADE

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

    const maxX = Math.max(0, gameArea.clientWidth - target.offsetWidth);
    const maxY = Math.max(0, gameArea.clientHeight - target.offsetHeight);

    const randomX = Math.floor(Math.random() * (maxX + 1));
    const randomY = Math.floor(Math.random() * (maxY + 1));

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
    backButton.hidden = true;

    endScreen.hidden = false;

    finalScore.textContent = score;

    if (score > record) {

        record = score;

        localStorage.setItem("arcadeRecord", record);

        recordDisplay.textContent = record;

    }

}

// VOLTAR PARA ESCOLHER DIFICULDADE

function backToMenu() {

    clearInterval(gameInterval);
    clearInterval(targetInterval);

    target.hidden = true;
    backButton.hidden = true;

    endScreen.hidden = true;
    startScreen.hidden = false;

    // Reinicia a pontuação e o tempo exibidos

    score = 0;
    time = 30;

    scoreDisplay.textContent = score;
    timeDisplay.textContent = time;

}

// BOTÕES

startButton.addEventListener("click", startGame);

restartButton.addEventListener("click", startGame);

backButton.addEventListener("click", backToMenu);