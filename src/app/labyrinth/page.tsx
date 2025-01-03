"use client"

import { useState, useEffect, useRef } from 'react'
import { Button, Select } from 'antd'
import styles from './index.module.scss'
import { Algorithm } from './components/utils'
import { generateLabyrinthDFS, generateLabyrinthBFS, generateLabyrinthPrim } from './components/MazeGenerator'
import { drawMaze } from './components/MazeRenderer'
import { solveMaze, drawSolution } from './components/MazeSolver'

export default function Labyrinth() {
    const [labyrinth, setLabyrinth] = useState<number[][]>([])
    const [algorithm, setAlgorithm] = useState<Algorithm>('dfs')
    const [showSolution, setShowSolution] = useState(false)

    const mazeCanvasRef = useRef<HTMLCanvasElement>(null)
    const solutionCanvasRef = useRef<HTMLCanvasElement>(null)

    const generateLabyrinth = () => {
        switch (algorithm) {
            case 'dfs': return generateLabyrinthDFS()
            case 'bfs': return generateLabyrinthBFS()
            case 'prim': return generateLabyrinthPrim()
            default: return generateLabyrinthDFS()
        }
    }

    const whenAlgorithmChange = (value: Algorithm) => {
        setShowSolution(false)
        setAlgorithm(value)
    }

    useEffect(() => {
        if (showSolution && solutionCanvasRef.current) {
            const solution = solveMaze(labyrinth)
            drawSolution(solutionCanvasRef.current, solution)
        } else if (solutionCanvasRef.current) {
            const ctx = solutionCanvasRef.current.getContext('2d')
            ctx?.clearRect(0, 0, solutionCanvasRef.current.width, solutionCanvasRef.current.height)
        }
    }, [showSolution, labyrinth])

    useEffect(() => {
        setLabyrinth(generateLabyrinth())
    }, [algorithm])

    useEffect(() => {
        if (labyrinth.length > 0 && mazeCanvasRef.current) {
            drawMaze(mazeCanvasRef.current, labyrinth)
        }
    }, [labyrinth])

    return (
        <div className={styles.labyrinth}>
            <div className={styles['labyrinth-container']}>
                <canvas
                    ref={mazeCanvasRef}
                    className="absolute top-0 left-0 w-full h-full"
                />
                <canvas
                    ref={solutionCanvasRef}
                    className="absolute top-0 left-0 w-full h-full z-10 pointer-events-none"
                />
            </div>
            <div className='controls'>
                <Select
                    value={algorithm}
                    onChange={whenAlgorithmChange}
                    className="select-algorithm w-[200px]"
                >
                    <Select.Option value="dfs">深度优先搜索 (DFS)</Select.Option>
                    <Select.Option value="bfs">广度优先搜索 (BFS)</Select.Option>
                    <Select.Option value="prim">Prim 算法</Select.Option>
                </Select>
                <Button type="primary"
                    onClick={() => setShowSolution(!showSolution)}
                    className="solution-toggle ml-1"
                >
                    {showSolution ? '隐藏路径' : '显示路径'}
                </Button>
            </div>
        </div>
    )
}


