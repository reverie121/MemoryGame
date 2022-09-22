const gameContainer = document.getElementById("game");

let count = [];
let allow;

const COLORS = [
    "red",
    "blue",
    "green",
    "orange",
    "purple",
    "red",
    "blue",
    "green",
    "orange",
    "purple"
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

// TODO: Implement this function!
function handleCardClick(event) {
    if (count.length > 2) {
        return
    }
    let clicked = event.target;
    if (clicked.classList.contains("matched")) {
        alert("This card has already been matched, please pick another!");
    } else if (clicked.classList.contains("flipped")) {
        alert("You must pick two different cards!");
    } else {
        if (count.length < 2) {
            color = clicked.classList[0]
            clicked.style.backgroundColor = color;
            clicked.classList.toggle("flipped");
            count.push(clicked.classList[0]);
            if (count.length == 2) {
                if (count[0] == count[1]) {
                    console.log("Match!");
                    let match = document.getElementsByClassName("flipped");
                    for (let i = match.length - 1; i >= 0; i--) {
                        match[i].classList.add("matched");
                        match[i].classList.toggle("flipped");
                    }
                    count = [];
                } else {
                    console.log("Not a match!");
                    setTimeout(function() {
                        let noMatch = document.getElementsByClassName("flipped");
                        for (let i = noMatch.length - 1; i >= 0; i--) {
                            noMatch[i].style.backgroundColor = "dimgray";
                            noMatch[i].classList.toggle("flipped");
                        }
                    }, 1000)
                    count = [];
                }
            }
        }
    }

}

// when the DOM loads
createDivsForColors(shuffledColors);

/* */