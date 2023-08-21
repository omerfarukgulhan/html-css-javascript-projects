// Html and Css are imported from outside with some adjustments.
let countdown;
const buttons = document.querySelectorAll(".timer__button");
const userInput = document.querySelector("#custom");
const timerDisplay = document.querySelector(".display__time-left");
const endTime = document.querySelector(".display__end-time");

eventListener();

function eventListener() {
    buttons.forEach((button) => {
        button.addEventListener("click", startTimer);
    });

    userInput.addEventListener("submit", function (e) {
        const mins = this.minutes.value;
        timer(mins * 60);
        this.reset();
        e.preventDefault();
    });
}

function timer(seconds) {
    clearInterval(countdown);

    const now = Date.now();
    const totalTime = now + seconds * 1000;

    displayTimeLeft(seconds);
    displayEndTime(totalTime);

    countdown = setInterval(() => {
        const timeLeft = Math.round((totalTime - Date.now()) / 1000);

        if (timeLeft < 0) {
            clearInterval(countdown);
            alert("Time's up!");
            return;
        }
        displayTimeLeft(timeLeft);
    }, 1000);
}

function displayTimeLeft(seconds) {
    const reminderMinutes = Math.floor(seconds / 60);
    const reminderSeconds = seconds % 60;

    timerDisplay.textContent = `${reminderMinutes}:${reminderSeconds < 10 ? "0" : ""}${reminderSeconds}`;
}

function displayEndTime(timestamp) {
    const end = new Date(timestamp);
    const hour = end.getHours();
    const minutes = end.getMinutes();

    endTime.textContent = `Clock ends at ${hour}:${minutes < 10 ? "0" : ""}${minutes}`;
}

function startTimer() {
    const seconds = parseInt(this.dataset.time);
    console.log();
    timer(seconds);
}
