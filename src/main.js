import kaplay from "kaplay";
const k=kaplay({
    width: window.innerWidth,
    height: window.innerHeight,
    canvas: document.getElementById("canvas"),
    scale:1
});
let casbahSongSelected=true;
let casbahSongBpm=130;
var rockTheCasbahAudio=document.getElementById("rockTheCasbah");
var casbahSongLength=document.getElementById("rockTheCasbah").duration;
function playTrack(){
    if(casbahSongSelected){
        rockTheCasbahAudio.volume=0.6;
        rockTheCasbahAudio.play();
    }
}

let startBtn = k.add([
    anchor("center"),
    pos(center()),
    rect(600, 200, { radius: 8 }),
    outline(4, BLACK),
    "startBtn",
    area(),
]);
startBtn.add([
    anchor("center"),
    text("Press to play",{
        size:26,
    }),
    color(0,0,0)
])
//Start game
onClick("startBtn",()=>{
    playTrack();
    startBtn.destroy();
    startGame();
})
let pauseBtn=k.add([
    pos(window.innerWidth-110,0),
    rect(100,64,{ radius: 8 }),
    color(0,0,0),
    outline(4,WHITE)
])
pauseBtn.add([
    text("Pause",{
        size:26,
    }),
])
//loading arrow sprites
loadSprite("arrowDown","./sprites/arrowDown.png");
loadSprite("arrowUp","./sprites/arrowUp.png");
loadSprite("arrowLeft","./sprites/arrowLeft.png");
loadSprite("arrowRight","./sprites/arrowRight.png");
function createArrow(spriteName,xCoordinates,yCoordinates){
    return [
        sprite(spriteName),
        pos(xCoordinates,yCoordinates),
        area()
    ]
}
let scoreNumber=0;
let score=k.add([
    pos(32,32),
    text(`Score: ${scoreNumber}`)
]);
const borderOfGame=k.add([
    rect(window.innerWidth,1),
    pos(0,window.innerHeight),
    area(),
    "border"
]);

//creating arrow notes
const arrowLeftX=window.innerWidth/2-172; const arrowLeftY=0;//original position of the left arrow, use to  create position of others
let arrowLeft=k.add([
    sprite("arrowLeft"),
    pos(arrowLeftX,arrowLeftY),
    area()
]);
let arrowUp=k.add([
    sprite("arrowUp"),
    pos(arrowLeftX+128,arrowLeftY),
    area()
]);
let arrowDown=k.add([
    sprite("arrowDown"),
    pos(arrowLeftX+234,arrowLeftY),
    area()
]);
let arrowRight=k.add([
    sprite("arrowRight"),
    pos(arrowLeftX+362,arrowLeftY),
    area()
]);

//functions to move arrow note
function moveLeftNote(){
    arrowLeft.destroy();
    arrowLeft=add(createArrow("arrowLeft",arrowLeftX,arrowLeftY));
    onUpdate(()=>{
        arrowLeft.moveTo(playerX,window.innerHeight,200);
        arrowLeft.onCollide("border",()=>{
            arrowLeft.destroy();
        });
    })
}
function moveRightNote(){
    arrowRight.destroy();
    arrowRight=add(createArrow("arrowRight",arrowLeftX+362,arrowLeftY));
    onUpdate(()=>{
        arrowRight.moveTo(playerX+362,window.innerHeight,200);
        arrowRight.onCollide("border",()=>{
            arrowRight.destroy();
    });
    })
    }
function moveDownNote(){
    arrowDown.destroy();
    arrowDown=add(createArrow("arrowDown",arrowLeftX+234,arrowLeftY));
    onUpdate(()=>{
        arrowDown.moveTo(playerX+234,window.innerHeight,200)
        arrowDown.onCollide("border",()=>{
            arrowDown.destroy();
        });
    })
    }
