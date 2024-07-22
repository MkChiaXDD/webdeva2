const page1btn = document.querySelector("#page1btn");
const page2btn = document.querySelector("#page2btn");
const page3btn = document.querySelector("#page3btn");
const page4btn = document.querySelector("#page4btn");
const allpages = document.querySelectorAll(".page");
const hamBtn = document.querySelector("#hamIcon");
const menuItemsList = document.querySelector("nav ul");
const fireSound = document.getElementById('fireSound');
fireSound.loop = true; // Set loop attribute

function removeActiveClass() {
    const allBtns = [page1btn, page2btn, page3btn, page4btn];
    allBtns.forEach(btn => btn.classList.remove("active"));
}

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

show(1);

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

page1btn.addEventListener("click", () => show(1));
page2btn.addEventListener("click", () => show(2));
page3btn.addEventListener("click", () => show(3));
page4btn.addEventListener("click", () => show(4));

hamBtn.addEventListener("click", () => {
    menuItemsList.classList.toggle("show-menu");
});

document.addEventListener('DOMContentLoaded', () => {
    const showLeavingMessage = (event) => {
        event.preventDefault();
        if (confirm("You are about to leave this page. Do you want to continue?")) {
            window.open(event.target.href, '_blank');
        }
    }

    document.getElementById('restaurant1').addEventListener('click', showLeavingMessage);
    document.getElementById('restaurant2').addEventListener('click', showLeavingMessage);
    document.getElementById('restaurant3').addEventListener('click', showLeavingMessage);
});

const subpage1btn = document.querySelector("#subpage1btn");
const subpage2btn = document.querySelector("#subpage2btn");
const subpage3btn = document.querySelector("#subpage3btn");
const subpage4btn = document.querySelector("#subpage4btn");
const allsubpages = document.querySelectorAll(".subpage");
const mainContent = document.querySelector("#main-content");
const backbtns = document.querySelectorAll(".backbtn");

hideallsub();

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

function showMainContent() {
    hideallsub(() => {
        mainContent.style.display = "block";
        setTimeout(() => {
            mainContent.classList.add("fade-in");
        }, 10);
    });
}

subpage1btn.addEventListener("click", () => showsub(1));
subpage2btn.addEventListener("click", () => showsub(2));
subpage3btn.addEventListener("click", () => showsub(3));
subpage4btn.addEventListener("click", () => showsub(4));

backbtns.forEach(backbtn => backbtn.addEventListener("click", showMainContent));

/* Game logic */
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
            imageRiceStatusElem.src = "images/cooking_rice.jpg";
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
            imageChickenStatusElem.src = "images/cooking_chicken.jpg";
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

    restartGameElem.addEventListener('click', resetGame);

    function updateRiceStatus() {
        if (riceCookTime < idealRiceCookTime) {
            riceStatusElem.textContent = `Rice: Cooking (${riceCookTime}s) - Undercooked`;
            imageRiceStatusElem.src = "images/undercooked_rice.jpg";
        } else if (riceCookTime >= idealRiceCookTime && riceCookTime <= idealRiceCookTime + 5) {
            riceStatusElem.textContent = `Rice: Cooking (${riceCookTime}s) - Cooked`;
            imageRiceStatusElem.src = "images/cooked_rice.jpg";
        } else {
            riceStatusElem.textContent = `Rice: Cooking (${riceCookTime}s) - Overcooked`;
            imageRiceStatusElem.src = "images/overcooked_rice.jpg";
        }
    }

    function finalizeRiceStatus() {
        if (riceCookTime >= idealRiceCookTime && riceCookTime <= idealRiceCookTime + 5) {
            riceStatus = 'cooked';
            riceStatusElem.textContent = `Rice: Cooked`;
            imageRiceStatusElem.src = "images/cooked_rice.jpg";
            showMessage('Rice is cooked!');
        } else if (riceCookTime > idealRiceCookTime + 5) {
            riceStatus = 'overcooked';
            riceStatusElem.textContent = `Rice: Overcooked`;
            imageRiceStatusElem.src = "images/overcooked_rice.jpg";
            showMessage('Rice is overcooked!');
        } else {
            riceStatus = 'undercooked';
            riceStatusElem.textContent = `Rice: Undercooked`;
            imageRiceStatusElem.src = "images/undercooked_rice.jpg";
            showMessage('Rice is undercooked!');
        }
    }

    function updateChickenStatus() {
        if (chickenCookTime < idealChickenCookTime) {
            chickenStatusElem.textContent = `Chicken: Cooking (${chickenCookTime}s) - Undercooked`;
            imageChickenStatusElem.src = "images/undercooked_chicken.jpg";
        } else if (chickenCookTime >= idealChickenCookTime && chickenCookTime <= idealChickenCookTime + 5) {
            chickenStatusElem.textContent = `Chicken: Cooking (${chickenCookTime}s) - Cooked`;
            imageChickenStatusElem.src = "images/cooked_chicken.jpg";
        } else {
            chickenStatusElem.textContent = `Chicken: Cooking (${chickenCookTime}s) - Overcooked`;
            imageChickenStatusElem.src = "images/overcooked_chicken.jpg";
        }
    }

    function finalizeChickenStatus() {
        if (chickenCookTime >= idealChickenCookTime && chickenCookTime <= idealChickenCookTime + 5) {
            chickenStatus = 'cooked';
            chickenStatusElem.textContent = `Chicken: Cooked`;
            imageChickenStatusElem.src = "images/cooked_chicken.jpg";
            showMessage('Chicken is cooked!');
        } else if (chickenCookTime > idealChickenCookTime + 5) {
            chickenStatus = 'overcooked';
            chickenStatusElem.textContent = `Chicken: Overcooked`;
            imageChickenStatusElem.src = "images/overcooked_chicken.jpg";
            showMessage('Chicken is overcooked!');
        } else {
            chickenStatus = 'undercooked';
            chickenStatusElem.textContent = `Chicken: Undercooked`;
            imageChickenStatusElem.src = "images/undercooked_chicken.jpg";
            showMessage('Chicken is undercooked!');
        }
    }

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
        imageChickenStatusElem.src = 'images/raw_chicken.jpg';
        imageRiceStatusElem.src = 'images/uncooked_rice.jpg';
        restartGameElem.style.display = 'none';
        fireSound.pause();
        fireSound.currentTime = 0;
    }
});

// Slideshow functionality
let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

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
