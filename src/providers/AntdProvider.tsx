'use client'

import { ConfigProvider } from 'antd'
import zhCN from 'antd/locale/zh_CN'
import { PropsWithChildren } from 'react'

export function AntdProvider({ children }: PropsWithChildren) {
  return (
    <ConfigProvider
      locale={zhCN}
      theme={{
        token: {
          colorPrimary: '#00b96b',
        },
      }}
    >
      {children}
    </ConfigProvider>
  )
} 