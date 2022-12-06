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

image.onload = () => {
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
}






window.addEventListener('keydown', (event) => {
    switch(event.key) {
        case "w":
        console.log(event.key)
        break
        case "a":
        console.log(event.key)
        break
        case "d":
        console.log(event.key)
        break
        case "s":
        console.log(event.key)
        break
    }
})
