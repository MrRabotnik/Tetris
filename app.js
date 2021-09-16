
/////////////////////////////////////
//////// Defining Variables /////////
/////////////////////////////////////
let startBtn = document.getElementById("start");
let resetBtn = document.getElementById("reset");
let screen = document.getElementById("screen");
let clickToStartText = document.getElementById("click_to_start");
let temp, temp2 = false, temp3 = false, temp4 = false;
let started = false;
let tetrisStartBtn, snakeStartBtn, flappyStartBtn;
let rightControl = document.getElementById("right_control");
let leftControl = document.getElementById("left_control");
let leftRedBall = document.getElementById("left_red_ball");
let leftStick = document.getElementById("left_stick");
let rightRedBall = document.getElementById("right_red_ball");
let rightStick = document.getElementById("right_stick");
let figureDrop, randomBlock, randomColor;
let count = 0;
let X1, Y1, X2, Y2, X3, Y3, X4, Y4;


///////////////////////////////////////////
/////////// Defining Collections //////////
///////////////////////////////////////////
let blocks = ["line", "square", "T", "Z", "S", "J", "L"];
let colors = ["aqua", "yellow", "purple", "green", "red", "blue", "orange", "grey"]

/////////////////////////////////////
//////// Defining Functions /////////
/////////////////////////////////////
function startMachine(){
    if(temp3 && this == startBtn) startTetrisGame();
    if(temp) return
    temp = true
    clickToStartText.style.display = "none";
    temp = setInterval(fillWithSquares, 5)
    setTimeout(loadingComplete, (Math.floor(Math.random() * 3) + 1) * 1000);
}

function loadingComplete(){
    clearInterval(temp)

    setTimeout(() => {
        screen.innerHTML = "";
        bringUpMenu();
    }, 1000)
}

function fillWithSquares(){
    screen.innerHTML += "<div class='little_squares'></div>"
}

function bringUpMenu(){
    screen.innerHTML = 
    `<div class="games_menu">
        <h1>Games</h1>
        <h3 id="tetris_start_btn">Tetris</h3>
        <h3 id="snake_start_btn">Snake</h3>
        <h3 id="flappy_start_btn">Flappy Bird</h3>
    </div>`;

    tetrisStartBtn = document.getElementById("tetris_start_btn");
    snakeStartBtn = document.getElementById("snake_start_btn");
    flappyStartBtn = document.getElementById("flappy_start_btn");

    tetrisStartBtn.addEventListener("click", startTetris)
    snakeStartBtn.addEventListener("click", () => {alert("Not Ready Yet :(")})
    flappyStartBtn.addEventListener("click", () => {alert("Not Ready Yet :(")})
}

function startTetris() {
    setTimeout(() => {
        screen.innerHTML = 
        `<div class="tetris_screen">
            <div>
                <div id="timer">00:00</div>
                <div id="score">0000</div>
            </div>
            <div id="tetris_display"></div>
            <div id="next_figure">
                Next
                <img src="./assets/lightning2.jpg" width="100%" />
                <img src="./assets/lightning.jpg" width="100%" />
            </div>
        </div>`;

        tetrisDisplay = document.getElementById("tetris_display");
        for(let i = 0; i < 20; i++){
            for(let j = 0; j < 10; j++){
                tetrisDisplay.innerHTML += `<div class='grid_square' id='id_${j}_${i}' style='width: ${tetrisDisplay.offsetWidth  / 10.5}px; height: ${tetrisDisplay.offsetHeight / 20.5}px'></div>`
            }
        }

        temp3 = true;

    }, 500)
}

