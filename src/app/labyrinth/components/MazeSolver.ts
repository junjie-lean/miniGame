import { DIRECTIONS, MAZE_CONFIG, createVisitedArray } from './utils'

export const solveMaze = (labyrinth: number[][]) => {
    const path: [number, number][] = []
    const visited = createVisitedArray()
    const stack: [number, number][] = [[0, 0]]
    const parent = new Map<string, [number, number]>()

    while (stack.length > 0) {
        const [row, col] = stack.pop()!

        if (row === MAZE_CONFIG.ROWS - 1 && col === MAZE_CONFIG.COLS - 1) {
            let current: [number, number] = [row, col]
            while (current) {
                path.unshift(current)
                const key = `${current[0]},${current[1]}`
                current = parent.get(key)!
                if (!parent.has(key)) break
            }
            break
        }

        if (!visited[row][col]) {
            visited[row][col] = true

            for (const [dx, dy, wall, ] of DIRECTIONS) {
                const newRow = row + dx
                const newCol = col + dy

                if (newRow >= 0 && newRow < MAZE_CONFIG.ROWS &&
                    newCol >= 0 && newCol < MAZE_CONFIG.COLS &&
                    !visited[newRow][newCol] &&
                    !(labyrinth[row][col] & wall)) {
                    stack.push([newRow, newCol])
                    parent.set(`${newRow},${newCol}`, [row, col])
                }
            }
        }
    }

    return path
}

export const drawSolution = (
    canvas: HTMLCanvasElement,
    solution: [number, number][]
) => {
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const width = canvas.width
    const height = canvas.height

    ctx.clearRect(0, 0, width, height)

    ctx.strokeStyle = '#4CAF50'
    ctx.lineWidth = 2
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'

    ctx.beginPath()
    solution.forEach((point, index) => {
        const [row, col] = point
        const x = (col + 0.5) * (width / MAZE_CONFIG.COLS)
        const y = (row + 0.5) * (height / MAZE_CONFIG.ROWS)

        if (index === 0) {
            ctx.moveTo(x, y)
        } else {
            ctx.lineTo(x, y)
        }
    })
    ctx.stroke()
} 