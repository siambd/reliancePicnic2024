// Initialize canvas for fireworks
const canvas = document.getElementById('fireworks');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let fireworks = [];
let generatedNumber = null;

// Generate fireworks particles
function createFirework(x, y) {
    for (let i = 0; i < 80; i++) {
        fireworks.push({
            x,
            y,
            dx: Math.random() * 4 - 2,
            dy: Math.random() * 4 - 2,
            life: 200,
            color: `hsl(${Math.random() * 360}, 100%, 50%)`,
        });
    }
}

// Update and draw fireworks
function updateFireworks() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    fireworks.forEach((firework, index) => {
        firework.x += firework.dx;
        firework.y += firework.dy;
        firework.life -= 2;

        ctx.beginPath();
        ctx.arc(firework.x, firework.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = firework.color;
        ctx.fill();

        if (firework.life <= 0) fireworks.splice(index, 1);
    });
    requestAnimationFrame(updateFireworks);
}

// Start fireworks animation
function startFireworks() {
    const interval = setInterval(() => {
        createFirework(
            Math.random() * canvas.width,
            Math.random() * canvas.height
        );
    }, 300);

    setTimeout(() => clearInterval(interval), 5000);
}

// Handle "Click to Select Lucky Person" button
document.getElementById('pickAndCountdown').addEventListener('click', () => {
    const button = document.getElementById('pickAndCountdown');
    const countdownDisplay = document.getElementById('countdown');
    const revealButton = document.getElementById('revealNumber');
    const resultDisplay = document.getElementById('result');

    // Reset the previous result
    resultDisplay.textContent = '-';

    // Fixed range for the lottery
    const min = 1001;
    const max = 2401;

    // Generate random number
    generatedNumber = Math.floor(Math.random() * (max - min + 1)) + min;

    // Hide the button and show the countdown
    button.classList.add('d-none');
    countdownDisplay.classList.remove('d-none');

    let countdown = 5;
    countdownDisplay.textContent = `Revealing in: ${countdown} second${countdown > 1 ? 's' : ''}`;

    const interval = setInterval(() => {
        countdown--;
        if (countdown === 0) {
            clearInterval(interval);

            countdownDisplay.classList.add('d-none');
            revealButton.classList.remove('d-none');
        } else {
            countdownDisplay.textContent = `Revealing in: ${countdown} second${countdown > 1 ? 's' : ''}`;
        }
    }, 1000);
});

// Handle "Reveal Winning Number" button
document.getElementById('revealNumber').addEventListener('click', () => {
    const revealButton = document.getElementById('revealNumber');
    const loadingIndicator = document.getElementById('loading');

    // Show loading spinner and hide the reveal button
    revealButton.classList.add('d-none');
    loadingIndicator.classList.remove('d-none');

    setTimeout(() => {
        loadingIndicator.classList.add('d-none');
        document.getElementById('result').textContent = generatedNumber;

        // Start fireworks
        startFireworks();

        document.getElementById('pickAndCountdown').classList.remove('d-none');
    }, 2000);
});

// Fireworks animation loop
updateFireworks();
