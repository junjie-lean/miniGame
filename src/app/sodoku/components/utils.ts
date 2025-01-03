type Board = (number | null)[][]

// 生成数独游戏
export const generateSudoku = (): Board => {
    const board: Board = Array(9).fill(null).map(() => Array(9).fill(null))
    
    // 首先生成一个完整的解
    solveSudoku(board)
    
    // 随机移除一些数字来创建谜题
    const cellsToRemove = 40 // 控制难度
    let count = 0
    
    while (count < cellsToRemove) {
        const row = Math.floor(Math.random() * 9)
        const col = Math.floor(Math.random() * 9)
        
        if (board[row][col] !== null) {
            board[row][col] = null
            count++
        }
    }
    
    return board
}

// 求解数独
export const solveSudoku = (board: Board): Board => {
    const solve = (board: Board): boolean => {
        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                if (board[row][col] === null) {
                    for (let num = 1; num <= 9; num++) {
                        if (isValid(board, row, col, num)) {
                            board[row][col] = num
                            if (solve(board)) return true
                            board[row][col] = null
                        }
                    }
                    return false
                }
            }
        }
        return true
    }

    solve(board)
    return board
}

// 检查数字是否有效
const isValid = (board: Board, row: number, col: number, num: number): boolean => {
    // 检查行
    for (let x = 0; x < 9; x++) {
        if (board[row][x] === num) return false
    }

    // 检查列
    for (let x = 0; x < 9; x++) {
        if (board[x][col] === num) return false
    }

    // 检查3x3方格
    const startRow = Math.floor(row / 3) * 3
    const startCol = Math.floor(col / 3) * 3
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[i + startRow][j + startCol] === num) return false
        }
    }

    return true
} 