import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'

type Pub = { title:string; venue:string; year:number; authors:string[]; pdf?:string; code?:string }

export default function Page() {
  const dir = path.join(process.cwd(), 'content/publications')
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.mdx'))
  const pubs: Pub[] = files.map(f => matter.read(path.join(dir,f)).data as Pub).sort((a,b)=>b.year-a.year)
  return (
    <main>
      <h1 className="mb-4 text-xl">Publications</h1>
      <ul className="space-y-3">
        {pubs.map((p,i)=>(
          <li key={i} className="rounded-xl border border-neutral-800 p-3">
            <div className="font-semibold">{p.title} <span className="text-neutral-400">({p.year})</span></div>
            <div className="text-sm text-neutral-400">{p.authors.join(', ')}</div>
            <div className="text-sm">{p.venue}</div>
            <div className="text-sm space-x-3">
              {p.pdf && <a href={p.pdf}>pdf</a>}
              {p.code && <a href={p.code}>code</a>}
            </div>
          </li>
        ))}
      </ul>
    </main>
  )
}
