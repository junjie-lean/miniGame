'use client'

import { Button, } from 'antd'
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()

  const allGames = [
    {
      name: '迷宫',
      path: '/labyrinth'
    },
    {
      name: '数独',
      path: '/sodoku'
    },
    {
      name: '象棋',
      path: '/chineseChess'
    }
  ]

  const gotoGame = (path: string) => {
    router.push(path)
  }

  return (
    <div className="flex flex-col items-center justify-center p-8 pb-20 gap-[16px]  font-[family-name:var(--font-geist-sans)]">
        {allGames.map((game) => (
          <Button  type="primary" key={game.path} onClick={() => gotoGame(game.path)}>
            {game.name}
          </Button>
        ))}
    </div>
  );
}
