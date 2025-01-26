// スケジュールの追加
const addButton = document.getElementById('add-button');
const titleInput = document.getElementById('schedule-title');
const dateInput = document.getElementById('schedule-date');
const scheduleList = document.getElementById('schedule-list');

// スケジュールをローカルストレージに保存する関数
function saveSchedules(schedules) {
  localStorage.setItem('schedules', JSON.stringify(schedules));
}

// スケジュールをリストに表示する関数
function displaySchedules() {
  const schedules = JSON.parse(localStorage.getItem('schedules')) || [];
  scheduleList.innerHTML = ''; // 既存のリストをクリア

  schedules.forEach((schedule, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <span>${schedule.title} - ${schedule.date}</span>
      <button class="delete-btn" data-index="${index}">削除</button>
    `;
    scheduleList.appendChild(li);
  });

  // 削除ボタンにイベントリスナーを追加
  const deleteButtons = document.querySelectorAll('.delete-btn');
  deleteButtons.forEach(button => {
    button.addEventListener('click', (event) => {
      const index = event.target.getAttribute('data-index');
      deleteSchedule(index);
    });
  });
}

// スケジュールを追加する関数
function addSchedule() {
  const title = titleInput.value.trim();
  const date = dateInput.value.trim();

  if (!title || !date) {
    alert('予定のタイトルと日付を入力してください');
    return;
  }

  const schedules = JSON.parse(localStorage.getItem('schedules')) || [];
  schedules.push({ title, date });
  saveSchedules(schedules);
  displaySchedules();

  // 入力フィールドをクリア
  titleInput.value = '';
  dateInput.value = '';
}

// スケジュールを削除する関数
function deleteSchedule(index) {
  const schedules = JSON.parse(localStorage.getItem('schedules')) || [];
  schedules.splice(index, 1);  // 指定されたインデックスで削除
  saveSchedules(schedules);
  displaySchedules(); // リストを再表示
}

// 初期表示
displaySchedules();

// イベントリスナー
addButton.addEventListener('click', addSchedule);
