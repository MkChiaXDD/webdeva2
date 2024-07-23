// Query selectors to get the buttons and elements
const page1btn = document.querySelector("#page1btn");
const page2btn = document.querySelector("#page2btn");
const page3btn = document.querySelector("#page3btn");
const page4btn = document.querySelector("#page4btn");
const allpages = document.querySelectorAll(".page");
const hamBtn = document.querySelector("#hamIcon");
const menuItemsList = document.querySelector("nav ul");
const fireSound = document.getElementById('fireSound');

// Enable looping for the fire sound effect
fireSound.loop = true;

// Function to remove the active class from all buttons
function removeActiveClass() {
    const allBtns = [page1btn, page2btn, page3btn, page4btn];
    allBtns.forEach(btn => btn.classList.remove("active"));
}

// Function to show the selected page and hide all others
function show(pgno) {
    hideall(() => {
        removeActiveClass();
        let onepage = document.querySelector("#page" + pgno);
        onepage.style.display = "flex";
        setTimeout(() => {
            onepage.classList.add("fade-in");
        }, 10);
        document.querySelector("#page" + pgno + "btn").classList.add("active");
    });
}

// Show the first page by default
show(1);

// Function to hide all pages with a fade-out effect
function hideall(callback) {
    let counter = allpages.length;
    for (let onepage of allpages) {
        onepage.classList.remove("fade-in");
        onepage.classList.add("fade-out");
        setTimeout(() => {
            onepage.style.display = "none";
            onepage.classList.remove("fade-out");
            counter--;
            if (counter === 0) {
                callback();
            }
        }, 500);
    }
}

// Event listeners for page navigation buttons
page1btn.addEventListener("click", () => show(1));
page2btn.addEventListener("click", () => show(2));
page3btn.addEventListener("click", () => show(3));
page4btn.addEventListener("click", () => show(4));

// Toggle the navigation menu for small screens
hamBtn.addEventListener("click", () => {
    menuItemsList.classList.toggle("show-menu");
});

// Show a confirmation message before leaving the page
document.addEventListener('DOMContentLoaded', () => {
    const showLeavingMessage = (event) => {
        event.preventDefault();
        if (confirm("You are about to leave this page. Do you want to continue?")) {
            window.open(event.target.href, '_blank');
        }
    }

    document.getElementById('restaurant1link').addEventListener('click', showLeavingMessage);
    document.getElementById('restaurant2link').addEventListener('click', showLeavingMessage);
    document.getElementById('restaurant3link').addEventListener('click', showLeavingMessage);
});

// Subpage navigation setup
const subpage1btn = document.querySelector("#subpage1btn");
const subpage2btn = document.querySelector("#subpage2btn");
const subpage3btn = document.querySelector("#subpage3btn");
const subpage4btn = document.querySelector("#subpage4btn");
const allsubpages = document.querySelectorAll(".subpage");
const mainContent = document.querySelector("#main-content");
const backbtns = document.querySelectorAll(".backbtn");

// Hide all subpages by default
hideallsub();

// Function to hide all subpages with a fade-out effect
function hideallsub(callback) {
    let counter = allsubpages.length;
    for (let onesubpage of allsubpages) {
        onesubpage.classList.remove("fade-in");
        onesubpage.classList.add("fade-out");
        setTimeout(() => {
            onesubpage.style.display = "none";
            onesubpage.classList.remove("fade-out");
            counter--;
            if (counter === 0 && callback) {
                callback();
            }
        }, 500);
    }
}

// Function to show the selected subpage and hide the main content
function showsub(spgno) {
    hideallsub(() => {
        mainContent.classList.remove("fade-in");
        mainContent.style.display = "none";
        let onesubpage = document.querySelector("#subpage" + spgno);
        onesubpage.style.display = "block";
        setTimeout(() => {
            onesubpage.classList.add("fade-in");
        }, 10);
    });
}

// Function to show the main content and hide all subpages
function showMainContent() {
    hideallsub(() => {
        mainContent.style.display = "block";
        setTimeout(() => {
            mainContent.classList.add("fade-in");
        }, 10);
    });
}

// Event listeners for subpage navigation buttons
subpage1btn.addEventListener("click", () => showsub(1));
subpage2btn.addEventListener("click", () => showsub(2));
subpage3btn.addEventListener("click", () => showsub(3));
subpage4btn.addEventListener("click", () => showsub(4));

// Event listeners for back buttons to show the main content
backbtns.forEach(backbtn => backbtn.addEventListener("click", showMainContent));

