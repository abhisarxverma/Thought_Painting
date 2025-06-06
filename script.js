
const totalWidth = window.innerWidth-50;
const minWidth = 120;
const oneBoxMaxWidth = 250
const totalHeight = window.innerHeight-50;
const minHeight = 170;
const oneBoxMaxHeight = 250;

const minRoundness = 10
const maxRoundness = 50

const minFontSize = 15
const maxFontSize = 35

const coolColors = [
    "#6A5ACD", // Slate Blue (Deep but calming)
    "#4682B4", // Steel Blue (Cool and refreshing)
    "#5F9EA0", // Cadet Blue (Muted, tranquil tone)
    "#B0C4DE", // Light Steel Blue (Soft and soothing)
    "#2F4F4F", // Dark Slate Gray (Deep and mysterious)
    "#8A2BE2", // Blue Violet (Bold yet relaxing)
    "#00CED1", // Dark Turquoise (Vibrant but smooth)
    "#87CEFA", // Light Sky Blue (Airy and fresh)
    "#556B2F", // Dark Olive Green (Earthy depth)
    "#4B0082", // Indigo (Dark and enigmatic)
    "#7B68EE", // Medium Slate Blue (Rich and stylish)
    "#6495ED", // Cornflower Blue (Bright but easy on eyes)
    "#468499", // Teal Blue (Balanced depth and freshness)
    "#2E8B57", // Sea Green (Organic and calming)
    "#40E0D0", // Turquoise (Refreshing and beach-like)
    "#3CB371", // Medium Sea Green (Gentle and earthy)
    "#708090", // Slate Gray (Sophisticated and neutral)
    "#C0C0C0", // Silver (Soft metallic, smooth look)
    "#1E90FF", // Dodger Blue (Strong but not overwhelming)
    "#DC143C"  // Crimson (Dark, passionate energy)
];

const container = document.querySelector(".container")

// Function to get a random width
function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

function getString(number) {
    return `${number}px`
}

function getRandomColor() {
    let max = coolColors.length;
    return coolColors[Math.floor(Math.random() * max)]
}

function insertBox(width, height) {
    const box = document.createElement("div")
    box.style.maxWidth = width;
    box.style.width = width;
    // box.style.height = height;
    box.style.minHeight = height;
    let color = getRandomColor()
    box.style.border = `2px solid lightgray`;
    let randomBorderRadius = getString(getRandom(minRoundness, maxRoundness))
    box.style.borderRadius = randomBorderRadius

    const inputInsideBox = document.createElement("textarea")
    inputInsideBox.style.color = color
    inputInsideBox.style.fontSize = getString(getRandom(minFontSize, maxFontSize))
    inputInsideBox.style.borderRadius = randomBorderRadius
    inputInsideBox.style.border = "none"
    inputInsideBox.style.maxWidth = width
    inputInsideBox.style.width = width
    inputInsideBox.style.height = height
    inputInsideBox.style.maxHeight = height
    inputInsideBox.style.padding = "10px"
    inputInsideBox.style.resize = "both"
    inputInsideBox.style.overflowWrap = "break-word"
    inputInsideBox.style.whiteSpace = "pre-wrap"
    inputInsideBox.style.boxSizing = "border-box"
    inputInsideBox.style.resize = "none"

    box.appendChild(inputInsideBox)

    container.appendChild(box);
}

function putOneRow(){
    let tempTotalWidth = totalWidth;

    while (true) {
        if ( tempTotalWidth <= 100) break;
        // let height = getString(getRandom(minHeight, oneBoxMaxHeight))
        let height = getString(minHeight)
        if (tempTotalWidth <= minWidth){
            insertBox(getString(tempTotalWidth), height);
            break;
        }
        let width = getRandom(minWidth, oneBoxMaxWidth)
        insertBox(getString(width), height)
        tempTotalWidth -= width
    }
}

putOneRow()
putOneRow()
putOneRow()