function keyboardControl(e){
    if(e.key == "ArrowLeft"){
        rightControl.style.transform = "rotate(-45deg)";
        if(X1 <= 0 || X2 <= 0 || X3 <= 0 || X4 <= 0 ){
            return
        }
        X1--;
        X2--;
        X3--;
        X4--;
        reFillGrid(randomColor);
    }else if(e.key == "ArrowRight"){
        rightControl.style.transform = "rotate(45deg)";
        if(X1 >= 9 || X2 >= 9 || X3 >= 9 || X4 >= 9 ){
            return
        }
        X1++;
        X2++;
        X3++;
        X4++;
        reFillGrid(randomColor);
    }else if(e.key == "ArrowUp"){
        leftRedBall.style.transform = "translateY(50%)";
        leftStick.style.transform = "rotate(-45deg)";
    }else if(e.key == "ArrowDown"){
        rightControl.style.transform = "rotateX(-40deg)";
        if(Y1 < 19 & Y2 < 19 & Y3 < 19 & Y4 < 19){
            Y1++;
            Y2++;
            Y3++;
            Y4++;
        }
        reFillGrid(randomColor);
        checkIfNothingUnder(randomBlock)
    }
}   

document.addEventListener("keyup", function keyboardControl(e){
    if(e.key == "ArrowLeft"){
        rightControl.style.transform = "rotate(0)";
    }else if(e.key == "ArrowRight"){
        rightControl.style.transform = "rotate(0)";
    }else if(e.key == "ArrowUp"){
        leftRedBall.style.transform = "translateY(0)";
    }else if(e.key == "ArrowDown"){
        rightControl.style.transform = "rotateX(0)";
    }
})

function reFillGrid(randomColor){
    for(let i = 0; i < 20; i++){
        for(let j = 0; j < 10; j++){
            if((i == Y1 && j == X1) || (i == Y2 && j == X2) || (i == Y3 && j == X3) || (i == Y4 && j == X4)){
                document.getElementById(`id_${j}_${i}`).classList += " " + randomColor + " " + "block" + count
            }else{
                if(document.getElementById(`id_${j}_${i}`).className.split(" ")[2] == "block" + count){
                    document.getElementById(`id_${j}_${i}`).classList = "grid_square"
                }
            }
        }
    }
}

function getXCoords(block){
    if(block == "line"){
        X1 = Math.floor(Math.random() * 7)
        X2 = X1 + 1
        X3 = X1 + 2
        X4 = X1 + 3
    }else if(block == "square"){
        X1 = Math.floor(Math.random() * 9)
        X2 = X1 + 1
        X3 = X1
        X4 = X1 + 1
    }else if(block == "T"){
        X1 = Math.floor(Math.random() * 8) + 1
        X2 = X1 - 1
        X3 = X1
        X4 = X1 + 1
    }else if(block == "Z"){
        X1 = Math.floor(Math.random() * 8)
        X2 = X1 + 1
        X3 = X1 + 1
        X4 = X1 + 2
    }else if(block == "S"){
        X1 = Math.floor(Math.random() * 8) + 1
        X2 = X1 + 1
        X3 = X1 - 1
        X4 = X1
    }else if(block == "J"){
        X1 = Math.floor(Math.random() * 7)
        X2 = X1
        X3 = X1 + 1
        X4 = X1 + 2
    }else if(block == "L"){
        X1 = Math.floor(Math.random() * 7) + 2
        X2 = X1 - 2
        X3 = X1 - 1
        X4 = X1
    }
}

function getYCoords(block){
    if(block == "line"){
        Y1 = 0
        Y2 = 0
        Y3 = 0
        Y4 = 0
    }else if(block == "square"){
        Y1 = 0
        Y2 = 0
        Y3 = 1
        Y4 = 1
    }else if(block == "T"){
        Y1 = 0
        Y2 = 1
        Y3 = 1
        Y4 = 1
    }else if(block == "Z"){
        Y1 = 0
        Y2 = 0
        Y3 = 1
        Y4 = 1
    }else if(block == "S"){
        Y1 = 0
        Y2 = 1
        Y3 = 1
        Y4 = 1
    }else if(block == "J"){
        Y1 = 0
        Y2 = 1
        Y3 = 1
        Y4 = 1
    }else if(block == "L"){
        Y1 = 0
        Y2 = 1
        Y3 = 1
        Y4 = 1
    }
}

