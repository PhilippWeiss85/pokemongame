const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");




canvas.width = 1024;
canvas.height = 576;

const collisionsMap = [];
for (let i = 0; i < collisions.length; i += 70) {
  collisionsMap.push(collisions.slice(i, 70 + i));
}

const battleZonesMap = [];
for (let i = 0; i < battleZonesData.length; i += 70) {
  battleZonesMap.push(battleZonesData.slice(i, 70 + i));
}




const boundaries = [];
const offset = {
  x: -1024,
  y: -615,
};
collisionsMap.forEach((row, i) => {
  row.forEach((symbol, j) => {
    if (symbol === 110)
      boundaries.push(
        new Boundary({
          position: {
            x: j * Boundary.width + offset.x,
            y: i * Boundary.height + offset.y,
          },
        })
      );
  });
});

const battleZones = []
battleZonesMap.forEach((row, i) => {
    row.forEach((symbol, j) => {
      if (symbol === 504)
        battleZones.push(
          new Boundary({
            position: {
              x: j * Boundary.width + offset.x,
              y: i * Boundary.height + offset.y,
            },
          })
        );
    });
  });


const image = new Image();
image.src = "./img/Town.png";

const foregroundImage = new Image();
foregroundImage.src = "./img/ForegroundObjects.png";

const playerDownImage = new Image();
playerDownImage.src = "./img/playerDown.png";

const playerUpImage = new Image();
playerUpImage.src = "./img/playerUp.png";

const playerLeftImage = new Image();
playerLeftImage.src = "./img/playerLeft.png";

const playerRightImage = new Image();
playerRightImage.src = "./img/playerRight.png";




const player = new Sprite({
  position: {
    x: canvas.width / 2 - 192 / 4 / 2,
    y: canvas.height / 2 - 68 / 2,
  },
  image: playerDownImage,
  frames: {
    max: 4,
    hold: 20
  },
  sprites: {
    up: playerUpImage,
    down: playerDownImage,
    right: playerRightImage,
    left: playerLeftImage,
  }
});

const background = new Sprite({
  position: {
    x: offset.x,
    y: offset.y,
  },
  image: image,
});

const foreground = new Sprite({
  position: {
    x: offset.x,
    y: offset.y,
  },
  image: foregroundImage,
});

const keys = {
  w: {
    pressed: false,
  },
  a: {
    pressed: false,
  },
  d: {
    pressed: false,
  },
  s: {
    pressed: false,
  },
};

const movables = [background, ...boundaries, foreground, ...battleZones];

function rectangularCollision({ playerRectangle, collisionRectangle }) {
  return (
    playerRectangle.position.x + playerRectangle.width >= collisionRectangle.position.x &&
    playerRectangle.position.x <= collisionRectangle.position.x + collisionRectangle.width &&
    playerRectangle.position.y <= collisionRectangle.position.y + collisionRectangle.height &&
    playerRectangle.position.y + playerRectangle.height >= collisionRectangle.position.y
  );
}

const battle = {
    initiated: false
}

