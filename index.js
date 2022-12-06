const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576
c.fillStyle = 'white'
console.log(c);
c.fillRect(0, 0, canvas.width, canvas.height)


const image = new Image();
image.src = './img/Town.png'

const playerImage = new Image();
playerImage.src = "./img/playerDown.png"

/* image.onload = () => {
    c.drawImage(image, -1025, -580)
    c.drawImage(playerImage,
    0,
    0,
    playerImage.width / 4,
    playerImage.height,
    canvas.width / 2 - (playerImage.width / 4 / 2),
    canvas.height / 2 - playerImage.height / 2,
    playerImage.width / 4,
    playerImage.height
    )
} */

class Sprite {
    constructor({position,  image}) {
        this.position = position
        this.image = image
    }
    
    draw() {
        c.drawImage(this.image, this.position.x, this.position.y)
    }

}



const background = new Sprite({
    position: {
    x: -1025,
    y: -580,
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



function animate() {
    window.requestAnimationFrame(animate)
    background.draw()
    c.drawImage(playerImage,
    0,
    0,
    playerImage.width / 4,
    playerImage.height,
    canvas.width / 2 - (playerImage.width / 4 / 2),
    canvas.height / 2 - playerImage.height / 2,
    playerImage.width / 4,
    playerImage.height
    )

    if(keys.w.pressed) background.position.y += 3;
    else if(keys.a.pressed) background.position.x += 3;
    else if(keys.d.pressed) background.position.x -= 3;
    else if(keys.s.pressed) background.position.y -= 3;
    console.log(background.position.y)
}
animate()


window.addEventListener('keydown', (event) => {
    switch(event.key) {
        case "w":
        keys.w.pressed = true;
  
        break
        case "a":
        keys.a.pressed = true;
  
        break
        case "d":
        keys.d.pressed = true;

        break
        case "s":
        keys.s.pressed = true;

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
