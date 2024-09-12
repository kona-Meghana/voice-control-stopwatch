let startTime, updatedTime, difference = 0, timerInterval;
let running = false;

const display = document.getElementById("display");
const startButton = document.getElementById("startButton");
const stopButton = document.getElementById("stopButton");
const resetButton = document.getElementById("resetButton");

startButton.addEventListener("click", startStopwatch);
stopButton.addEventListener("click", stopStopwatch);
resetButton.addEventListener("click", resetStopwatch);

function updateTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;
    
    const seconds = Math.floor((difference / 1000) % 60);
    const minutes = Math.floor((difference / (1000 * 60)) % 60);
    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    
    display.innerHTML = (hours < 10 ? "0" : "") + hours + ":" +
                        (minutes < 10 ? "0" : "") + minutes + ":" +
                        (seconds < 10 ? "0" : "") + seconds;
}

function startStopwatch() {
    if (!running) {
        running = true;
        startTime = new Date().getTime() - difference;  // Continue from the stopped time
        timerInterval = setInterval(updateTime, 1000);
    }
}

function stopStopwatch() {
    if (running) {
        running = false;
        clearInterval(timerInterval);
    }
}

function resetStopwatch() {
    running = false;
    clearInterval(timerInterval);
    display.innerHTML = "00:00:00";
    difference = 0;
}

// Voice Commands
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.onresult = function(event) {
    const command = event.results[0][0].transcript.toLowerCase();
    console.log("Command:", command);

    if (command.includes("start")) {
        startStopwatch();
    } else if (command.includes("stop")) {
        stopStopwatch();
    } else if (command.includes("reset")) {
        resetStopwatch();
    }
};

recognition.onerror = function(event) {
    console.error("Speech recognition error", event);
};

// Start listening for voice commands
document.body.addEventListener("click", () => {
    recognition.start();
});
