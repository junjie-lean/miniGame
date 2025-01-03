export const WALL_TYPES = {
    TOP: 1,    // 0001
    RIGHT: 2,  // 0010
    BOTTOM: 4, // 0100
    LEFT: 8    // 1000
} as const

export const MAZE_CONFIG = {
    ROWS: 40,
    COLS: 40
} as const

export const DIRECTIONS = [
    [-1, 0, WALL_TYPES.TOP, WALL_TYPES.BOTTOM],    // 上
    [0, 1, WALL_TYPES.RIGHT, WALL_TYPES.LEFT],     // 右
    [1, 0, WALL_TYPES.BOTTOM, WALL_TYPES.TOP],     // 下
    [0, -1, WALL_TYPES.LEFT, WALL_TYPES.RIGHT]     // 左
] as const

export type Algorithm = 'dfs' | 'bfs' | 'prim'

export const shuffleArray = <T,>(array: T[]): T[] => {
    const newArray = [...array]
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]]
    }
    return newArray
}

export const createEmptyMaze = () =>
    Array(MAZE_CONFIG.ROWS).fill(0).map(() =>
        Array(MAZE_CONFIG.COLS).fill(WALL_TYPES.TOP | WALL_TYPES.RIGHT | WALL_TYPES.BOTTOM | WALL_TYPES.LEFT)
    )

export const createVisitedArray = () =>
    Array(MAZE_CONFIG.ROWS).fill(false).map(() =>
        Array(MAZE_CONFIG.COLS).fill(false)
    ) 