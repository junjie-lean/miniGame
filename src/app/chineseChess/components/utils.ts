import { ChessPiece, Position, Side } from './types'

// 初始化棋盘
export const INITIAL_BOARD: ChessPiece[] = [
    // 红方
    { type: '车', side: 'red', position: { x: 0, y: 9 } },
    { type: '马', side: 'red', position: { x: 1, y: 9 } },
    { type: '相', side: 'red', position: { x: 2, y: 9 } },
    { type: '士', side: 'red', position: { x: 3, y: 9 } },
    { type: '帅', side: 'red', position: { x: 4, y: 9 } },
    { type: '士', side: 'red', position: { x: 5, y: 9 } },
    { type: '相', side: 'red', position: { x: 6, y: 9 } },
    { type: '马', side: 'red', position: { x: 7, y: 9 } },
    { type: '车', side: 'red', position: { x: 8, y: 9 } },
    { type: '炮', side: 'red', position: { x: 1, y: 7 } },
    { type: '炮', side: 'red', position: { x: 7, y: 7 } },
    { type: '兵', side: 'red', position: { x: 0, y: 6 } },
    { type: '兵', side: 'red', position: { x: 2, y: 6 } },
    { type: '兵', side: 'red', position: { x: 4, y: 6 } },
    { type: '兵', side: 'red', position: { x: 6, y: 6 } },
    { type: '兵', side: 'red', position: { x: 8, y: 6 } },

    // 黑方
    { type: '车', side: 'black', position: { x: 0, y: 0 } },
    { type: '马', side: 'black', position: { x: 1, y: 0 } },
    { type: '象', side: 'black', position: { x: 2, y: 0 } },
    { type: '仕', side: 'black', position: { x: 3, y: 0 } },
    { type: '将', side: 'black', position: { x: 4, y: 0 } },
    { type: '仕', side: 'black', position: { x: 5, y: 0 } },
    { type: '象', side: 'black', position: { x: 6, y: 0 } },
    { type: '马', side: 'black', position: { x: 7, y: 0 } },
    { type: '车', side: 'black', position: { x: 8, y: 0 } },
    { type: '炮', side: 'black', position: { x: 1, y: 2 } },
    { type: '炮', side: 'black', position: { x: 7, y: 2 } },
    { type: '卒', side: 'black', position: { x: 0, y: 3 } },
    { type: '卒', side: 'black', position: { x: 2, y: 3 } },
    { type: '卒', side: 'black', position: { x: 4, y: 3 } },
    { type: '卒', side: 'black', position: { x: 6, y: 3 } },
    { type: '卒', side: 'black', position: { x: 8, y: 3 } },
]

// 获取某个位置的棋子
export const getPieceAt = (position: Position, pieces: ChessPiece[]): ChessPiece | null => {
    return pieces.find(p => p.position.x === position.x && p.position.y === position.y) || null
}

// 判断是否在棋盘范围内
export const isInBoard = (position: Position): boolean => {
    return position.x >= 0 && position.x < 9 && position.y >= 0 && position.y < 10
}

// 判断是否在九宫格内
export const isInPalace = (position: Position, side: Side): boolean => {
    const y = side === 'red' ? position.y >= 7 && position.y <= 9 : position.y >= 0 && position.y <= 2
    return position.x >= 3 && position.x <= 5 && y
}

// 获取有效移动位置
export const getValidMoves = (piece: ChessPiece, pieces: ChessPiece[]): Position[] => {
    const moves: Position[] = []
    const { type, side, position } = piece

    switch (type) {
        case '帅':
        case '将':
            // 九宫格内走一步
            for (const [dx, dy] of [[0, 1], [1, 0], [0, -1], [-1, 0]]) {
                const newPos = { x: position.x + dx, y: position.y + dy }
                if (isInPalace(newPos, side) && canMove(piece, newPos, pieces)) {
                    moves.push(newPos)
                }
            }
            break
            
        // ... 其他棋子的移动规则
    }

    return moves
}

// 判断是否可以移动到目标位置
export const canMove = (piece: ChessPiece, target: Position, pieces: ChessPiece[]): boolean => {
    const targetPiece = getPieceAt(target, pieces)
    return !targetPiece || targetPiece.side !== piece.side
} 