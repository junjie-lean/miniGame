export type Side = 'red' | 'black'

export type PieceType = 
    | '帅' | '将'  // 将帅
    | '士' | '仕'  // 士
    | '相' | '象'  // 相象
    | '马'        // 马
    | '车'        // 车
    | '炮'        // 炮
    | '兵' | '卒'  // 兵卒

export interface Position {
    x: number
    y: number
}

export interface ChessPiece {
    type: PieceType
    side: Side
    position: Position
} 