import { WALL_TYPES, MAZE_CONFIG } from './utils'

export const drawMaze = (
    canvas: HTMLCanvasElement,
    labyrinth: number[][]
) => {
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const container = canvas.parentElement
    if (!container) return

    const { width, height } = container.getBoundingClientRect()
    canvas.width = width
    canvas.height = height

    const cellWidth = width / MAZE_CONFIG.COLS
    const cellHeight = height / MAZE_CONFIG.ROWS

    ctx.clearRect(0, 0, width, height)
    ctx.strokeStyle = '#000'
    ctx.lineWidth = 1

    labyrinth.forEach((row, i) => {
        row.forEach((cell, j) => {
            const x = j * cellWidth
            const y = i * cellHeight

            ctx.beginPath()

            if (cell & WALL_TYPES.TOP) {
                ctx.moveTo(x, y)
                ctx.lineTo(x + cellWidth, y)
            }
            if (cell & WALL_TYPES.RIGHT) {
                ctx.moveTo(x + cellWidth, y)
                ctx.lineTo(x + cellWidth, y + cellHeight)
            }
            if (cell & WALL_TYPES.BOTTOM) {
                ctx.moveTo(x, y + cellHeight)
                ctx.lineTo(x + cellWidth, y + cellHeight)
            }
            if (cell & WALL_TYPES.LEFT) {
                ctx.moveTo(x, y)
                ctx.lineTo(x, y + cellHeight)
            }
            ctx.stroke()

            if (i === 0 && j === 0) {
                ctx.fillStyle = '#4CAF50'
                ctx.beginPath()
                ctx.arc(
                    x + cellWidth / 2,
                    y + cellHeight / 2,
                    3,
                    0,
                    Math.PI * 2
                )
                ctx.fill()
            }
            if (i === MAZE_CONFIG.ROWS - 1 && j === MAZE_CONFIG.COLS - 1) {
                ctx.fillStyle = '#f44336'
                ctx.beginPath()
                ctx.arc(
                    x + cellWidth / 2,
                    y + cellHeight / 2,
                    3,
                    0,
                    Math.PI * 2
                )
                ctx.fill()
            }
        })
    })
} 