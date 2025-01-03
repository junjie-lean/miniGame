import '../styles/globals.scss'
import { Inter } from 'next/font/google'
import { AntdProvider } from '@/providers/AntdProvider'
import '@ant-design/v5-patch-for-react-19';

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <body className={inter.className}>
        <AntdProvider>
          {children}
        </AntdProvider>
      </body>
    </html>
  )
}
