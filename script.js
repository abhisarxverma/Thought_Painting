class Thought {

    constructor (textarea){
        this.width = textarea.offsetWidth
        this.height = textarea.offsetHeight
        this.content = textarea.value
        this.fontColor = textarea.style.color
        this.fontSize = textarea.style.fontSize
        this.textShadow = textarea.style.textShadow
        this.textTransform = textarea.style.textTransform
        this.textAlign = textarea.style.textAlign
    }

}

let thoughtPainting = getData("thought_painting")


/* Extra Small devices (Phones) */
const phones = 480;

/* Small devices (Tablets) */
const tablets = 768;

/* Medium devices (Laptops, Small Desktops) */
const laptops = 992;

/* Large devices (Desktops, Large Screens) */
const desktops = 1200;

/* Extra Large devices (Large Screens, 4K Displays) */
const large = 1400;

const extraLarge = 1700;

const totalWidth = window.innerWidth-50;
console.log("Total width: ", totalWidth)

const mobileMenu = document.querySelector(".mobile-menu")

let boxPerRow = null
let minWidth = null
let oneBoxMaxWidth = null
let minHeight = 170;

if (totalWidth >= extraLarge){
    boxPerRow = 7
    minWidth = 180;
    oneBoxMaxWidth = 250
}
else if (totalWidth >= large) {
    boxPerRow = 5
    minWidth = 180;
    oneBoxMaxWidth = 250;
}
else if (totalWidth >= desktops){
    boxPerRow = 5;
    minWidth = 180;
    oneBoxMaxWidth = 250
}
else if (totalWidth >= laptops){
    boxPerRow = 4;
    minWidth = 180;
    oneBoxMaxWidth = 250;
}
else if (totalWidth >= tablets){
    boxPerRow = 3;
    minWidth = 180;
    oneBoxMaxWidth = 250;
}
else if (totalWidth >= phones) {
    boxPerRow = 3;
    minWidth = 100;
    oneBoxMaxWidth = 180;
    showPopup(mobileMenu)
}
else {
    boxPerRow = 2;
    minWidth = 140;
    oneBoxMaxWidth = 150;
    showPopup(mobileMenu)
}

const totalHeight = window.innerHeight-50;

const minRoundness = 10
const maxRoundness = 50

const minFontSize = 12
const maxFontSize = 35

const saveBtn = document.querySelector("#save-painting")
const newCanvasBtn = document.querySelector("#new-thought-canvas")
const addCanvasBtn = document.querySelector("#add-canvas")

const creatorsNoteCard = document.querySelector(".main")

const layoutPopup = document.querySelector(".download-popup")
const newCanvasConfirmPopup = document.querySelector(".new-canvas-confirm-popup")

import {coolColors, textShadows, fontWeights, fontStyles,
    textDecorations, textTransforms, textAligns
} from "./utils.js";

const container = document.querySelector(".container")

const messageBox = document.querySelector("#message-box")

const customMenu = document.querySelector(".custom-context-menu");

const pauseMusicButton = document.querySelector("#stop-music")

const audio = document.getElementById("bg-audio");
let audioPlaying = true;
const volumePopup = document.querySelector(".music-volume-popup")
const volumeInput = document.querySelector("#music-volume-input")
const volumePopupCross = document.querySelector("#music-volume-popup-cross")
const setVolumeBtn = document.querySelector("#set-volume")

setVolumeBtn.addEventListener("click", function() {
    showPopup(volumePopup)
})

volumePopupCross.addEventListener("click", function() {
    hidePopup(volumePopup)
})

volumeInput.addEventListener("input", function() {
    let input = volumeInput.value
    audio.volume = input
})


audio.volume = 0.1;

audio.play().catch(err => {
    console.log("Auto-play blocked by browser:", err);
});

pauseMusicButton.addEventListener("click", function() {
    toggleAudio();
})

// Hide menu when clicking anywhere else
document.addEventListener("click", function () {
    customMenu.style.display = "none";
});    

document.querySelector("#new-canvas-confirm-popup-cross").addEventListener("click", function() {
    hidePopup(newCanvasConfirmPopup)
})

showMessage("Welcome To Spray Thoughts.")

if (thoughtPainting.length != 0) {
        createPaintingFromSavedData(thoughtPainting)
        showMessage("This where you left your thought painting.")
    }
else {
    showPopup(creatorsNoteCard)
    createThoughtCanvas(3)
    showMessage("Thought Canvas is Ready.")
    }
addExpandingEventListenersToTextareas() 