function startTetrisGame(){
    if(started) return;
    startTimer();
    started = true;
    randomBlock = blocks[Math.floor(Math.random() * 5)]
    randomColor = colors[Math.floor(Math.random() * 8)]
    getXCoords(randomBlock);
    getYCoords(randomBlock);

    document.addEventListener("keydown", keyboardControl)
    figureDrop = setInterval(() => {
        reFillGrid(randomColor);
        if(Y1 < 20 || Y2 < 20 || Y3 < 20 || Y4 < 20){
            Y1++;
            Y2++;
            Y3++;
            Y4++;
        }
        
        if(Y1 >= 20 || Y2 >= 20 || Y3 >= 20 || Y4 >= 20){
            clearInterval(figureDrop)
            started = false
            startTetrisGame()
        }

        checkIfNothingUnder(randomBlock)
    }, 1000)    
    count++
}

function checkIfNothingUnder(block){
    let otherBlocks  = document.getElementById(`id_${X1}_${Y1}`).className.split(" ")[2]
    let otherBlocks2 = document.getElementById(`id_${X2}_${Y2}`).className.split(" ")[2]
    let otherBlocks3 = document.getElementById(`id_${X3}_${Y3}`).className.split(" ")[2]
    let otherBlocks4 = document.getElementById(`id_${X4}_${Y4}`).className.split(" ")[2]

    if((otherBlocks != undefined && otherBlocks != "block" + count)
    || (otherBlocks2 != undefined && otherBlocks2 != "block" + count)
    || (otherBlocks3 != undefined && otherBlocks3 != "block" + count) 
    || (otherBlocks4 != undefined && otherBlocks4 != "block" + count)){
        console.log("message")
        clearInterval(figureDrop)
        started = false
        startTetrisGame()
    }
}
/////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////


    


// function keyboardControl(e){
//     if(e.key == "ArrowLeft"){
//         if(X1 <= 0 || X2 <= 0 || X3 <= 0 || X4 <= 0 ){
//             return
//         }
//         X1--;
//         X2--;
//         X3--;
//         X4--;
//         reFillGrid(randomColor);
//     }else if(e.key == "ArrowRight"){
//         if(X1 >= 9 || X2 >= 9 || X3 >= 9 || X4 >= 9 ){
//             return
//         }
//         X1++;
//         X2++;
//         X3++;
//         X4++;
//         reFillGrid(randomColor);
//     }else if(e.key == "ArrowDown"){
//         if(Y1 < 19 & Y2 < 19 & Y3 < 19 & Y4 < 19){
//             Y1++;
//             Y2++;
//             Y3++;
//             Y4++;
//         }
//         reFillGrid(randomColor);
//         checkIfNothingUnder(randomBlock)
//     }else if(e.key == "ArrowUp"){
//         changePos(randomBlock)
//     }
// }






///////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////
function dropBlocks(){

}

function startTimer(){
    if(temp4) return
    temp4 = true
    let minutes = 0;
    let seconds = 1;
    let timer = document.getElementById("timer");
    let x = setInterval(() => {
        timer.innerHTML = `${minutes <= 9 ? '0' + minutes : minutes}:${seconds <= 9 ? '0' + seconds++ : seconds++}`
        if(minutes >= 59){
            minutes = 0;
            clearInterval(x);
            reset();
        }else if(seconds >= 59){
            seconds = 0;
            minutes++;
        }
    }, 1000)
}

function reset(){
    temp2 = false
    temp3 = false
    temp4 = false
    seconds = 0;
    minutes = 0;
    screen.innerHTML = ""
    startTetris()
}

/////////////////////////////////////
//////// Calling Functions //////////
/////////////////////////////////////
startBtn.addEventListener('click', startMachine)
resetBtn.addEventListener('click', reset)
screen.addEventListener('click', startMachine)