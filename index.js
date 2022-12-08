
const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')


canvas.width = 1024
canvas.height = 576

const collisionsMap = [];
for (let i = 0; i < collisions.length; i+= 70) {
    collisionsMap.push(collisions.slice(i, 70 + i))
}

class Boundary {
  static width = 48
  static height = 48
    constructor({position}) {
        this.position = position
        this.height = 48
        this.width = 48
    }

    draw() {
        c.globalAlpha = 1
        c.fillStyle = 'red'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}


const boundaries = []
const offset = {
    x: -1024,
    y: -615
}
collisionsMap.forEach((row, i) => {
    row.forEach((symbol, j) => {
        if(symbol === 110)
        boundaries.push(
            new Boundary({
                position: {
            x: j * Boundary.width + offset.x,
            y: i * Boundary.height + offset.y,
        }
    })
    )
    })
})



const image = new Image();
image.src = './img/Town.png'

const playerImage = new Image();
playerImage.src = "./img/playerDown.png"

class Sprite {
    constructor({position, velocity, image, frames = {max: 1}}) {
        this.position = position
        this.image = image
        this.frames = frames

        this.image.onload = () => {
        this.width = this.image.width / this.frames.max
        this.height = this.image.height
        console.log(this.width)
        console.log(this.height)
    }
    }
    
    draw() {
        c.drawImage(
            this.image,
            0,
            0,
            this.image.width / this.frames.max,
            this.image.height,
            this.position.x,
            this.position.y,
            this.image.width / this.frames.max,
            this.image.height
            )
    }

}



const player = new Sprite ({
    position: {
    x: canvas.width / 2 - 192 / 4 / 2,
    y: canvas.height / 2 - 68  / 2
},
image: playerImage,
frames: {
    max: 4,
}
})

const background = new Sprite({
    position: {
    x: offset.x,
    y: offset.y,
    },
    image: image})





const keys = {
    w: {
        pressed: false
    },
    a: {
        pressed: false
    },
    d: {
        pressed: false
    },
    s: {
        pressed: false
    }
}



const movables = [background, ...boundaries]

function rectangularCollision ({playerRectangle, collisionRectangle}) {
    return (playerRectangle.position.x + playerRectangle.width >= collisionRectangle.position.x && 
        playerRectangle.position.x <= collisionRectangle.position.x + collisionRectangle.width && 
        playerRectangle.position.y <= collisionRectangle.position.y + collisionRectangle.height && 
        playerRectangle.position.y + playerRectangle.height>= collisionRectangle.position.y)
}


function animate() {
    window.requestAnimationFrame(animate)
    background.draw()
   boundaries.forEach(boundary => {
    boundary.draw();
    if(rectangularCollision({
        playerRectangle: player,
        collisionRectangle: boundary
    })) {
        console.log("colliding")
    }      
})
    player.draw()
 

  


  


    if(keys.w.pressed && lastKey === "w") {
    movables.forEach(movable => {movable.position.y += 3;})}
    else if(keys.a.pressed && lastKey === "a") { movables.forEach(movable => {movable.position.x += 3})}
    else if(keys.d.pressed && lastKey === "d") { movables.forEach(movable => {movable.position.x -= 3})}
    else if(keys.s.pressed && lastKey === "s") { movables.forEach(movable => {movable.position.y -= 3})}
  
}
animate()

let lastKey = ""
window.addEventListener('keydown', (event) => {
    switch(event.key) {
        case "w":
        keys.w.pressed = true;
        lastKey = "w"
        break
        case "a":
        keys.a.pressed = true;
        lastKey = "a"
        break
        case "d":
        keys.d.pressed = true;
        lastKey = "d"
        break
        case "s":
        keys.s.pressed = true;
        lastKey = "s"
        break
    }

})

window.addEventListener('keyup', (event) => {
    switch(event.key) {
        case "w":
        keys.w.pressed = false;
        break
        case "a":
        keys.a.pressed = false;
        break
        case "d":
        keys.d.pressed = false;
        break
        case "s":
        keys.s.pressed = false;
        break
    }
})
