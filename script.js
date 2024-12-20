let winningNumber;

function startChoosing() {
    const min = parseInt(document.getElementById('min').value);
    const max = parseInt(document.getElementById('max').value);

    if (isNaN(min) || isNaN(max) || min >= max) {
        alert("Please enter valid numbers with Min less than Max.");
        return;
    }

    // Reset UI
    document.getElementById('winner').innerText = '';
    document.getElementById('hiddenWinner').style.visibility = 'hidden';
    document.getElementById('hiddenWinner').classList.add('d-none');
    document.getElementById('spinner').classList.remove('d-none');
    document.getElementById('revealButton').classList.add('d-none');

    // Simulate choosing process with a 5-second delay
    setTimeout(() => {
        winningNumber = Math.floor(Math.random() * (max - min + 1)) + min;
        document.getElementById('spinner').classList.add('d-none');
        document.getElementById('revealButton').classList.remove('d-none');
    }, 0);
}

function revealWinner() {
    const revealButton = document.getElementById('revealButton');
    revealButton.innerText = "Revealing...";
    revealButton.disabled = true;

    // Simulate 5-second loading for reveal
    setTimeout(() => {
        revealButton.innerText = "Reveal Winning Number";
        revealButton.disabled = false;

        document.getElementById('hiddenWinner').classList.remove('d-none');
        document.getElementById('hiddenWinner').style.visibility = 'visible';
        document.getElementById('winner').innerText = winningNumber;
    }, 0);
}
