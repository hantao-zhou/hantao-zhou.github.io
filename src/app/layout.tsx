import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Hantao Zhou — Home',
  description: 'RL/Robotics • HPC • LLM/VLM — terminal-style portfolio',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-black text-neutral-200">
        <div className="mx-auto max-w-5xl p-4">{children}</div>
      </body>
    </html>
  )
}
