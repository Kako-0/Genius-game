const mapGenius = {
    "green": [document.querySelector(".green"), 0],
    "yellow": [document.querySelector(".yellow"), 1],
    "red": [document.querySelector(".red"), 2],
    "blue": [document.querySelector(".blue"), 3]
}
const btnMenu = document.getElementById("menu-btn");
let orderGenius = [];
let clickedOrder = [];
let score = 0;

const scoreLed = document.querySelector(".score")

const addActive = (color) => {
    const colorSelected = mapGenius[color][0];
    colorSelected.classList.add(color+"-active");
}
const removeActive = (color) => {
    const colorSelected = mapGenius[color][0];
    colorSelected.classList.remove(color+"-active");
}
// Função que faz um delay entre as luzes
const wait = (timeToDelay) => new Promise((resolve) => setTimeout(resolve, timeToDelay));
// Liga e desliga a cor
const lightColor = (color) => {
    addActive(color)
    setTimeout(() =>{
        removeActive(color)
    }, 500)
    
}

const randomSelectColor = () => {
    return Math.floor(Math.random() * 4)
}

//Verifica ordem
const checkOrder = () => {
    for (let i in clickedOrder) {
        if (clickedOrder[i] !== orderGenius[i]) {
            reset()
            break;
        }
    }
    if(clickedOrder.length === orderGenius.length){
        nextLevel();
        score++;
        scoreLed.textContent = score;
    }
}

const nextLevel = async () => {
    orderGenius.push(randomSelectColor());
    clickedOrder = []
    
    for (const i in orderGenius) {
        const colorSelected = Object.keys(mapGenius).find(key => mapGenius[key][1] === orderGenius[i]);
        
        await wait(1000)
        lightColor(colorSelected)
           
    }
}

const reset = () => {
    alert(`
    Errou a sequência :(
    Sua pontuacao foi: ${score}
    `)
    clickedOrder = []
    orderGenius = []
    score = 0;
    scoreLed.textContent = score;

    document.querySelector('.menu-top').style.display = 'block';

}

btnMenu.onclick = () => {
    nextLevel();
    document.querySelector('.menu-top').style.display = 'none';
}
//Clique do jogador
mapGenius.blue[0].onclick = () =>{
    clickedOrder.push(mapGenius.blue[1])
    checkOrder()
}
mapGenius.red[0].onclick = () =>{
    clickedOrder.push(mapGenius.red[1])
    checkOrder()
}
mapGenius.yellow[0].onclick = () =>{
    clickedOrder.push(mapGenius.yellow[1])
    checkOrder()
}
mapGenius.green[0].onclick = () =>{
    clickedOrder.push(mapGenius.green[1])
    checkOrder()
}