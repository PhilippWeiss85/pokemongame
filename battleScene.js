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
    name: "Draggle",
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
    animate: true,
    name: "Emby"
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

const queue = []


// eventlisteners for attackbuttons
document.querySelectorAll("button").forEach((button) => {
  button.addEventListener("click", (e) => {
    const selectedAttack = attacks[e.target.innerHTML]
    emby.attack({ 
      attack: selectedAttack, 
      recipient: draggle,
      renderedSprites
    })

    queue.push(() => {
        draggle.attack({ 
            attack: attacks.Tackle, 
            recipient: emby,
            renderedSprites
          })
    })
    queue.push(() => {
        draggle.attack({ 
            attack: attacks.Fireball, 
            recipient: emby,
            renderedSprites
          })
    })
  })
})

document.querySelector("#dialogueBox").addEventListener("click", (event) => {
    if(queue.length > 0) {
        queue[0]()
        queue.shift()
    } else event.currentTarget.style.display = "none"
})