function moveUpNote(){
    arrowUp.destroy();
    arrowUp=add(createArrow("arrowUp",arrowLeftX+128,arrowLeftY));
    onUpdate(()=>{
        arrowUp.moveTo(playerX+128,window.innerHeight,200)
        arrowUp.onCollide("border",()=>{
            arrowUp.destroy();
        });
    })
    }
//creating player's arrows
const playerX=window.innerWidth/2-172; const playerY=window.innerHeight-172;
let playerArrowLeft=k.add([
    sprite("arrowLeft"),
    pos(playerX,playerY),
    area()
])
let playerArrowUp=k.add([
    sprite("arrowUp"),
    pos(playerX+128,playerY),
    area()
])
let playerArrowDown=k.add([
    sprite("arrowDown"),
    pos(playerX+234,playerY),
    area()
])
let playerArrowRight=k.add([
    sprite("arrowRight"),
    pos(playerX+362,playerY),
    area()
])
//notes pattern

//arrow movement
function startGame(){
    moveLeftNote();
    moveRightNote();
    moveUpNote();
    moveDownNote();
    console.log(rockTheCasbahAudio.currentTime);
}

//Arrows hitting
onKeyPress("left",()=> {
    if(arrowLeft.pos.y>=playerArrowLeft.pos.y-32 || arrowLeft.pos.y>=playerArrowLeft.pos.y+32){
        scoreNumber+=100;
        score.destroy();
        score=k.add([
            pos(32,32),
            text(`Score: ${scoreNumber}`)
        ])
        playerArrowLeft.destroy();
        playerArrowLeft=k.add([
            sprite("arrowLeft"),
            pos(playerX,playerY),
            area(),
            color(0,0,0)
        ])
    }setInterval(()=>{
        playerArrowLeft.destroy();
        playerArrowLeft=k.add([
            sprite("arrowLeft"),
            pos(playerX,playerY),
            area()
        ])
    },500)
});
onKeyPress("up",()=> {
    if(arrowUp.pos.y>=playerArrowUp.pos.y-32 || arrowUp.pos.y>=playerArrowUp.pos.y+32){
        scoreNumber+=100;
        score.destroy();
        score=k.add([
            pos(32,32),
            text(`Score: ${scoreNumber}`)
        ])
        playerArrowUp.destroy();
        playerArrowUp=k.add([
            sprite("arrowUp"),
            pos(playerX+128,playerY),
            area(),
            color(0,0,0)
        ])
    }setInterval(()=>{
        playerArrowUp.destroy();
        playerArrowUp=k.add([
            sprite("arrowUp"),
            pos(playerX+128,playerY),
            area()
        ])
    },500)
});
onKeyPress("right",()=> {
    if(arrowRight.pos.y>=playerArrowRight.pos.y-32 || arrowRight.pos.y>=playerArrowRight.pos.y+32){
        scoreNumber+=100;
        score.destroy();
        score=k.add([
            pos(32,32),
            text(`Score: ${scoreNumber}`)
        ])
        playerArrowRight.destroy();
        playerArrowRight=k.add([
            sprite("arrowRight"),
            pos(playerX+362,playerY),
            area(),
            color(0,0,0)
        ])
    }setInterval(()=>{
        playerArrowRight.destroy();
        playerArrowRight=k.add([
            sprite("arrowRight"),
            pos(playerX+362,playerY),
            area()
        ])
    },500)
});
onKeyPress("down",()=> {
    if(arrowDown.pos.y>=playerArrowDown.pos.y-32 || arrowDown.pos.y>=playerArrowDown.pos.y+32){
        scoreNumber+=100;
        score.destroy();
        score=k.add([
            pos(32,32),
            text(`Score: ${scoreNumber}`)
        ])
        playerArrowDown.destroy();
        playerArrowDown=k.add([
            sprite("arrowDown"),
            pos(playerX+234,playerY),
            area(),
            color(0,0,0)
        ])
    }setInterval(()=>{
        playerArrowDown.destroy();
        playerArrowDown=k.add([
            sprite("arrowDown"),
            pos(playerX+234,playerY),
            area()
        ])
    },500)
});
