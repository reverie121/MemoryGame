const gameContainer = document.getElementById("game");
let scoreBoard = document.querySelector('h2');

let count = [];
let guesses = 0;
let r;
let g;
let b;

const COLORS = [
    "red",
    "blue",
    "green",
    "orange",
    "purple",
    "pink",
    "red",
    "blue",
    "green",
    "orange",
    "purple",
    "pink"
];



// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
    let counter = array.length;
    // While there are elements in the array
    while (counter > 0) {
        // Pick a random index
        let index = Math.floor(Math.random() * counter);
        // Decrease counter by 1
        counter--;
        // And swap the last element with it
        let temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }
    return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
    for (let color of colorArray) {
        // create a new div
        const newDiv = document.createElement("div");
        // give it a class attribute for the value we are looping over
        newDiv.classList.add(color);
        // call a function handleCardClick when a div is clicked on
        newDiv.addEventListener("click", handleCardClick);
        // append the div to the element with an id of game
        gameContainer.append(newDiv);
    }
}

// Card click function used in handleCardClick; prevents clicking illegal cards, alters card, adds to array
function clickedCard(x, y) {
    if (x.classList.contains("matched")) {
        alert("This card has already been matched, please pick another!");
    } else if (x.classList.contains("flipped")) {
        alert("You must pick two different cards!");
    } else {
        x.style.backgroundColor = y;
        x.style.backgroundImage = "none";
        x.classList.toggle("flipped");
        count.push(x.classList[0]);
    }
}

// Where the game happens
function handleCardClick(event) {
    let clicked = event.target;
    const color = clicked.classList[0];

    if (count.length > 1) {
        return;
    } else if (count.length == 0) {
        clickedCard(clicked, color);
    } else if (count.length == 1) {
        guesses++;
        scoreBoard.innerText = `Guesses Made: ${guesses}`
        clickedCard(clicked, color);
        if (count[0] == count[1]) { // Match
            let match = document.getElementsByClassName("flipped");
            for (let i = match.length - 1; i >= 0; i--) {
                match[i].classList.add("matched");
                match[i].classList.toggle("flipped");
            }
            setTimeout(() => {
                count = [];
            }, 1000)
        } else { // Not a match
            setTimeout(function() {
                let noMatch = document.getElementsByClassName("flipped");
                for (let i = noMatch.length - 1; i >= 0; i--) {
                    noMatch[i].style.backgroundColor = "none";
                    noMatch[i].style.backgroundImage = "linear-gradient(to bottom right, purple, green)";
                    noMatch[i].classList.toggle("flipped");
                }
                count = [];
            }, 1000)
        }
    }
}



// when the DOM loads
createDivsForColors(shuffledColors);

/* */