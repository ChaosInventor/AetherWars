import Grid from "./src/grid.js"

console.log("Game script start")

const friendlyCanvas = document.getElementById("friendly-canvas")
const neutralCanvas = document.getElementById("neutral-canvas")
const enemyCanvas = document.getElementById("enemy-canvas")

const ctx = enemyCanvas.getContext("2d")

function updateCanvasSize(canvas) {
    canvas.width = canvas.clientWidth
    canvas.height = canvas.clientHeight

    //TODO: Not final, move to more appropriate spot
    grid.translate(enemyCanvas.width / 4, enemyCanvas.height / 4, enemyCanvas.width / 2, enemyCanvas.height / 2)
}

const resizeObserver = new ResizeObserver((entries) => {
    for(const entry of entries) {
        updateCanvasSize(entry.target)
    }
});

resizeObserver.observe(friendlyCanvas)
resizeObserver.observe(neutralCanvas)
resizeObserver.observe(enemyCanvas)

let grid = new Grid(10, 10, enemyCanvas.width / 2, enemyCanvas.height / 2, enemyCanvas.width / 4, enemyCanvas.height / 4)
grid.addEventListener("needrender", (e) => render(), { passive: true })

function render() {
    ctx.fillStyle = 'cyan'
    ctx.fillRect(0, 0, enemyCanvas.width, enemyCanvas.height)

    //TODO: Why do these get reset randomly? Is it because of the canvas dimension changes?
    ctx.fillStyle = 'white'
    ctx.strokeStyle = 'black'
    ctx.fillRect(grid.x, grid.y, grid.width, grid.height)

    grid.render(ctx)
}

function scaleGrid(e) {
    e.preventDefault()

    grid.scale -= e.deltaY * 0.001
}
enemyCanvas.addEventListener("wheel", scaleGrid, { passive: false })

let mouseDown = false;
enemyCanvas.addEventListener("mousedown", (e) => mouseDown = true, { passive: true })
enemyCanvas.addEventListener("mouseup", (e) => mouseDown = false, { passive: true })
enemyCanvas.addEventListener("mouseleave", (e) => mouseDown = false, { passive: true })

function offsetGrid(e) {
    e.preventDefault()

    if(mouseDown) {
        grid.offset(grid.offsetX + e.movementX, grid.offsetY + e.movementY)
    }
}
enemyCanvas.addEventListener("mousemove", offsetGrid, { passive: false })

