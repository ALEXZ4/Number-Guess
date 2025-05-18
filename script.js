document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const guessInputElement = document.getElementById('guess-input');
    const guessButton = document.getElementById('guess-button');
    const hintMessageElement = document.getElementById('hint-message');
    const attemptsMessageElement = document.getElementById('attempts-message');
    const winMessageContainer = document.getElementById('win-message-container');
    const winMessageTextElement = document.getElementById('win-message-text');
    const restartButton = document.getElementById('restart-button');
    const instructionsElement = document.querySelector('.instructions'); // To update range

    // Game Variables
    const MIN_NUMBER = 1;
    const MAX_NUMBER = 100;
    let secretNumber;
    let attemptsLeft;
    const MAX_ATTEMPTS = 10; // You can adjust the number of allowed attempts

    // --- Game Functions ---

    function generateSecretNumber() {
        return Math.floor(Math.random() * (MAX_NUMBER - MIN_NUMBER + 1)) + MIN_NUMBER;
    }

    function startGame() {
        secretNumber = generateSecretNumber();
        attemptsLeft = MAX_ATTEMPTS;

        // Reset UI
        guessInputElement.value = '';
        guessInputElement.disabled = false;
        guessButton.disabled = false;
        hintMessageElement.textContent = '';
        attemptsMessageElement.textContent = `You have ${attemptsLeft} attempts remaining.`;
        winMessageContainer.style.display = 'none';
        instructionsElement.textContent = `I'm thinking of a number between ${MIN_NUMBER} and ${MAX_NUMBER}. Can you guess it?`;

        console.log(`Secret Number (for testing): ${secretNumber}`); // For testing purposes
    }

    function handleGuess() {
        const userGuess = parseInt(guessInputElement.value);

        // Validate input
        if (isNaN(userGuess) || userGuess < MIN_NUMBER || userGuess > MAX_NUMBER) {
            displayHint(`Please enter a valid number between ${MIN_NUMBER} and ${MAX_NUMBER}.`, 'error');
            guessInputElement.value = ''; // Clear invalid input
            return;
        }

        attemptsLeft--;

        if (userGuess === secretNumber) {
            displayWinMessage(`Congratulations! You guessed the number ${secretNumber} correctly!`);
        } else if (attemptsLeft === 0) {
            displayLossMessage(`Game Over! The number was ${secretNumber}.`);
        } else {
            const hint = userGuess < secretNumber ? 'Too Low!' : 'Too High!';
            displayHint(hint);
            attemptsMessageElement.textContent = `You have ${attemptsLeft} attempts remaining.`;
        }
        guessInputElement.value = ''; // Clear input after guess
        guessInputElement.focus(); // Keep focus on input
    }

    function displayHint(message, type = 'info') {
        hintMessageElement.textContent = message;
        if (type === 'error') {
            hintMessageElement.style.color = '#ff6b6b'; // Coral red for errors
        } else {
            hintMessageElement.style.color = '#feca57'; // Default yellow for hints
        }
    }

    function displayWinMessage(message) {
        winMessageTextElement.textContent = message;
        winMessageContainer.style.display = 'block';
        hintMessageElement.textContent = ''; // Clear previous hints
        attemptsMessageElement.textContent = `It took you ${MAX_ATTEMPTS - attemptsLeft} guesses.`;
        guessInputElement.disabled = true;
        guessButton.disabled = true;
    }

    function displayLossMessage(message) {
        winMessageTextElement.textContent = message;
        winMessageContainer.style.display = 'block';
        winMessageContainer.style.backgroundColor = 'rgba(255, 107, 107, 0.8)'; // Reddish for loss
        hintMessageElement.textContent = '';
        attemptsMessageElement.textContent = 'Better luck next time!';
        guessInputElement.disabled = true;
        guessButton.disabled = true;
    }

    // --- Event Listeners ---
    guessButton.addEventListener('click', handleGuess);

    // Allow pressing Enter key to submit guess
    guessInputElement.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            handleGuess();
        }
    });

    restartButton.addEventListener('click', startGame);

    // --- Initialize Game ---
    startGame();
});
