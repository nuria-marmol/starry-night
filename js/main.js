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
    // Number from 50 to a max (we want it to adapt to screen size), both included
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
    aDiv.classList.add("star--blink");
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
    const initialStars = Array(26).fill("");
    initialStars.forEach(function(element) {
        // The div
        const templateCopy = template.cloneNode(true);
        // Call to previous functions
        addingClassAndSize(templateCopy);
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
    nightSky.appendChild(newStar);
    console.log(event.clientY);
}

/**
 * Cleaning all previous stars and then generating new ones
 */
function changeConstellations() {        
    nightSky.textContent = "";
    defaultStars();    
}

// Events
document.addEventListener("click", createNewStar);
button.addEventListener("click", changeConstellations);

// Init
defaultStars();
showMessage();