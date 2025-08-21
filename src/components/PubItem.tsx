import type { Publication } from '@/lib/data'

export default function PubItem({ pub }: { pub: Publication }) {
  return (
    <li className="mb-4">
      <a
        href={pub.url}
        target="_blank"
        rel="noopener noreferrer"
        className="font-medium"
      >
        {pub.title}
      </a>
      <div className="text-sm text-gray-600 dark:text-gray-400">
        {pub.authors.join(', ')} · {pub.publisher} · {pub.date}
      </div>
      <div className="flex flex-wrap gap-2 mt-1">
        {pub.tags.map((tag) => (
          <span
            key={tag}
            className="text-xs bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded"
          >
            {tag}
          </span>
        ))}
      </div>
    </li>
  )
}
