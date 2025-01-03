'use client'

import { Button, } from 'antd'
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()

  const gotoLabyrinth = () => {
    router.push('/labyrinth')
  }

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <Button  type="primary" onClick={gotoLabyrinth}>
          进入迷宫
        </Button>
    </div>
  );
}
