'use client'
import { useEffect, useRef } from 'react'
import { Terminal } from 'xterm'
import { FitAddon } from 'xterm-addon-fit'
import { WebLinksAddon } from 'xterm-addon-web-links'
import 'xterm/css/xterm.css'
import { registry } from '@/lib/commands'
import { useRouter } from 'next/navigation'

export default function XTermClient() {
  const el = useRef<HTMLDivElement>(null)
  const router = useRouter()

  useEffect(() => {
    const term = new Terminal({ cursorBlink: true, theme: { background: '#000000', green: '#a0ff8b' } })
    const fit = new FitAddon()
    term.loadAddon(fit)
    term.loadAddon(new WebLinksAddon())
    term.open(el.current!)
    fit.fit()
    const prompt = () => term.write('\r\n\x1b[32m$\x1b[0m ')

    term.writeln('Welcome to the emulator. Try: help, about, pubs, projects, talks, cv, demos')
    prompt()
    let buf = ''

    term.onData((d) => {
      if (d === '\r') {
        const cmd = buf.trim()
        const item = registry.find(c => c.name === cmd || c.aliases?.includes(cmd))
        if (!item) term.writeln(`command not found: ${cmd}`)
        else {
          if (['about','projects','publications','talks','cv','terminal','demos'].includes(item.name)) item.action?.(router)
          else { item.action?.(router); term.writeln(`executed: ${item.name}`) }
        }
        buf = ''
        prompt()
      } else if (d === '\u007F') {
        if (buf.length>0) { term.write('\b \b'); buf = buf.slice(0,-1) }
      } else if (d === '\t') {
        const hits = registry.filter(c => c.name.startsWith(buf))
        if (hits.length===1){ const rest = hits[0].name.slice(buf.length); term.write(rest); buf = hits[0].name }
      } else {
        buf += d; term.write(d)
      }
    })

    const onResize = () => fit.fit()
    window.addEventListener('resize', onResize)
    return () => { window.removeEventListener('resize', onResize); term.dispose() }
  }, [router])

  return <div className="h-[70vh] w-full rounded-2xl border border-neutral-800 p-2"><div ref={el} className="h-full" /></div>
}
