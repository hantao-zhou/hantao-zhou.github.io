import ProjectCard from '@/components/ProjectCard'
import { getProjects } from '@/lib/data'

export const metadata = { title: 'Projects' }

export default function ProjectsPage() {
  const projects = getProjects()
  return (
    <main className="space-y-4">
      <h1 className="text-2xl font-bold">Projects</h1>
      {projects.map((p) => (
        <ProjectCard key={p.title} project={p} />
      ))}
    </main>
  )
}
