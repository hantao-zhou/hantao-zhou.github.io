import fs from 'fs'
import path from 'path'
import yaml from 'yaml'
import { z } from 'zod'

const projectSchema = z.object({
  title: z.string(),
  description: z.string(),
  url: z.string().url(),
  tags: z.array(z.string()).default([]),
})
export type Project = z.infer<typeof projectSchema>

const publicationSchema = z.object({
  title: z.string(),
  authors: z.array(z.string()),
  publisher: z.string(),
  date: z.string(),
  url: z.string().url(),
  tags: z.array(z.string()).default([]),
})
export type Publication = z.infer<typeof publicationSchema>

function loadYaml(file: string) {
  const filePath = path.join(process.cwd(), 'src', 'data', file)
  const raw = fs.readFileSync(filePath, 'utf8')
  return yaml.parse(raw)
}

export function getProjects(): Project[] {
  const data = loadYaml('projects.yaml')
  return z.array(projectSchema).parse(data)
}

export function getPublications(): Publication[] {
  const data = loadYaml('publications.yaml')
  return z.array(publicationSchema).parse(data)
}
