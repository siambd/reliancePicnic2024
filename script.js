// Initialize canvas for fireworks
const canvas = document.getElementById('fireworks');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let fireworks = [];
let generatedNumber = null;
let currentPrizeRank = 20; // Start from the 20th prize

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

// Handle "Start Lottery" button
document.getElementById('startLottery').addEventListener('click', () => {
    const startButton = document.getElementById('startLottery');
    const revealButton = document.getElementById('revealPrize');
    const countdownDisplay = document.getElementById('countdown');
    const prizeDisplay = document.getElementById('currentPrize');
    const resultDisplay = document.getElementById('result');

    // Reset displays
    resultDisplay.textContent = '-';
    prizeDisplay.textContent = `Prize: ${currentPrizeRank}th`;

    // Generate random number 1**********************************************************************************************************
    const min = 1001;
    const max = 2401;
    generatedNumber = Math.floor(Math.random() * (max - min + 1)) + min;

    // Hide the start button, show the countdown
    startButton.classList.add('d-none');
    countdownDisplay.classList.remove('d-none');

    /////genarate end 1

    let countdown = 5;
    countdownDisplay.textContent = `Revealing in: ${countdown} second${countdown > 1 ? 's' : ''}`;

    const interval = setInterval(() => {
        countdown--;
        if (countdown === 0) {
            clearInterval(interval);

            // Hide countdown, show "Reveal Prize" button
            countdownDisplay.classList.add('d-none');
            revealButton.classList.remove('d-none');
        } else {
            countdownDisplay.textContent = `Revealing in: ${countdown} second${countdown > 1 ? 's' : ''}`;
        }
    }, 1000);
});

// Handle "Reveal Prize" button
document.getElementById("revealPrize").addEventListener("click", () => {
    const revealButton = document.getElementById("revealPrize");
    const loadingIndicator = document.getElementById("loading");
    const prizeDisplay = document.getElementById("currentPrize");
    const resultDisplay = document.getElementById("result");

    // Show loading spinner and hide the reveal button
    revealButton.classList.add("d-none");
    loadingIndicator.classList.remove("d-none");

    setTimeout(() => {
        // Hide loading spinner
        loadingIndicator.classList.add("d-none");

        // Display the winning number and prize
        resultDisplay.textContent = generatedNumber;
        prizeDisplay.textContent = `Prize: ${currentPrizeRank}th`;

        // Update the prize image and description
        updatePrizeDetails(currentPrizeRank);

        // Trigger fireworks
        startFireworks();

        // Update prize rank
        currentPrizeRank--;
        if (currentPrizeRank > 0) {
            document.getElementById("startLottery").classList.remove("d-none");
        } else {
            alert("All prizes have been drawn!");
        }
    }, 100); // 2 seconds loading time
});


// Fireworks animation loop
updateFireworks();



// List of prizes
const prizes = {
    20: { image: "20.jpg", text: "20th Prize: Non Stickey cookware 1 pcs " },
    19: { image: "19.jpg", text: "19th Prize: Rice cookware " },
    18: { image: "18.jpg", text: "18th Prize: Celling Fan " },
    17: { image: "17.jpg", text: "17th Prize: Blanket" },
    16: { image: "16.jpg", text: "16th Prize: Blanket" },
    15: { image: "15.jpg", text: "15th Prize:Electric Blender machine" },
    14: { image: "14.jpg", text: "14th Prize: Smart Watch " },
    13: { image: "13.jpg", text: "13th Prize: Stand Fan " },
    12: { image: "12.jpg", text: "12th Prize: Pressure Cookware" },
    11: { image: "11.jpg", text: "11th Prize: Dinner Ser " },
    10: { image: "10.jpg", text: "10th Prize: Smart Phone" },
    9: { image: "9.jpg", text: "9th Prize: Microwave woven " },
    8: { image: "8.jpg", text: "8th Prize: Filter" },
    7: { image: "7.jpg", text: "7th Prize: Smart Tv  32" },
    6: { image: "6.jpg", text: "6th Prize: Washing Machine " },
    5: { image: "5.jpg", text: "5th Prize:laptop" },
    4: { image: "4.jpg", text: "4th Prize: Refrigarator (278 ltr)" },
    3: { image: "3.jpg", text: "3rd Prize:Air condition (1 ton)" },
    2: { image: "2.jpg", text: "2nd Prize: Smart Tv " },
    1: { image: "1.jpg", text: "1st Prize: Deep Refrigarator " },
};

// Update prize details dynamically
function updatePrizeDetails(rank) {
    const prizeDetails = prizes[rank];
    if (prizeDetails) {
        document.getElementById("prizeImage").src = `images/${prizeDetails.image}`;
        document.getElementById("prizeText").textContent = prizeDetails.text;
        document.getElementById("prizeDetails").classList.remove("d-none");
    }
}




// hide prizes 

// Reset prize details
function resetPrizeDetails() {
    const prizeDetailsSection = document.getElementById("prizeDetails");
    const prizeImage = document.getElementById("prizeImage");
    const prizeText = document.getElementById("prizeText");

    // Hide the prize details section
    prizeDetailsSection.classList.add("d-none");

    // Clear the prize image and text
    prizeImage.src = "";
    prizeText.textContent = "";
}

// Handle "Start Lottery" button
document.getElementById("startLottery").addEventListener("click", () => {
    const startButton = document.getElementById("startLottery");
    const revealButton = document.getElementById("revealPrize");
    const countdownDisplay = document.getElementById("countdown");
    const prizeDisplay = document.getElementById("currentPrize");
    const resultDisplay = document.getElementById("result");

    // Reset displays
    resetPrizeDetails(); // Clear previous prize details
    resultDisplay.textContent = '-';
    prizeDisplay.textContent = `Prize: ${currentPrizeRank}th`;

    // Generate random number   original ************************************************************
    // const min = 1;
    // const max = 5;
    // generatedNumber = Math.floor(Math.random() * (max - min + 1)) + min;

    // Hide the start button, show the countdown
    startButton.classList.add("d-none");
    countdownDisplay.classList.remove("d-none");

    let countdown = 5;
    countdownDisplay.textContent = `Revealing in: ${countdown} second${countdown > 1 ? 's' : ''}`;

    const interval = setInterval(() => {
        countdown--;
        if (countdown === 0) {
            clearInterval(interval);

            // Hide countdown, show "Reveal Prize" button
            countdownDisplay.classList.add("d-none");
            revealButton.classList.remove("d-none");
        } else {
            countdownDisplay.textContent = `Revealing in: ${countdown} second${countdown > 1 ? 's' : ''}`;
        }
    }, 1000);
});