/* Game logic for Chicken Rice Cooking Game */
document.addEventListener('DOMContentLoaded', () => {
    let chickenStatus = 'raw';
    let riceStatus = 'uncooked';
    let chickenTimer;
    let riceTimer;
    let chickenCookTime = 0;
    let riceCookTime = 0;

    const chickenStatusElem = document.getElementById('chickenStatus');
    const riceStatusElem = document.getElementById('riceStatus');
    const resultElem = document.getElementById('result');

    const imageChickenStatusElem = document.getElementById('imageChickenStatus');
    const imageRiceStatusElem = document.getElementById('imageRiceStatus');
    const restartGameElem = document.getElementById('restartGame');

    const idealChickenCookTime = getRandomInt(5, 10);
    const idealRiceCookTime = getRandomInt(5, 10);

    // Function to start cooking the rice and play fire sound
    document.getElementById('startCookRice').addEventListener('click', () => {
        if (riceStatus === 'uncooked') {
            riceStatus = 'cooking';
            riceCookTime = 0;
            riceStatusElem.textContent = `Rice: Cooking (0s) - Undercooked`;
            imageRiceStatusElem.src = "images/game/cooking_rice.jpg";
            showMessage('You started cooking the rice!');
            fireSound.play();
            riceTimer = setInterval(() => {
                riceCookTime++;
                updateRiceStatus();
            }, 1000);
        } else {
            alert('Rice is already cooking or cooked!');
        }
    });

    // Function to stop cooking the rice and stop fire sound
    document.getElementById('stopCookRice').addEventListener('click', () => {
        if (riceStatus === 'cooking') {
            clearInterval(riceTimer);
            fireSound.pause();
            fireSound.currentTime = 0;
            finalizeRiceStatus();
        } else {
            alert('Rice is not cooking!');
        }
    });

    // Function to start cooking the chicken and play fire sound
    document.getElementById('startCookChicken').addEventListener('click', () => {
        if (chickenStatus === 'raw') {
            chickenStatus = 'cooking';
            chickenCookTime = 0;
            chickenStatusElem.textContent = `Chicken: Cooking (0s) - Undercooked`;
            imageChickenStatusElem.src = "images/game/cooking_chicken.jpg";
            showMessage('You started cooking the chicken!');
            fireSound.play();
            chickenTimer = setInterval(() => {
                chickenCookTime++;
                updateChickenStatus();
            }, 1000);
        } else {
            alert('Chicken is already cooking or cooked!');
        }
    });

    // Function to stop cooking the chicken and stop fire sound
    document.getElementById('stopCookChicken').addEventListener('click', () => {
        if (chickenStatus === 'cooking') {
            clearInterval(chickenTimer);
            fireSound.pause();
            fireSound.currentTime = 0;
            finalizeChickenStatus();
        } else {
            alert('Chicken is not cooking!');
        }
    });

    // Function to serve the dish and determine the result
    document.getElementById('serveDish').addEventListener('click', () => {
        if (chickenStatus === 'cooked' && riceStatus === 'cooked') {
            resultElem.textContent = 'You served a delicious Chicken Rice dish!';
            winSound.play();
        } else if (chickenStatus === 'overcooked' || riceStatus === 'overcooked') {
            resultElem.textContent = 'You served an overcooked Chicken Rice dish!';
            loseSound.play();
        } else if (chickenStatus === 'undercooked' || riceStatus === 'undercooked') {
            resultElem.textContent = 'You served an undercooked Chicken Rice dish!';
            loseSound.play();
        } else {
            resultElem.textContent = 'You need to cook both the chicken and the rice!';
            wrongSound.play();
        }
        restartGameElem.style.display = 'block';
    });

    // Event listener for the restart button to reset the game
    restartGameElem.addEventListener('click', resetGame);

    // Function to update rice cooking status
    function updateRiceStatus() {
        if (riceCookTime < idealRiceCookTime) {
            riceStatusElem.textContent = `Rice: Cooking (${riceCookTime}s) - Undercooked`;
            imageRiceStatusElem.src = "images/game/undercooked_rice.jpg";
        } else if (riceCookTime >= idealRiceCookTime && riceCookTime <= idealRiceCookTime + 5) {
            riceStatusElem.textContent = `Rice: Cooking (${riceCookTime}s) - Cooked`;
            imageRiceStatusElem.src = "images/game/cooked_rice.jpg";
        } else {
            riceStatusElem.textContent = `Rice: Cooking (${riceCookTime}s) - Overcooked`;
            imageRiceStatusElem.src = "images/game/overcooked_rice.jpg";
        }
    }

    // Function to finalize rice cooking status
    function finalizeRiceStatus() {
        if (riceCookTime >= idealRiceCookTime && riceCookTime <= idealRiceCookTime + 5) {
            riceStatus = 'cooked';
            riceStatusElem.textContent = `Rice: Cooked`;
            imageRiceStatusElem.src = "images/game/cooked_rice.jpg";
            showMessage('Rice is cooked!');
        } else if (riceCookTime > idealRiceCookTime + 5) {
            riceStatus = 'overcooked';
            riceStatusElem.textContent = `Rice: Overcooked`;
            imageRiceStatusElem.src = "images/game/overcooked_rice.jpg";
            showMessage('Rice is overcooked!');
        } else {
            riceStatus = 'undercooked';
            riceStatusElem.textContent = `Rice: Undercooked`;
            imageRiceStatusElem.src = "images/game/undercooked_rice.jpg";
            showMessage('Rice is undercooked!');
        }
    }

    // Function to update chicken cooking status
    function updateChickenStatus() {
        if (chickenCookTime < idealChickenCookTime) {
            chickenStatusElem.textContent = `Chicken: Cooking (${chickenCookTime}s) - Undercooked`;
            imageChickenStatusElem.src = "images/game/undercooked_chicken.jpg";
        } else if (chickenCookTime >= idealChickenCookTime && chickenCookTime <= idealChickenCookTime + 5) {
            chickenStatusElem.textContent = `Chicken: Cooking (${chickenCookTime}s) - Cooked`;
            imageChickenStatusElem.src = "images/game/cooked_chicken.jpg";
        } else {
            chickenStatusElem.textContent = `Chicken: Cooking (${chickenCookTime}s) - Overcooked`;
            imageChickenStatusElem.src = "images/game/overcooked_chicken.jpg";
        }
    }

    // Function to finalize chicken cooking status
    function finalizeChickenStatus() {
        if (chickenCookTime >= idealChickenCookTime && chickenCookTime <= idealChickenCookTime + 5) {
            chickenStatus = 'cooked';
            chickenStatusElem.textContent = `Chicken: Cooked`;
            imageChickenStatusElem.src = "images/game/cooked_chicken.jpg";
            showMessage('Chicken is cooked!');
        } else if (chickenCookTime > idealChickenCookTime + 5) {
            chickenStatus = 'overcooked';
            chickenStatusElem.textContent = `Chicken: Overcooked`;
            imageChickenStatusElem.src = "images/game/overcooked_chicken.jpg";
            showMessage('Chicken is overcooked!');
        } else {
            chickenStatus = 'undercooked';
            chickenStatusElem.textContent = `Chicken: Undercooked`;
            imageChickenStatusElem.src = "images/game/undercooked_chicken.jpg";
            showMessage('Chicken is undercooked!');
        }
    }

    // Function to show messages
    function showMessage(message) {
        const msgElem = document.createElement('div');
        msgElem.textContent = message;
        msgElem.style.position = 'fixed';
        msgElem.style.top = '10px';
        msgElem.style.left = '50%';
        msgElem.style.transform = 'translateX(-50%)';
        msgElem.style.backgroundColor = '#ff9800';
        msgElem.style.padding = '10px';
        msgElem.style.border = '2px solid #ffb74d';
        msgElem.style.borderRadius = '10px';
        msgElem.style.color = '#1e1e1e';
        document.body.appendChild(msgElem);

        setTimeout(() => {
            document.body.removeChild(msgElem);
        }, 2000);
    }

    // Function to generate a random integer between min and max (inclusive)
    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    // Function to reset the game and stop fire sound
    function resetGame() {
        clearInterval(chickenTimer);
        clearInterval(riceTimer);
        chickenStatus = 'raw';
        riceStatus = 'uncooked';
        chickenCookTime = 0;
        riceCookTime = 0;

        chickenStatusElem.textContent = 'Chicken: Raw';
        riceStatusElem.textContent = 'Rice: Uncooked';
        resultElem.textContent = '';
        imageChickenStatusElem.src = 'images/game/raw_chicken.jpg';
        imageRiceStatusElem.src = 'images/game/uncooked_rice.jpg';
        restartGameElem.style.display = 'none';
        fireSound.pause();
        fireSound.currentTime = 0;
    }
});

