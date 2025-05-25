import kaplay from "kaplay";

const k=kaplay({
    width: window.innerWidth,
    height: window.innerHeight,
    canvas: document.getElementById("canvas"),
    scale:1
});

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
const arrowLeftX=window.innerWidth/2-172; const arrowLeftY=0;//original position of the left arrow, use to  reate position of others
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
loadSound("soundName", "./sounds/whyThisDealer.wav");
let songTimer=0;
document.getElementById("body").onload=function songUa(){
    var timer=setInterval(()=>{
        songTimer++;
        if(songTimer===100){
            clearInterval(timer);
            console.log("times up "+songTimer);
        }
    },1000)
}
const sound=play("soundName", {
    volume: 0.5, // set the volume to 50%
    speed: 1, // speed up the sound
    loop: false, // loop the sound
});
//arrow movement
onUpdate(()=>{
    arrowDown.move(0,200);
    arrowLeft.move(0,150);
    arrowUp.move(0,100);
    arrowRight.move(0,175);
    arrowLeft.onCollide("border",()=>{
        arrowLeft.destroy();
        arrowLeft=add(createArrow("arrowLeft",arrowLeftX,arrowLeftY));
    });
    arrowUp.onCollide("border",()=>{
        arrowUp.destroy();
        arrowUp=add(createArrow("arrowUp",arrowLeftX+128,arrowLeftY));
    });
    arrowDown.onCollide("border",()=>{
        arrowDown.destroy();
        arrowDown=add(createArrow("arrowDown",arrowLeftX+234,arrowLeftY));
    });
    arrowRight.onCollide("border",()=>{
        arrowRight.destroy();
        arrowRight=add(createArrow("arrowRight",arrowLeftX+362,arrowLeftY));
    });
})
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