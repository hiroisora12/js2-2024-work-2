const boardSize = 6;  // 6x6のボード
const colors = ['#ff6666', '#ffcc66', '#66ff66', '#66ccff', '#ff66cc'];  // 色の種類

const gameBoard = document.getElementById('game-board');
let board = [];

// ゲームボードの初期化
function initializeBoard() {
    board = [];
    gameBoard.innerHTML = '';  // ボードをクリア

    for (let i = 0; i < boardSize; i++) {
        const row = [];
        for (let j = 0; j < boardSize; j++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            const color = colors[Math.floor(Math.random() * colors.length)];
            cell.style.backgroundColor = color;
            cell.addEventListener('click', () => handleCellClick(i, j, color));

            row.push({ element: cell, color });
            gameBoard.appendChild(cell);
        }
        board.push(row);
    }
}

// セルがクリックされたときの処理
function handleCellClick(row, col, color) {
    alert(`セルがクリックされました！ 色: ${color}`);
    // ここで同じ色のツムを消すロジックを追加できます
}

// ゲーム開始
initializeBoard();
