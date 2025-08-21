import type { Project } from '@/lib/data'

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="border p-4 rounded space-y-2">
      <h3 className="text-lg font-semibold">
        <a href={project.url} target="_blank" rel="noopener noreferrer">
          {project.title}
        </a>
      </h3>
      <p>{project.description}</p>
      <div className="flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="text-xs bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  )
}
