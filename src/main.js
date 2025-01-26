const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreDisplay = document.getElementById('score');
const timerDisplay = document.getElementById('timer');
const rankingList = document.getElementById('rankingList');

let score = 0;
let timeLeft = 30;
let gameInterval;
let circle; // 現在表示されている円
let intervalTime = 1000; // 初期の円の出現間隔（ミリ秒）

// Canvasサイズの設定
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// 円オブジェクト
class Circle {
  constructor() {
    this.x = Math.random() * canvas.width; // ランダムなx座標
    this.y = Math.random() * canvas.height; // ランダムなy座標
    this.radius = 50; // 初期半径50ピクセル
    this.color = 'red'; // 色を赤に固定
  }

  // 円を描画
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
  }

  // クリックした位置が円の中か判定
  isClicked(x, y) {
    const distance = Math.hypot(x - this.x, y - this.y);
    return distance < this.radius;
  }

  // 得点に応じて円の大きさを変更
  updateSize(score) {
    // 得点が10増えるごとに円を15ピクセル小さくする
    this.radius = Math.max(10, 50 - Math.floor(score / 10) * 15); // 最小半径は10
  }
}

// ゲーム開始
function startGame() {
  score = 0;
  timeLeft = 30;
  scoreDisplay.textContent = `得点: ${score}`;
  timerDisplay.textContent = `残り時間: ${timeLeft}秒`;

  // 最初の円を生成
  circle = new Circle();

  // ゲームの更新を一定間隔で呼び出す
  gameInterval = setInterval(updateGame, intervalTime);
}

// ゲームの更新
function updateGame() {
  timeLeft--;
  timerDisplay.textContent = `残り時間: ${timeLeft}秒`;

  // 背景をクリアして円を描画
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  circle.draw();

  // 得点が10の倍数の時に出現スピードを速くする
  if (score % 10 === 0 && score > 0) {
    // 出現スピードを速くする（間隔を短くする）
    const newIntervalTime = Math.max(200, intervalTime - 100); // 最小間隔200msに設定
    if (newIntervalTime !== intervalTime) {
      intervalTime = newIntervalTime;
      clearInterval(gameInterval); // 既存のインターバルをクリア
      gameInterval = setInterval(updateGame, intervalTime); // 新しいインターバルで更新
    }
  }

  if (timeLeft <= 0) {
    clearInterval(gameInterval);
    showRanking();
  }
}

// 円がクリックされたかどうかを判定
canvas.addEventListener('click', (event) => {
  const { offsetX, offsetY } = event;

  if (circle.isClicked(offsetX, offsetY)) {
    score++; // 得点を加算
    scoreDisplay.textContent = `得点: ${score}`;

    // 円の大きさを得点に応じて更新
    circle.updateSize(score);

    // 新しい円を生成して表示
    circle = new Circle();
  }
});

// ランキングを表示
function showRanking() {
  const rankingItem = document.createElement('li');
  rankingItem.textContent = `あなたの得点: ${score}`;
  rankingList.appendChild(rankingItem);
}

// ゲーム開始
window.onload = startGame;
