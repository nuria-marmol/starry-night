const nightSky = document.querySelector("#sky");
const template = document.querySelector("#init-stars").content.firstElementChild;

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
 * @returns {number}
 */
function randomXCoord() {
    // Number from 150 to 990, both included
    return Math.floor(Math.random() * (990 - 150 + 1) ) + 150;
}

/**
 * Random Y coordinate for initial stars
 * 
 * @returns {number}
 */
function randomYCoord() {
    // Number from 100 to 490, both included
    return Math.floor(Math.random() * (490 - 100 + 1) ) + 100;
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
    const initialStars = Array(24).fill("");
    initialStars.forEach(function(element) {
        const templateCopy = template.cloneNode(true);
        // Call to previous function
        addingClassAndSize(templateCopy);
        templateCopy.style.left = `${randomXCoord()}px`;
        templateCopy.style.top = `${randomYCoord()}px`;
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
}

// Event
document.addEventListener("click", createNewStar);

// Init
defaultStars();