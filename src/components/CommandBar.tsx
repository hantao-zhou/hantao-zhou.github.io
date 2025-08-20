'use client'
import * as React from 'react'
import { Command } from 'cmdk'
import { useRouter } from 'next/navigation'
import { registry } from '@/lib/commands'

export default function CommandBar() {
  const [value, setValue] = React.useState('')
  const router = useRouter()

  function run(cmd: string) {
    const item = registry.find(c => c.name === cmd || c.aliases?.includes(cmd))
    if (!item) return
    item.action?.(router)
  }

  return (
    <Command className="rounded-2xl border border-neutral-800 bg-neutral-950">
      <Command.Input
        autoFocus
        placeholder="type help, about, projects, pubs, talks, cv, theme..."
        value={value}
        onValueChange={setValue}
        onKeyDown={(e) => { if (e.key === 'Enter') { run(value); setValue('') } }}
        className="w-full bg-transparent p-3 outline-none"
      />
      <Command.List className="p-2">
        {registry.map(c => (
          <Command.Item key={c.name} onSelect={() => run(c.name)} className="p-2">
            <span className="text-green-400">$</span>&nbsp;{c.name} — {c.description}
          </Command.Item>
        ))}
      </Command.List>
    </Command>
  )
}
