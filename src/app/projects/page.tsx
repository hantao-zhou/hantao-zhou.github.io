/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

declare global {
  interface Window { WinBox: any }
}

export default function Page() {
  function openBox() {
    const script = document.createElement('script')
    script.src = 'https://unpkg.com/winbox/dist/winbox.bundle.js'
    script.onload = () => {
      const box = new window.WinBox('Demo', {
        x: 'center',
        y: 'center',
        width: '300px',
        height: '200px'
      })
      const div = document.createElement('div')
      div.innerHTML = '<div class="p-2">Project visualization coming soon...</div>'
      box.mount(div)
    }
    document.body.appendChild(script)
  }
  return (
    <main>
      <h1 className="mb-4 text-xl">Projects</h1>
      <p>Project list coming soon.</p>
      <button onClick={openBox} className="mt-4 underline">Open demo window</button>
    </main>
  )
}
