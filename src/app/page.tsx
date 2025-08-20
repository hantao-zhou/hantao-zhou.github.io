import CommandBar from '@/components/CommandBar'

export default function Home() {
  return (
    <main className="min-h-[80vh] grid place-items-center">
      <div className="w-full max-w-3xl">
        <div className="mb-4 text-sm text-neutral-400">Hantao Zhou @ ~/</div>
        <div className="mb-2 text-lg"><span className="text-green-400">$</span> welcome — type <kbd>help</kbd></div>
        <CommandBar />
      </div>
    </main>
  )
}
