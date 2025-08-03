let gameSeq = [];
let userSeq = [];
let started = false;
let level = 0;
let h3 = document.querySelector("h3");
let h2 = document.querySelector("h2");
let colors = ["red", "yellow", "purple", "blue"];
let highestScore = 0;
let start = document.querySelector("#start");
let restart = document.querySelector(".restart");
let howtoplaybtn = document.querySelector("a");

function gameFlash(btn){
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash");
    }, 100)
}

function userFlash(btn){
    btn.classList.add("userflash");
    setTimeout(function(){
        btn.classList.remove("userflash");
    }, 100)
}

function levelUp(){
    userSeq = [];
    level++;
    h3.innerText = `Level ${level}`;
    let randidx = Math.floor(Math.random() * 4);
    let randColor = colors[randidx];
    gameSeq.push(randColor);
    let randBtn = document.querySelector(`.${randColor}`)
    gameFlash(randBtn);
}

document.addEventListener("keypress", function(){
    if(started == false){
        started = true;
        setTimeout(levelUp,500);
    }
});

start.addEventListener("click", () =>{
    if(started == false){
        started = true;
        setTimeout(levelUp,500);
        start.style.visibility = "hidden";
    }
});

function checkAns(idx){
    if(userSeq[idx] === gameSeq[idx]){
        if(userSeq.length === gameSeq.length){
            setTimeout(levelUp,1000);
        }
    }
    else{
        h3.innerHTML = `Game Over!<br><b>Your score is ${level -1}</b><br> Press any key or replay button to play again`;
        document.body.style.backgroundColor = "red";
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor = "white";
        }, 200);
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor = "red";
        }, 400);
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor = "white";
        }, 600);
        if(level > highestScore){
            highestScore = level;
        h2.innerHTML = `<b>Highest score : ${level - 1}</b>`;
        }
        start.innerText = "Replay";
        start.style.visibility = "visible";
        reset();
    }
}

function btnPress(){
    if(started == false)
        return;

    userFlash(this);

    let useColor = this.getAttribute("id");
    userSeq.push(useColor);
    checkAns(userSeq.length - 1);
}

let boxes = document.querySelectorAll(".div");
for(box of boxes){
    box.addEventListener("click", btnPress);
}

function reset(){
    userSeq = [];
    gameSeq = [];
    level = 0;
    started = false;
}

restart.addEventListener("click", () => {
    start.innerText = "Start";
    resetGame();
});

function resetGame() {
    userSeq = [];
    gameSeq = [];
    level = 0;
    started = false;
    highestScore = 0;
    h2.innerHTML = `<b>Highest score : 0</b>`;
    h3.innerText = "Press any key or start button to start the game";
    start.style.visibility = "visible";
    document.body.style.backgroundColor = "white";
}