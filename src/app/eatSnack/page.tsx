"use client"

import { useEffect, useState, useCallback } from 'react'
import { Button } from 'antd'
import styles from './index.module.scss'

type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT'
type Position = { x: number; y: number }

const GRID_SIZE = 20
const INITIAL_SNAKE = [
    { x: 10, y: 10 },
    { x: 10, y: 11 },
    { x: 10, y: 12 }
]

export default function Snake() {
    const [snake, setSnake] = useState<Position[]>(INITIAL_SNAKE)
    const [food, setFood] = useState<Position>({ x: 5, y: 5 })
    const [direction, setDirection] = useState<Direction>('UP')
    const [isGameOver, setIsGameOver] = useState(false)
    const [score, setScore] = useState(0)
    const [gameStarted, setGameStarted] = useState(false)

    // 生成新的食物位置
    const generateFood = useCallback(() => {
        let newFood: Position
        do {
            newFood = {
                x: Math.floor(Math.random() * GRID_SIZE),
                y: Math.floor(Math.random() * GRID_SIZE)
            }
        } while (snake.some(segment => segment.x === newFood.x && segment.y === newFood.y))
        setFood(newFood)
    }, [snake])

    // 处理键盘输入
    const handleKeyPress = useCallback((event: KeyboardEvent) => {
        if (!gameStarted) return

        switch (event.key.toLowerCase()) {
            case 'w':
                if (direction !== 'DOWN') setDirection('UP')
                break
            case 's':
                if (direction !== 'UP') setDirection('DOWN')
                break
            case 'a':
                if (direction !== 'RIGHT') setDirection('LEFT')
                break
            case 'd':
                if (direction !== 'LEFT') setDirection('RIGHT')
                break
        }
    }, [direction, gameStarted])

    // 移动蛇
    const moveSnake = useCallback(() => {
        if (isGameOver || !gameStarted) return

        const head = { ...snake[0] }

        switch (direction) {
            case 'UP':
                head.y -= 1
                break
            case 'DOWN':
                head.y += 1
                break
            case 'LEFT':
                head.x -= 1
                break
            case 'RIGHT':
                head.x += 1
                break
        }

        // 检查是否撞墙
        if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
            setIsGameOver(true)
            return
        }

        // 检查是否撞到自己
        if (snake.some(segment => segment.x === head.x && segment.y === head.y)) {
            setIsGameOver(true)
            return
        }

        const newSnake = [head]

        // 检查是否吃到食物
        if (head.x === food.x && head.y === food.y) {
            setScore(score + 1)
            generateFood()
            newSnake.push(...snake)
        } else {
            newSnake.push(...snake.slice(0, -1))
        }

        setSnake(newSnake)
    }, [snake, direction, food, isGameOver, gameStarted, score, generateFood])

    // 开始新游戏
    const startNewGame = () => {
        setSnake(INITIAL_SNAKE)
        setDirection('UP')
        setIsGameOver(false)
        setScore(0)
        generateFood()
        setGameStarted(true)
    }

    // 键盘事件监听
    useEffect(() => {
        window.addEventListener('keydown', handleKeyPress)
        return () => window.removeEventListener('keydown', handleKeyPress)
    }, [handleKeyPress])

    // 游戏主循环
    useEffect(() => {
        const gameLoop = setInterval(moveSnake, 150)
        return () => clearInterval(gameLoop)
    }, [moveSnake])

    return (
        <div className={styles.snake}>
            <div className={styles.gameBoard}>
                {/* 渲染网格 */}
                {Array(GRID_SIZE).fill(null).map((_, row) => (
                    <div key={row} className={styles.row}>
                        {Array(GRID_SIZE).fill(null).map((_, col) => {
                            const isSnake = snake.some(segment => segment.x === col && segment.y === row)
                            const isFood = food.x === col && food.y === row
                            return (
                                <div
                                    key={`${row}-${col}`}
                                    className={`${styles.cell} ${isSnake ? styles.snake : ''} ${isFood ? styles.food : ''}`}
                                />
                            )
                        })}
                    </div>
                ))}
            </div>

            <div className={styles.controls}>
                <div className={styles.score}>得分: {score}</div>
                <Button onClick={startNewGame}>
                    {gameStarted ? '重新开始' : '开始游戏'}
                </Button>
                {isGameOver && <div className={styles.gameOver}>游戏结束!</div>}
            </div>
        </div>
    )
}
