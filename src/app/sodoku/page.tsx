"use client"

import { useEffect, useState } from "react"
import { Button, Input } from "antd"
import styles from './index.module.scss'
import { generateSudoku, solveSudoku } from "./components/utils"

type Board = (number | null)[][]

export default function Sodoku() {
    const [board, setBoard] = useState<Board>(Array(9).fill(null).map(() => Array(9).fill(null)))
    const [solution, setSolution] = useState<Board>(Array(9).fill(null).map(() => Array(9).fill(null)))
    const [isValid, setIsValid] = useState(true)

    // 生成新游戏
    const generateNewGame = () => {
        const newBoard = generateSudoku()
        setBoard(newBoard)
        const solvedBoard = solveSudoku(newBoard.map(row => [...row]))
        setSolution(solvedBoard)
    }

    // 检查输入是否有效
    const isValidInput = (value: string, row: number, col: number): boolean => {
        if (value === '') return true
        const num = parseInt(value)
        if (isNaN(num) || num < 1 || num > 9) return false

        // 检查行
        for (let i = 0; i < 9; i++) {
            if (i !== col && board[row][i] === num) return false
        }

        // 检查列
        for (let i = 0; i < 9; i++) {
            if (i !== row && board[i][col] === num) return false
        }

        // 检查3x3方格
        const boxRow = Math.floor(row / 3) * 3
        const boxCol = Math.floor(col / 3) * 3
        for (let i = boxRow; i < boxRow + 3; i++) {
            for (let j = boxCol; j < boxCol + 3; j++) {
                if (i !== row && j !== col && board[i][j] === num) return false
            }
        }

        return true
    }

    // 处理单元格输入
    const handleCellInput = (value: string, row: number, col: number) => {
        if (value === '' || (isValidInput(value, row, col))) {
            const newBoard = [...board.map(row => [...row])]
            newBoard[row][col] = value === '' ? null : parseInt(value)
            setBoard(newBoard)
            setIsValid(true)
        } else {
            setIsValid(false)
        }
    }

    // 检查游戏是否完成
    const checkCompletion = () => {
        if (!solution.length) return false
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                if (board[i][j] !== solution[i][j]) return false
            }
        }
        return true
    }

    // 生成答案
    const generateResult = () => {
        if (solution.length) {
            setBoard(solution.map(row => [...row]))
        }
    }

    useEffect(() => {
        generateNewGame()
    }, [])

    return (
        <div className={styles.sodoku}>
            <div className={styles.board}>
                {board.map((row, i) => (
                    <div key={i} className={styles.row}>
                        {row.map((cell, j) => (
                            <Input
                                key={`${i}-${j}`}
                                className={styles.cell}
                                value={cell === null ? '' : cell.toString()}
                                onChange={(e) => handleCellInput(e.target.value, i, j)}
                                maxLength={1}
                            />
                        ))}
                    </div>
                ))}
            </div>
            <div className={styles.controls}>
                <Button onClick={generateNewGame}>新游戏</Button>
                <Button onClick={generateResult}>生成答案</Button>
                {!isValid && <div className={styles.error}>输入无效</div>}
                {checkCompletion() && <div className={styles.success}>恭喜完成！</div>}
            </div>
        </div>
    )
}