// Slideshow functionality
let slideIndex = 1;
showSlides(slideIndex);

// Function to increment/decrement the slide index and show slides
function plusSlides(n) {
    showSlides(slideIndex += n);
}

// Function to set the current slide index and show slides
function currentSlide(n) {
    showSlides(slideIndex = n);
}

// Function to show slides based on the current slide index
function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    let buttons = document.getElementsByClassName("demo-btn");
    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < buttons.length; i++) {
        buttons[i].className = buttons[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "block";
    buttons[slideIndex - 1].className += " active";
}

//Trap the chicken game
const gameArea = document.getElementById('gameArea');
const restartButton = document.getElementById('restartButton');
const gridSize = 7;
let chicken = { x: 3, y: 3 };

//Directions for chicken
const directions = [
    { dx: 0, dy: -1 }, // Up
    { dx: 0, dy: 1 },  // Down
    { dx: -1, dy: 0 }, // Left
    { dx: 1, dy: 0 },  // Right
];

// Function to create the grid and initialize the game
function createGrid() {
    gameArea.innerHTML = ''; // Clear the game area to reset the grid
    for (let y = 0; y < gridSize; y++) { // Loop through each row
        for (let x = 0; x < gridSize; x++) { // Loop through each column
            const cell = document.createElement('div'); // Create a new div element for each cell
            cell.classList.add('cell'); // Add the 'cell' class to the new div
            if (x === 0 || x === gridSize - 1 || y === 0 || y === gridSize - 1) {
                cell.classList.add('outer'); // If the cell is on the outer edge, add the 'outer' class
            }
            cell.dataset.x = x; // Set the x-coordinate of the cell
            cell.dataset.y = y; // Set the y-coordinate of the cell
            cell.addEventListener('click', placeBlock); // Add an event listener for placing a block
            gameArea.appendChild(cell); // Append the cell to the game area
        }
    }
    chicken = { x: 3, y: 3 }; //Chicken starting position
    updateChickenPosition(); // Update the chicken's position on the grid
}

// Function to update the chicken's position on the grid
function updateChickenPosition() {
    const cells = document.querySelectorAll('.cell'); // Select all cells in the grid
    cells.forEach(cell => { // Loop through each cell
        const x = parseInt(cell.dataset.x); // Get the x-coordinate of the cell
        const y = parseInt(cell.dataset.y); // Get the y-coordinate of the cell
        cell.innerHTML = ''; // Clear previous content
        if (x === chicken.x && y === chicken.y) { // If the cell's coordinates match the chicken's position
            const img = document.createElement('img');
            img.src = 'images/game/chiken.png'; // Local path to the chicken image
            cell.appendChild(img);
            cell.classList.add('chicken');
        } else {
            cell.classList.remove('chicken');
        }
    });
}

// Function to place a block on the grid
function placeBlock(event) {
    const cell = event.currentTarget; // Get the clicked cell
    if (cell.classList.contains('blocked') || cell.classList.contains('chicken') || cell.classList.contains('outer')) return;
    // If the cell is already blocked, contains the chicken, or is an outer cell, do nothing
    cell.classList.add('blocked'); // Otherwise, add the 'blocked' class to the cell
    popSound.play();
    moveChicken(); // Move the chicken
}

// Function to move the chicken
function moveChicken() {
    const validMoves = directions
        .map(dir => ({ x: chicken.x + dir.dx, y: chicken.y + dir.dy })) // Calculate the potential new positions for the chicken based on the possible directions it can move
        .filter(pos => isValidMove(pos.x, pos.y)); // Filter out the positions that are not valid moves
    
    if (validMoves.length > 0) { // If there are any valid moves available
        const move = validMoves[Math.floor(Math.random() * validMoves.length)]; // Select a random valid move
        chicken.x = move.x; // Update the chicken's x-coordinate
        chicken.y = move.y; // Update the chicken's y-coordinate
        updateChickenPosition(); // Update the chicken's position on the grid
        if (isEscaped(chicken.x, chicken.y)) { // Check if the chicken has escaped
            showAlert('The chicken has escaped! You lose!'); // If the chicken escaped, show a losing alert
        }
    } else {
        showAlert('The chicken is trapped! You win!'); // If there are no valid moves, the chicken is trapped and you win
    }
}

// Function to check if a move is valid
function isValidMove(x, y) {
    if (x < 0 || x >= gridSize || y < 0 || y >= gridSize) return false; // Check if the position is within the grid boundaries
    const cell = document.querySelector(`.cell[data-x="${x}"][data-y="${y}"]`); // Select the cell at the given position
    return !cell.classList.contains('blocked'); // Return true if the cell is not blocked, false otherwise
}

// Function to check if the chicken has escaped
function isEscaped(x, y) {
    return x === 0 || x === gridSize - 1 || y === 0 || y === gridSize - 1; // Check if the position is on the outer edge of the grid
}

// Function to show an alert and display the restart button
function showAlert(message) {
    alert(message); // Show an alert with the given message
    restartButton.style.display = 'block'; // Display the restart button
}

// Function to restart the game
function restartGame() {
    restartButton.style.display = 'none'; // Hide the restart button
    createGrid(); // Recreate the grid to start a new game
}

// Initialize the grid when the page loads
createGrid();