// Event listener for the creator's note's cross
document.querySelector(".main .cross").addEventListener("click", function() {
    creatorsNoteCard.classList.add("hide")
})

addCanvasBtn.addEventListener("click", function(event) {
    createThoughtCanvas(3)
    addExpandingEventListenersToTextareas()
    showMessage("Thought canvas added.")
})    

saveBtn.addEventListener("click", function() {
    saveThoughtPainting()
    showMessage("Thought Painting Saved Successfully.")
})

newCanvasBtn.addEventListener("click", function() {
    showPopup(newCanvasConfirmPopup)
})

// No context menu on top of the creator's note card
creatorsNoteCard.addEventListener("contextmenu", (event) => event.preventDefault());

document.querySelector("#new-canvas-download-canvas").addEventListener("click", function() {
    hidePopup(newCanvasConfirmPopup)
    showPopup(layoutPopup)
})

document.querySelector("#new-canvas").addEventListener("click", function() {
    hidePopup(newCanvasConfirmPopup)
    container.innerHTML = ""
    thoughtPainting = []
    // createThoughtCanvas(3)
    localStorage.clear()
    window.location.reload()
})

document.querySelector("#download-btn").addEventListener("click", function() {
    showPopup(layoutPopup);
})

document.querySelector("#download-popup-cross").addEventListener("click", function() {
    hidePopup(layoutPopup)
})

document.querySelectorAll(".layout-button").forEach((button) => {
    button.addEventListener("click", function() {
        let layout = button.getAttribute("data-layout")
        const fileNameInput = document.querySelector("#filename")
        let fileName = fileNameInput.value.replace("/ /g", "_")
        layoutPopup.classList.add("hide")
        layoutPopup.classList.remove("show")
        downloadThoughtPainting(layout, fileName)
        fileNameInput.value = "Thought_painting"
    })
})

mobileMenu.addEventListener("click", function (e) {

    //Prevent default behavior
    e.preventDefault();

    // Get menu dimensions
    const menuWidth = customMenu.offsetWidth;
    const menuHeight = customMenu.offsetHeight;

    // Get viewport dimensions
    const windowWidth = window.innerWidth;
    const windowHeight = document.documentElement.clientHeight;

    let posX = e.pageX;
    let posY = e.pageY;

    if (posX + menuWidth > windowWidth) {
    posX = Math.max(windowWidth - menuWidth - 30, 30);
    }
    if (posY + menuHeight > windowHeight) {
    posY = Math.max(windowHeight - menuHeight - 10, 10);
    }

    // Apply positioning
    customMenu.style.left = `${posX}px`;
    customMenu.style.top = `${posY}px`;
    customMenu.style.display = "block";
});


container.addEventListener("contextmenu", function (e) {
  e.preventDefault();  

  customMenu.style.visibility = "hidden";
  customMenu.style.display = "block";

  const menuWidth = customMenu.offsetWidth;
  const menuHeight = customMenu.offsetHeight;

  customMenu.style.display = "none";
  customMenu.style.visibility = "visible";

  const windowWidth = window.innerWidth-20;
  const pageHeight = Math.max(
    document.documentElement.scrollHeight,
    document.body.scrollHeight,
    window.innerHeight
  );

  let posX = e.pageX;
  let posY = e.pageY;

  if (posX + menuWidth > windowWidth) {
    posX = Math.max(windowWidth - menuWidth - 10, 10);
  }

  if (posY + menuHeight > pageHeight) {
    posY = Math.max(pageHeight - menuHeight - 10, 10);
  }

  customMenu.style.left = `${posX}px`;
  customMenu.style.top = `${posY}px`;
  customMenu.style.display = "block";
});


function hidePopup(popup){
    popup.classList.add("hide")
    popup.classList.remove("show")
}

function showPopup(popup){
    popup.classList.add("show")
    popup.classList.remove("hide")
}

