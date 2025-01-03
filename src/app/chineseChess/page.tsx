"use client"
import { useState } from 'react'
import { Button } from 'antd'
import styles from './index.module.scss'
import { ChessPiece, Position, Side } from './components/types'
import { INITIAL_BOARD, getValidMoves } from './components/utils'

export default function ChineseChess() {
    const [pieces, setPieces] = useState<ChessPiece[]>(INITIAL_BOARD)
    const [selectedPiece, setSelectedPiece] = useState<ChessPiece | null>(null)
    const [currentTurn, setCurrentTurn] = useState<Side>('red')
    const [validMoves, setValidMoves] = useState<Position[]>([])

    const handleCellClick = (position: Position) => {
        if (!selectedPiece) {
            const pieceAtPosition = pieces.find(p => 
                p.position.x === position.x && 
                p.position.y === position.y && 
                p.side === currentTurn
            )
            if (pieceAtPosition) {
                setSelectedPiece(pieceAtPosition)
                setValidMoves(getValidMoves(pieceAtPosition, pieces))
            }
        } 
        else {
            if (validMoves.some(move => move.x === position.x && move.y === position.y)) {
                movePiece(selectedPiece, position)
            } 
            else {
                const newPiece = pieces.find(p => 
                    p.position.x === position.x && 
                    p.position.y === position.y && 
                    p.side === currentTurn
                )
                if (newPiece) {
                    setSelectedPiece(newPiece)
                    setValidMoves(getValidMoves(newPiece, pieces))
                } else {
                    setSelectedPiece(null)
                    setValidMoves([])
                }
            }
        }
    }

    const movePiece = (piece: ChessPiece, newPosition: Position) => {
        const newPieces = pieces.filter(p => 
            !(p.position.x === piece.position.x && p.position.y === piece.position.y) &&
            !(p.position.x === newPosition.x && p.position.y === newPosition.y)
        )

        newPieces.push({
            ...piece,
            position: newPosition
        })

        setPieces(newPieces)
        setSelectedPiece(null)
        setValidMoves([])
        setCurrentTurn(currentTurn === 'red' ? 'black' : 'red')
    }

    const resetGame = () => {
        setPieces(INITIAL_BOARD)
        setSelectedPiece(null)
        setValidMoves([])
        setCurrentTurn('red')
    }

    return (
        <div className={styles.chineseChess}>
            <div className={styles.board}>
                <div className={styles.grid}>
                    {Array(10).fill(null).map((_, row) => (
                        <div key={row} className={styles.row}>
                            {Array(9).fill(null).map((_, col) => (
                                <div
                                    key={`${row}-${col}`}
                                    className={`${styles.cell} ${
                                        validMoves.some(move => move.x === col && move.y === row) 
                                            ? styles.validMove 
                                            : ''
                                    }`}
                                    onClick={() => handleCellClick({ x: col, y: row })}
                                >
                                    {validMoves.some(move => move.x === col && move.y === row) && (
                                        <div className={styles.moveHint} />
                                    )}
                                </div>
                            ))}
                        </div>
                    ))}
                </div>

                {pieces.map((piece, index) => (
                    <div
                        key={index}
                        className={`${styles.piece} 
                            ${styles[piece.side]} 
                            ${selectedPiece === piece ? styles.selected : ''}`
                        }
                        style={{
                            left: `${piece.position.x * 11.11}%`,
                            top: `${piece.position.y * 10}%`
                        }}
                        onClick={() => handleCellClick(piece.position)}
                    >
                        {piece.type}
                    </div>
                ))}
            </div>

            <div className={styles.controls}>
                <Button onClick={resetGame}>重新开始</Button>
                <div className={styles.turn}>
                    当前回合: {currentTurn === 'red' ? '红方' : '黑方'}
                </div>
            </div>
        </div>
    )
}
