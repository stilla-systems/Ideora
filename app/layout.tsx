import React from 'react'
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Providers } from '@/components/providers'
import { Toaster } from '@/components/ui/sonner'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'IDEORA | AI Content Intelligence Platform for Creators',
  description: 'Turn ideas into impact. AI-powered content intelligence for creators who want clarity, structure, and predictable growth. Real-time insights, opportunity alerts, and strategic direction.',
  generator: 'v0.app',
  icons: {
    icon: '/ideora-icon.png',
    apple: '/ideora-icon.png',
  },
  keywords: ['content intelligence', 'creator tools', 'content strategy', 'AI', 'growth platform'],
  openGraph: {
    title: 'IDEORA | AI Content Intelligence Platform',
    description: 'AI-powered content intelligence for creators. Get predictive scoring, real-time alerts, and strategic direction.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: '(function(){try{var t=localStorage.getItem("theme")||"dark";document.documentElement.classList.toggle("dark",t==="dark");document.documentElement.classList.toggle("light",t==="light")}catch(e){}})();',
          }}
        />
      </head>
      <body className={`${_geist.className} font-sans antialiased transition-colors duration-300`}>
        <Providers>{children}</Providers>
        <Toaster position="top-right" richColors closeButton />
      </body>
    </html>
  )
}
