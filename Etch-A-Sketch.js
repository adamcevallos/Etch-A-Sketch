// Adam Cevallos
// Etch-A-Sketch

function clearGrid() {
    let allSquares = document.querySelectorAll('.inner');
    allSquares.forEach(square => {
        square.style.cssText = "background-color: (255,255,255)";
        square.setAttribute('data-grayscale', 0);
    });
}

function populateGrid(dimension) {

    // clear grid
    const container = document.querySelector('#container');
    container.innerHTML = '';
     
    for (let i = 0; i < dimension; i++) {
        let outerDiv = document.createElement('div');
        outerDiv.classList.add('outer');
        outerDiv.style.gridTemplateColumns = `repeat(${dimension},1fr)`;

        for (let j = 0; j < dimension; j++) {
            let innerDiv = document.createElement('div');
            innerDiv.classList.add('inner');
            innerDiv.setAttribute('data-grayscale', '0');
            innerDiv.style.cssText = `background-color: rgb(255,255,255)`;
            outerDiv.appendChild(innerDiv);
        }
        container.appendChild(outerDiv);
    }

    // listen for color change 
    let innerSquares = document.querySelectorAll('.inner');
    innerSquares.forEach(square => {
        square.addEventListener('mouseover', () => applyColor(square, colorScheme));
    });
}

function applyColor(square, colorScheme) {

    switch (colorScheme) {
        case 'random':
            square.setAttribute('data-grayscale', '1')
            let randomR = Math.floor(Math.random() * 255);
            let randomG = Math.floor(Math.random() * 255);
            let randomB = Math.floor(Math.random() * 255);
            square.style.cssText = `background-color: rgb(${randomR}, ${randomG}, ${randomB})`;
            break;

        case 'black':
            square.setAttribute('data-grayscale', '1')
            square.style.cssText = `background-color: rgb(0,0,0)`;
            break;

        case 'rainbow':
            square.setAttribute('data-grayscale', '1')
            let randomRainbowIndex = Math.floor(Math.random() * 7);
            let color = rainbowColors[randomRainbowIndex];
            square.style.cssText = `background-color: #${color}`;
            break;

        case 'grayscale':
            let grayscaleVal = parseInt(square.getAttribute('data-grayscale'));
            if (grayscaleVal < 10) {
                square.setAttribute('data-grayscale', `${grayscaleVal + 1}`);
            }
            let rgbVal = 255 - (grayscaleVal + 1) * 25.5; //?
            square.style.cssText = `background-color: rgb(${rgbVal},${rgbVal},${rgbVal})`;
            break;

        case 'custom':
            square.style.cssText = `background-color: ${customColor}`;
            break;

        default:
            console.log("something went wrong.");

    }
}

let dimension = 10;
populateGrid(dimension);

const dimensionSlider = document.getElementById('dimensionSlider');
dimensionSlider.onchange = function () {
    dimension = this.value;
    populateGrid(dimension);
}

let colorScheme = 'grayscale';
const rainbowColors = ['9400D3', '4B0082', '0000FF', '00FF00', 'FFFF00', 'FF7F00', 'FF0000'];

//clear button
const clearButton = document.querySelector('#clear');
clearButton.addEventListener('click', () => populateGrid(dimension));

//color scheme buttons
const colorBtns = document.querySelectorAll('.color-scheme');
colorBtns.forEach(btn => {
    btn.addEventListener('click', () => colorScheme = btn.id);
});

//color picker
const colorPicker = document.querySelector('#custom');
let customColor = colorPicker.value;
colorPicker.onchange = () => {
    colorScheme = "custom";
    customColor = colorPicker.value;
}