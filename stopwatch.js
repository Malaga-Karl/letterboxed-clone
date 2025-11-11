let seconds = 0;
let timerInterval;

function startStopwatch() {
  const timerDisplay = document.getElementById("timer");

  timerInterval = setInterval(() => {
    seconds++;
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    timerDisplay.textContent = `${minutes}:${secs.toString().padStart(2, '0')}`;
  }, 1000);
}

function stopStopwatch() {
  clearInterval(timerInterval);
}

function resetStopwatch() {
  clearInterval(timerInterval);
  seconds = 0;
  document.getElementById("timer").textContent = "0:00";
}