'use client'

import * as React from 'react'
import { useEffect } from 'react'

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Apply saved theme on mount
    const savedTheme = localStorage.getItem('theme') || 'dark'
    document.documentElement.classList.toggle('dark', savedTheme === 'dark')
    document.documentElement.classList.toggle('light', savedTheme === 'light')
  }, [])

  return <>{children}</>
}
