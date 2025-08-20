'use client'
import dynamic from 'next/dynamic'

const XTermClient = dynamic(() => import('@/components/XTermClient'), { ssr: false })

export default function Page() {
  return (
    <main>
      <h1 className="mb-3 text-sm text-neutral-400">/terminal</h1>
      <XTermClient />
    </main>
  )
}
