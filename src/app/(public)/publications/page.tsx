import PubItem from '@/components/PubItem'
import JsonLd from '@/components/JsonLd'
import { getPublications } from '@/lib/data'

export const metadata = { title: 'Publications' }

export default function PublicationsPage() {
  const pubs = getPublications()
  return (
    <main className="space-y-4">
      <h1 className="text-2xl font-bold">Publications</h1>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'ItemList',
          itemListElement: pubs.map((p, i) => ({
            '@type': 'CreativeWork',
            position: i + 1,
            name: p.title,
            url: p.url,
          })),
        }}
      />
      <ul>
        {pubs.map((p) => (
          <PubItem key={p.title} pub={p} />
        ))}
      </ul>
    </main>
  )
}
