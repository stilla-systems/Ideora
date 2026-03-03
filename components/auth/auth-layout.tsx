import React from "react"
import Image from "next/image"

export function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="relative flex min-h-screen items-center justify-center px-4 py-12">
      {/* Cosmic background with particles */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-gradient-to-r from-violet-500/20 via-pink-500/15 to-transparent blur-3xl" />
        <div className="absolute right-1/4 bottom-1/4 h-96 w-96 rounded-full bg-gradient-to-r from-cyan-500/20 to-violet-500/15 blur-3xl" />
      </div>

      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="mb-4 flex justify-center">
            <Image 
              src="/ideora-icon.png" 
              alt="Ideora" 
              width={48}
              height={48}
              className="h-12 w-12" 
            />
          </div>
          <h1 className="text-3xl font-bold text-white">Ideora</h1>
          <p className="mt-2 text-gray-400">Content & Live Growth Direction</p>
        </div>

        <div 
          className="p-8 rounded-2xl shadow-lg border transition-all"
          style={{
            background: 'linear-gradient(135deg, rgba(167, 139, 250, 0.15) 0%, rgba(236, 72, 153, 0.1) 100%)',
            backdropFilter: 'blur(12px)',
            borderColor: 'rgba(167, 139, 250, 0.3)',
          }}
        >
          {children}
        </div>
      </div>
    </main>
  );
}
