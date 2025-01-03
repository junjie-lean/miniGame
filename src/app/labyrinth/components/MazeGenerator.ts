import { WALL_TYPES, MAZE_CONFIG, DIRECTIONS, shuffleArray, createEmptyMaze, createVisitedArray } from './utils'

export const generateLabyrinthDFS = () => {
    const maze = createEmptyMaze()
    const visited = createVisitedArray()
    const stack: [number, number][] = []
    
    visited[0][0] = true
    stack.push([0, 0])

    while (stack.length > 0) {
        const current = stack[stack.length - 1]
        const [row, col] = current
        
        const directions = shuffleArray([...DIRECTIONS])
        let hasUnvisitedNeighbor = false

        for (const [dx, dy, wall, oppositeWall] of directions) {
            const newRow = row + dx
            const newCol = col + dy

            if (newRow >= 0 && newRow < MAZE_CONFIG.ROWS &&
                newCol >= 0 && newCol < MAZE_CONFIG.COLS &&
                !visited[newRow][newCol]) {
                visited[newRow][newCol] = true
                maze[row][col] &= ~wall
                maze[newRow][newCol] &= ~oppositeWall
                stack.push([newRow, newCol])
                hasUnvisitedNeighbor = true
                break
            }
        }

        if (!hasUnvisitedNeighbor) {
            stack.pop()
        }
    }

    maze[0][0] &= ~WALL_TYPES.LEFT
    maze[MAZE_CONFIG.ROWS - 1][MAZE_CONFIG.COLS - 1] &= ~WALL_TYPES.RIGHT
    return maze
}

export const generateLabyrinthBFS = () => {
    const maze = createEmptyMaze()
    const visited = createVisitedArray()
    const queue: [number, number][] = [[0, 0]]
    visited[0][0] = true

    while (queue.length > 0) {
        const randomIndex = Math.floor(Math.random() * queue.length)
        const [row, col] = queue[randomIndex]
        queue.splice(randomIndex, 1)

        const directions = shuffleArray([...DIRECTIONS])

        for (const [dx, dy, wall, oppositeWall] of directions) {
            const newRow = row + dx
            const newCol = col + dy

            if (newRow >= 0 && newRow < MAZE_CONFIG.ROWS &&
                newCol >= 0 && newCol < MAZE_CONFIG.COLS &&
                !visited[newRow][newCol]) {
                maze[row][col] &= ~wall
                maze[newRow][newCol] &= ~oppositeWall
                visited[newRow][newCol] = true
                queue.push([newRow, newCol])
            }
        }
    }

    maze[0][0] &= ~WALL_TYPES.LEFT
    maze[MAZE_CONFIG.ROWS - 1][MAZE_CONFIG.COLS - 1] &= ~WALL_TYPES.RIGHT
    return maze
}

export const generateLabyrinthPrim = () => {
    const maze = createEmptyMaze()
    const visited = createVisitedArray()
    const walls: [number, number, number, number, number, number][] = []

    visited[0][0] = true
    if (0 < MAZE_CONFIG.ROWS - 1) walls.push([0, 0, 1, 0, WALL_TYPES.BOTTOM, WALL_TYPES.TOP])
    if (0 < MAZE_CONFIG.COLS - 1) walls.push([0, 0, 0, 1, WALL_TYPES.RIGHT, WALL_TYPES.LEFT])

    while (walls.length > 0) {
        const randomIndex = Math.floor(Math.random() * walls.length)
        const [row, col, newRow, newCol, wall, oppositeWall] = walls[randomIndex]
        walls.splice(randomIndex, 1)

        if (!visited[newRow][newCol]) {
            maze[row][col] &= ~wall
            maze[newRow][newCol] &= ~oppositeWall
            visited[newRow][newCol] = true

            for (const [dx, dy, wall, oppositeWall] of DIRECTIONS) {
                const nextRow = newRow + dx
                const nextCol = newCol + dy

                if (nextRow >= 0 && nextRow < MAZE_CONFIG.ROWS &&
                    nextCol >= 0 && nextCol < MAZE_CONFIG.COLS &&
                    !visited[nextRow][nextCol]) {
                    walls.push([newRow, newCol, nextRow, nextCol, wall, oppositeWall])
                }
            }
        }
    }

    maze[0][0] &= ~WALL_TYPES.LEFT
    maze[MAZE_CONFIG.ROWS - 1][MAZE_CONFIG.COLS - 1] &= ~WALL_TYPES.RIGHT
    return maze
} 