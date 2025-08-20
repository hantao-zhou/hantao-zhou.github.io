import type { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'

type Cmd = { name: string; description: string; aliases?: string[]; action?: (r: AppRouterInstance)=>void }

export const registry: Cmd[] = [
  { name: 'help', description: 'List commands', action: () => {} },
  { name: 'about', description: 'About me', aliases:['whoami'], action: r => r.push('/about') },
  { name: 'projects', description: 'Selected projects', aliases:['ls-projects'], action: r => r.push('/projects') },
  { name: 'publications', description: 'Publications', aliases:['pubs'], action: r => r.push('/publications') },
  { name: 'talks', description: 'Talks & slides', action: r => r.push('/talks') },
  { name: 'cv', description: 'Curriculum vitae (PDF)', action: r => r.push('/cv') },
  { name: 'terminal', description: 'Open true emulator', aliases:['tty'], action: r => r.push('/terminal') },
  { name: 'demos', description: 'CLI/robotics demos', action: r => r.push('/demos') },
  { name: 'theme', description: 'Toggle phosphor theme', action: () => {
      const root = document.documentElement
      const current = getComputedStyle(root).getPropertyValue('--phosphor').trim()
      root.style.setProperty('--phosphor', current === '#a0ff8b' ? '#80d0ff' : '#a0ff8b')
    } },
]
