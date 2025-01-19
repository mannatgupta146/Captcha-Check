// Function to generate random CAPTCHA text
function generateCaptcha() {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let captcha = "";
    for (let i = 0; i < 6; i++) {
        captcha += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return captcha;
}

// Play the CAPTCHA text aloud using speech synthesis
function speakCaptcha(captchaText) {
    const speech = new SpeechSynthesisUtterance();
    speech.text = `The CAPTCHA is ${captchaText.split("").join(", ")}`; // Spells out each character
    speech.lang = "en-US";
    speech.pitch = 1;
    speech.rate = 1;
    speech.volume = 1;
    window.speechSynthesis.speak(speech);
}

// Event listener for 'Hear Captcha' button
document.getElementById("playCaptcha").addEventListener("click", function () {
    const captchaText = document.getElementById("captchaText").textContent;
    speakCaptcha(captchaText);
});

// Event listener for 'Verify' button
document.getElementById("verifyCaptcha").addEventListener("click", function () {
    const userCaptcha = document.getElementById("captchaInput").value;
    const generatedCaptcha = document.getElementById("captchaText").textContent;
    const messageElement = document.getElementById("message");
    const timerElement = document.getElementById("timer");

    if (userCaptcha === generatedCaptcha) {
        messageElement.textContent = "CAPTCHA is correct, Here you go!";
        messageElement.className = "message success show"; // Show the success message
        timerElement.style.display = "none"; // Hide the timer on success
    } else {
        messageElement.textContent = "Incorrect CAPTCHA, please try again.";
        messageElement.className = "message error show"; // Show the error message
    }
});

// Timer functionality
let timer;
function startTimer() {
    let timeLeft = 30; // 30 seconds timer
    const timerElement = document.getElementById("timer");
    timerElement.textContent = `Time remaining: ${timeLeft} seconds`;

    timer = setInterval(() => {
        timeLeft -= 1;
        timerElement.textContent = `Time remaining: ${timeLeft} seconds`;

        if (timeLeft <= 0) {
            clearInterval(timer);
            timerElement.textContent = "Time is up! Please refresh the CAPTCHA.";
            document.getElementById("verifyCaptcha").disabled = true;
        }
    }, 1000);
}

// Handle CAPTCHA refresh
document.getElementById("refresh-btn").addEventListener("click", () => {
    const newCaptcha = generateCaptcha();
    document.getElementById("captchaText").textContent = newCaptcha;
    clearInterval(timer); // Reset the timer
    startTimer(); // Start a new timer
    document.getElementById("captchaInput").value = ""; // Clear the input field
    document.getElementById("message").classList.remove("show"); // Hide any previous message
    document.getElementById("verifyCaptcha").disabled = false; // Re-enable the Verify button
    document.getElementById("timer").style.display = "block"; // Ensure timer is visible after refresh
});

// Initialize CAPTCHA and Timer
let generatedCaptcha = generateCaptcha();
document.getElementById("captchaText").textContent = generatedCaptcha;
startTimer();
