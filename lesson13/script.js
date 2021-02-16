const title = document.querySelector('.color-hex'),
    changeColorBtn = document.querySelector('.change-color'),
    background = document.body;

function randomNum(min, max){
    min = Math.ceil(min);
    max = Math.floor(max);

    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateColor(){
    let randColor = randomNum(0, 16581375).toString(16);
    if (randColor.length === 5) {
        return `0${randColor}`
    } else {
        return randColor;
    }
}

function changeColor(){
    let color = generateColor();

    background.style.backgroundColor = `#${color}`;
    title.textContent = `#${color}`;
    changeColorBtn.style.color = `#${color}`;
}

changeColorBtn.addEventListener('click', changeColor);
changeColor();