function animate() {
  const animationId = window.requestAnimationFrame(animate);
  background.draw();
  boundaries.forEach((boundary) => {
    boundary.draw();
  });
  battleZones.forEach(battleZone => {
    battleZone.draw()
  })

  player.draw();
  foreground.draw();


  let moving = true;
  player.animate = false;

  console.log(animationId)
  if(battle.initiated) return
  // activate a battle
  if(keys.w.pressed || keys.s.pressed || keys.a.pressed || keys.d.pressed) {
    for (let i = 0; i < battleZones.length; i++) {
        const battleZone = battleZones[i];
        const overlappingArea = (Math.min(player.position.x + player.width, battleZone.position.x + battleZone.width) - Math.max(player.position.x, battleZone.position.x))
        * (Math.min(player.position.y + player.height, battleZone.position.y + battleZone.height)
        - Math.max(player.position.y, battleZone.position.y))
          
       if( rectangularCollision({
            playerRectangle: player,
            collisionRectangle: battleZone,
          }) &&
          overlappingArea > (player.width * player.height) / 2 &&
          Math.random() < 0.01
        ) {
        console.log("activate battle")

         // deactivate current animationloop
        window.cancelAnimationFrame(animationId)
        
        
          battle.initiated = true
        gsap.to("#overlappingDiv", {
            opacity: 1,
            repeat: 3,
            yoyo: true,
            duration: 0.3,
            onComplete() {
                gsap.to("#overlappingDiv", {
                    opacity:1,
                    duration: 0.3,
                    onComplete() {
                       // activate new animationloop
                animateBattle()
                gsap.to("#overlappingDiv", {
                    opacity:0,
                    })
            }})
            }
        })
          break;
        }
      }
  }



  if (keys.w.pressed && lastKey === "w") {
    player.animate = true;
    player.image = player.sprites.up
    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i];
      if (
        rectangularCollision({
          playerRectangle: player,
          collisionRectangle: {
            ...boundary,
            position: {
              x: boundary.position.x,
              y: boundary.position.y + 3,
            },
          },
        })
      ) {
        console.log("colliding");
        moving = false;
        break;
      }
    }

    if (moving)
      movables.forEach((movable) => {
        movable.position.y += 3;
      });
  } else if (keys.a.pressed && lastKey === "a") {
    player.animate = true;
    player.image = player.sprites.left
    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i];
      if (
        rectangularCollision({
          playerRectangle: player,
          collisionRectangle: {
            ...boundary,
            position: {
              x: boundary.position.x + 3,
              y: boundary.position.y,
            },
          },
        })
      ) {
        console.log("colliding");
        moving = false;
        break;
      }
    }
    
    
    if (moving)
      movables.forEach((movable) => {
        movable.position.x += 3;
      });
  } else if (keys.d.pressed && lastKey === "d") {
    player.animate = true;
    player.image = player.sprites.right
    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i];
      if (
        rectangularCollision({
          playerRectangle: player,
          collisionRectangle: {
            ...boundary,
            position: {
              x: boundary.position.x - 3,
              y: boundary.position.y,
            },
          },
        })
      ) {
        console.log("colliding");
        moving = false;
        break;
      }
    }



    if (moving)
      movables.forEach((movable) => {
        movable.position.x -= 3;
      });
  } else if (keys.s.pressed && lastKey === "s") {
    player.animate = true;
    player.image = player.sprites.down
    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i];
      if (
        rectangularCollision({
          playerRectangle: player,
          collisionRectangle: {
            ...boundary,
            position: {
              x: boundary.position.x,
              y: boundary.position.y - 3,
            },
          },
        })
      ) {
        console.log("colliding");
        moving = false;
        break;
      }
    }
    if (moving)
      movables.forEach((movable) => {
        movable.position.y -= 3;
      });
  }
}


const battleBackgroundImage = new Image()
battleBackgroundImage.src = "./img/battleBackground.png"
const battleBackground = new Sprite({
    position: {
        x: 0,
        y: 0
    },
    image: battleBackgroundImage
})





const draggleImage = new Image()
draggleImage.src = "./img/draggleSprite.png"
const draggle = new Sprite({
    position: {
        x: 800,
        y: 100,
    },
    image: draggleImage,
    frames: {
        max: 4,
        hold: 50,
    },
    animate: true,
    isEnemy: true,
})



const embyImage = new Image()
embyImage.src = "./img/embySprite.png"
const emby = new Sprite({
    position: {
        x: 280,
        y: 325,
    },
    image: embyImage,
    frames: {
        max: 4,
        hold: 50,
    },
    animate: true
})


const renderedSprites = [draggle, emby]
function animateBattle() {
    window.requestAnimationFrame(animateBattle)
    battleBackground.draw()
    console.log("animating battle")
 
    
    renderedSprites.forEach((sprite) => {
      sprite.draw()
    })
}






//animate();
animateBattle()


// eventlisteners for attackbuttons
document.querySelectorAll("button").forEach((button) => {
  button.addEventListener("click", (e) => {
    const selectedAttack = attacks[e.target.innerHTML]
    emby.attack({ 
      attack: selectedAttack, 
      recipient: draggle,
      renderedSprites
    })
  })
})


let lastKey = "";
window.addEventListener("keydown", (event) => {
  switch (event.key) {
    case "w":
      keys.w.pressed = true;
      lastKey = "w";
      break;
    case "a":
      keys.a.pressed = true;
      lastKey = "a";
      break;
    case "d":
      keys.d.pressed = true;
      lastKey = "d";
      break;
    case "s":
      keys.s.pressed = true;
      lastKey = "s";
      break;
  }
});

window.addEventListener("keyup", (event) => {
  switch (event.key) {
    case "w":
      keys.w.pressed = false;
      break;
    case "a":
      keys.a.pressed = false;
      break;
    case "d":
      keys.d.pressed = false;
      break;
    case "s":
      keys.s.pressed = false;
      break;
  }
});