function downloadThoughtPainting(layout, filename) {
    const { jsPDF } = window.jspdf;
    let doc = new jsPDF({
        orientation: layout,
        unit: "px",
        format: "a4",
    });

    const tempContainer = document.createElement("div");
    tempContainer.classList.add("tempcontainer");
    container.style.visibility = "hidden"
    container.style.position = "absolute"

    document.body.appendChild(tempContainer); // Append to body temporarily

    let pageHeight = doc.internal.pageSize.getHeight();
    let yPosition = 10; // Initial Y position for content on the page

    // Set black background on first page before adding any content
    doc.setFillColor(0, 0, 0);
    doc.rect(0, 0, doc.internal.pageSize.getWidth(), pageHeight, "F");

    thoughtPainting.forEach((row) => {
        let newRow = document.createElement("div");
        newRow.classList.add("row");
        newRow.style.gap = getString(20)

        row.forEach((thought) => {
            let newThought = document.createElement("div");
            newThought.classList.add("boxtextarea")
            newThought.textContent = thought.content;
            newThought.style.width = getString(thought.width);
            newThought.style.maxWidth = getString(thought.width);
            newThought.style.height = getString(thought.height);
            newThought.style.minHeight = getString(thought.height);
            newThought.style.fontSize = thought.fontSize;
            newThought.style.textAlign = thought.textAlign;
            newThought.style.color = thought.fontColor;
            newThought.style.textShadow = thought.textShadow;
            newThought.style.textTransform = thought.textTransform;
            newRow.appendChild(newThought);
        });

        tempContainer.appendChild(newRow);

        html2canvas(newRow, {
            scale: 3,
            useCORS: true,
            backgroundColor: null,
        }).then((canvas) => {
            let imageData = canvas.toDataURL("image/png");
            let imgHeight = (canvas.height * doc.internal.pageSize.getWidth()) / canvas.width;

            if (yPosition + imgHeight > pageHeight) {
                doc.addPage(); // Add new page when content overflows
                doc.setFillColor(0, 0, 0); // Set background to black
                doc.rect(0, 0, doc.internal.pageSize.getWidth(), doc.internal.pageSize.getHeight(), "F");
                yPosition = 10; // Reset Y position for new page
            }

            doc.addImage(imageData, "PNG", 10, yPosition, doc.internal.pageSize.getWidth() - 20, imgHeight);
            yPosition += imgHeight + 10; // Move down for next row
        });
    });

    setTimeout(() => {
        doc.save(`${filename}.pdf`); // Ensure all async captures are completed before saving
        document.body.removeChild(tempContainer);
        container.style.visibility = "visible"
        container.style.position = "relative"
    }, 3000);

    showMessage("Download In Progress.")
};

function saveData(key, data) {
    localStorage.setItem(key, JSON.stringify(data))    
}

function getData(key){
    console.log("Getting data")
    let dataString = localStorage.getItem(key)
    if (dataString === null){
        console.log(`Data : ${dataString}, returning the empty array`)
        return []
    } else {
        // console.log(`Data : ${dataString}, returning the saved data.`)
        return JSON.parse(dataString)
    }
}

function showMessage(message){

    messageBox.textContent = message
    messageBox.style.opacity = "1"
    messageBox.style.top = getString(10)

    setTimeout(() => {
        messageBox.style.opacity = "0"
        messageBox.style.top = getString(0)
    }, 3000)
}

function createPaintingFromSavedData(data){
    console.log("Creating painting from the saved data.")
    container.innerHTML = ""
    data.forEach((row, rowIndex) =>  {
        // console.log(row)
        const newRow = insertRow();
        row.forEach((thought, index) => {
            // console.log(thought)
            const newTextarea = document.createElement("textarea")
            newTextarea.classList = "boxtextarea"
            newTextarea.width = getString(thought.width)
            newTextarea.minWidth = getString(thought.width)
            newTextarea.height = getString(thought.height)
            newTextarea.value = thought.content
            newTextarea.style.color = thought.fontColor
            newTextarea.style.fontSize = thought.fontSize
            newTextarea.style.textShadow = thought.textShadow
            newTextarea.style.textTransform = thought.textTransform
            newTextarea.style.textAlign = thought.textAlign
            newTextarea.spellcheck = false
            newTextarea.style.minHeight = getString(thought.height)
            newTextarea.style.maxWidth = getString(thought.width)
            newTextarea.setAttribute("row-number", `${rowIndex}`)
            newTextarea.setAttribute("thought-nubmer", `${index}`)
            newRow.appendChild(newTextarea)
            // console.log(newTextarea.fontColor)
        });
        // container.appendChild(newRow)
    });
    console.log("render completed")
    addExpandingEventListenersToTextareas()
}
 
// Function to get a random width
function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

function getString(number) {
    return `${number}px`
}

function getRandomColor() {
    let max = coolColors.length-1;
    return coolColors[getRandom(0, max)]
}

function getRandomTextShadow() {
    let max = textShadows.length-1
    return textShadows[getRandom(0, max)]
}

function getRandomFontWeight() {
    let max = fontWeights.length-1
    return fontWeights[getRandom(0, max)]
}

