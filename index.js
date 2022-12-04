const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576
c.fillStyle = 'white'
console.log(c);

c.fillRect(0, 0, canvas.width, canvas.height)
const image = new Image();
image.src = './img/Town.png'

console.log(image)

image.onload = () => {
    c.drawImage(image, -1000, -500)
}