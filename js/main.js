const nightSky = document.querySelector("#sky");
const template = document.querySelector("#init-stars").content.firstElementChild;
const button = document.querySelector("#button");

/**
 * Showing message with a delay, then hiding it seconds later
 */
function showMessage() {
    const message = document.createElement("p");
    message.textContent = "Create more stars by clicking anywhere!";
    message.classList.add("message");
    document.body.appendChild(message);    
    setTimeout(function() {
        message.classList.add("message--show");
    }, 1000)
    setTimeout(function() {
        message.classList.remove("message--show");
    }, 7000)
}

/**
 * Random size for initial and future stars
 * 
 * @returns {number}
 */
function getStarSize() {
    const differentSizes = [1, 2, 3, 4];
    const randomSize = differentSizes[Math.floor(Math.random() * differentSizes.length)];
    return randomSize;
}

/**
 * Random X coordinate for initial stars
 * 
 * @param {number} max Highest X coordinate
 * @returns {number}
 */
function randomXCoord(max) {
    // Number from 25 to a max (we want it to adapt to screen size), both included
    return Math.floor(Math.random() * (max - 25 + 1) ) + 25;
}

/**
 * Random Y coordinate for initial stars
 * 
 * @param {number} max Highest Y coordinate
 * @returns {number}
 */
function randomYCoord(max) {
    // Number from 62 to a max (we want it to adapt to screen size), both included
    return Math.floor(Math.random() * (max - 62 + 1) ) + 62;
}

/**
 * Adding size and the defined class to stars
 * 
 * @param {HTMLElement} aDiv The star
 */
function addingClassAndSize(aDiv) {
    // We need the same size for width and height, so we save it here
    const size = getStarSize();
    aDiv.classList.add("star");    
    aDiv.style.width = `.${size}rem`;
    aDiv.style.height = `.${size}rem`;
}

/**
 * Creating several stars for a start
 */
function defaultStars() {
    /* We want the stars pattern to adapt to different screen sizes.
    Minus a number (same min we used for getting random coords) for not making an overflow of stars */
    const screenWidth = window.innerWidth - 25;
    const screenHeight = window.innerHeight - 62;
    const initialStars = Array(30).fill("");
    initialStars.forEach(function (element, index) {
        // The div
        const templateCopy = template.cloneNode(true);
        // Call to previous function
        addingClassAndSize(templateCopy);
        // Adding animation. We don't want all stars blinking at the same time
        if (index % 2 === 1) { // odd elements
            templateCopy.classList.add("star--blink");
        }
        setTimeout(() => {
            // Adding animation to even elements a bit later
            if (!(index % 2 === 1)) {
                templateCopy.classList.add("star--blink");
            }           
        }, 3000);
        templateCopy.style.left = `${randomXCoord(screenWidth)}px`;
        templateCopy.style.top = `${randomYCoord(screenHeight)}px`;
        nightSky.appendChild(templateCopy);
    })    
}

/**
 * Allowing the user to create more stars
 */
function createNewStar(event) {
    const newStar = document.createElement('div');
    // Call to previous function   
    addingClassAndSize(newStar);
    // With the .star class, we've already set an absolute position
    newStar.style.left = `${event.clientX}px`; // Where the user clicks
    newStar.style.top = `${event.clientY}px`;
    // Adding animation
    newStar.classList.add("star--blink");
    nightSky.appendChild(newStar);    
}

/**
 * Cleaning all previous stars and then generating new ones
 */
function changeConstellations() {      
    const currentStars = document.querySelectorAll(".star");
    currentStars.forEach(function (element) {
        element.remove();
    })
    defaultStars();
}

function createShootingStar() {
    const shootingStar = document.createElement("span");    
    shootingStar.classList.add("shooting-star");
    nightSky.appendChild(shootingStar);      
    shootingStar.animate([
        // First shooting star
        { top: "0", left: "13rem"},
        { top: "19rem", left: "6rem", width: "3rem", opacity: 1 },
        { top: "34rem", left: "0", width: ".2rem", opacity: 0 },   
        // Second shooting star
        { top: "-7rem", left: "11rem", opacity: 0 },
        { top: "-2rem", left: "8rem", width: "7rem" },
        { top: "19rem", left: "-7rem", width: "3rem", opacity: 1 },
        // Last one
        { top: "12rem", right: "0" },
        { top: "21rem", right: "5rem", width: "5rem", opacity: 1 },
        { top: "34rem", right: "13rem", width: ".2rem", opacity: 0 }        
    ], {
        duration: 8000,
        iterations: Infinity,
        fill: "forwards",
        delay: 3000
    })
}

// Events
document.addEventListener("click", createNewStar);
button.addEventListener("click", changeConstellations);

// Init
defaultStars();
showMessage();
createShootingStar();