function getRandomFontStyle() {
    let max = fontStyles.length-1
    return fontStyles[getRandom(0, max)]
}

function getRandomTextDecoration() {
    let max = textDecorations.length-1
    return textDecorations[getRandom(0, max)]
}

function getRandomTextTransforms() {
    let max = textTransforms.length-1
    return textTransforms[getRandom(0, max)]
}

function getRandomTextAlign() {
    let max = textAligns.length-1
    return textAligns[getRandom(0, max)]
}

function insertRow() {
    const row = document.createElement("div")
    row.classList = "row"
    container.appendChild(row)
    return row
}

function insertBox(width, height, row) {
    const box = document.createElement("div")
    box.style.maxWidth = width;
    box.style.width = width;
    // box.style.height = height;
    box.style.minHeight = height;
    let color = getRandomColor()
    // box.style.border = `1px solid lightgray`;
    // let randomBorderRadius = getString(getRandom(minRoundness, maxRoundness))
    // box.style.borderRadius = randomBorderRadius

    const inputInsideBox = document.createElement("textarea")
    inputInsideBox.classList = "boxtextarea"
    inputInsideBox.style.color = color
    inputInsideBox.style.fontSize = getString(getRandom(minFontSize, maxFontSize))
    // inputInsideBox.style.borderRadius = randomBorderRadius
    inputInsideBox.style.maxWidth = width
    inputInsideBox.style.width = width
    // inputInsideBox.style.height = height
    inputInsideBox.style.minHeight = height
    inputInsideBox.spellcheck = false
    inputInsideBox.style.textShadow = getRandomTextShadow()
    // inputInsideBox.style.fontFamily = getRandomFont()
    // inputInsideBox.style.fontWeight = getRandomFontWeight()
    // inputInsideBox.style.fontStyle = getRandomFontStyle()
    // inputInsideBox.style.textDecoration = getRandomTextDecoration()
    inputInsideBox.style.textTransform = getRandomTextTransforms()
    inputInsideBox.style.textAlign = getRandomTextAlign()
    // inputInsideBox.placeholder = "why are they so cool?"
    // inputInsideBox.style.transform = `rotate(${getRandom(0, 50)}deg)`

    row.appendChild(inputInsideBox);
    return inputInsideBox
}

function createRow(debug=false){
    let row = insertRow()
    let tempTotalWidth = totalWidth;
    let height = getString(minHeight)

    for (let i = 1; i <= boxPerRow; i++) {
        if (tempTotalWidth <= minWidth){
            let nowWidth = getString(tempTotalWidth)
            insertBox(nowWidth, height, row)
            if (debug) console.log(`Condition 1 - Box ${i} - ${tempTotalWidth}`);
            continue;
        }
        let width = getRandom(minWidth, oneBoxMaxWidth)
        if (tempTotalWidth - width <= minWidth){
            insertBox(getString(width), height, row)
            if (debug) console.log(`Condition 2 - Box ${i} - ${tempTotalWidth}`);
            break;
        }
        insertBox(getString(width), height, row)
        tempTotalWidth -= width
        if (debug) console.log(`Box ${i} - ${tempTotalWidth}`);
    }
    return row
}

function createThoughtCanvas(numberOfRows){
    for (let i = 0; i < numberOfRows; i++){
        createRow()
    }
}


function addExpandingEventListenersToTextareas() {
    document.querySelectorAll("textarea").forEach(element => {
    element.addEventListener("input", () => {
        element.style.height = "auto"; // Reset height
        element.style.height = element.scrollHeight + "px"; // Expand to fit content
        saveThoughtPainting()
    });
    });
}


function saveThoughtPainting(){
    // console.log(thoughtPainting)
    thoughtPainting = []
    let allRows = document.querySelectorAll(".row")
    // console.log(allRows)
    for (let row of allRows) {
        let thoughts = row.querySelectorAll("textarea")
        // console.log(thoughts)
        let paintingRow = []
        for (let thought of thoughts){
            // if (thought.value) console.log(thought.value)
            let thoughtObject = new Thought(thought)
            paintingRow.push(thoughtObject)
            // console.log(thoughtObject)
        }
        thoughtPainting.push(paintingRow)
    }

    // console.log(thoughtPainting)
    saveData("thought_painting", thoughtPainting)
}


function toggleAudio() {
    if (audioPlaying) {
        audioPlaying = false
        audio.pause()
        pauseMusicButton.textContent = "Play Background Music"
    }
    else {
        audioPlaying = true
        audio.play()
        pauseMusicButton.textContent = "Pause Background Music"
    }
}