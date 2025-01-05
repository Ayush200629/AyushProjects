let boxes = document.querySelectorAll(".box");
let statusText = document.querySelector("#status");
let modal = document.querySelector("#winner-popup");
let winnerMessage = document.querySelector("#winner-message");
let closePopupBtn = document.querySelector("#close-popup-btn");
let pointsO = document.querySelector("#points-o"); // Element to display Player O's points
let pointsX = document.querySelector("#points-x"); // Element to display Player X's points
let turnO = true;
let gameOver = false;
let scoreO = 0; // Player O's score
let scoreX = 0; // Player X's score

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

const updateStatus = () => {
    statusText.innerText = gameOver ? "Game Over" : `Player ${turnO ? 'O' : 'X'}'s turn`;
};

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (gameOver || box.innerText) return; // Prevent action if game is over or box is already filled

        box.innerText = turnO ? "O" : "X";
        box.classList.add("disabled");
        box.disabled = true;

        checkWinner();
        turnO = !turnO;
        updateStatus();
    });
});

const checkWinner = () => {
    for (let pattern of winPatterns) {
        let pos1 = boxes[pattern[0]].innerText;
        let pos2 = boxes[pattern[1]].innerText;
        let pos3 = boxes[pattern[2]].innerText;

        if (pos1 !== "" && pos1 === pos2 && pos2 === pos3) {
            showPopup(`Congratulations, Player ${pos1} wins!`);
            gameOver = true;
            highlightWinningPattern(pattern);
            disableAllBoxes();
            updateScore(pos1); // Update score for the winning player
            return;
        }
    }

    // Check for a draw
    if ([...boxes].every(box => box.innerText !== "")) {
        showPopup("It's a draw!");
        gameOver = true;
    }
};

const updateScore = (winner) => {
    if (winner === "O") {
        scoreO++;
        pointsO.innerText = scoreO; // Update Player O's score
    } else if (winner === "X") {
        scoreX++;
        pointsX.innerText = scoreX; // Update Player X's score
    }
};

const highlightWinningPattern = (pattern) => {
    pattern.forEach(index => {
        boxes[index].style.backgroundColor = "#90ee90";
    });
};

const disableAllBoxes = () => {
    boxes.forEach(box => {
        box.disabled = true;
        box.classList.add("disabled");
    });
};

const showPopup = (message) => {
    winnerMessage.innerText = message;
    modal.classList.add("show");
    winnerMessage.style.animation = "none"; // Reset animation
    setTimeout(() => {
        winnerMessage.style.animation = ""; // Trigger animation
    }, 10);
};

closePopupBtn.addEventListener("click", () => {
    modal.classList.remove("show");
    resetGame();
});

const resetGame = () => {
    boxes.forEach(box => {
        box.innerText = "";
        box.style.backgroundColor = "#ffffc7";
        box.disabled = false;
        box.classList.remove("disabled");
    });
    turnO = true;
    gameOver = false;
    statusText.innerText = "Player O's turn";
    winnerMessage.innerText = ""; // Clear previous winner message
};

// Initial call to set up the status
updateStatus();
