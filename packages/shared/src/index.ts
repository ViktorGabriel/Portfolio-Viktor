import { z } from 'zod';

export const ProfileSchema = z.object({
  username: z.string(),
  name: z.string(),
  bio: z.string(),
  avatarUrl: z.string().url(),
  githubUrl: z.string().url(),
  location: z.string().optional().default('Brasil'),
  company: z.string().optional().default('Open to Work / Freelance'),
  followers: z.number().default(0),
  following: z.number().default(0),
  publicRepos: z.number().default(0),
  status: z.string().default('Building high-impact solutions with Clean Architecture & SOLID 🚀'),
  skills: z.array(z.string()).default([
    'Node.js',
    'TypeScript',
    'React',
    'Fastify',
    'Clean Architecture',
    'SOLID',
    'Tailwind CSS',
    'Docker'
  ])
});

export type Profile = z.infer<typeof ProfileSchema>;

export const ProjectMetricSchema = z.object({
  stars: z.number().default(0),
  forks: z.number().default(0),
  openIssues: z.number().default(0),
  watchers: z.number().default(0)
});

export type ProjectMetric = z.infer<typeof ProjectMetricSchema>;

export const ArchitectureHighlightSchema = z.object({
  title: z.string(),
  description: z.string()
});

export type ArchitectureHighlight = z.infer<typeof ArchitectureHighlightSchema>;

export const ProjectSchema = z.object({
  id: z.string(),
  name: z.string(),
  displayName: z.string(),
  description: z.string(),
  primaryLanguage: z.string().default('TypeScript'),
  languageColor: z.string().default('#3178c6'),
  metrics: ProjectMetricSchema.default({}),
  githubUrl: z.string().url(),
  homepageUrl: z.string().url().nullable().optional(),
  thumbnailUrl: z.string(),
  topics: z.array(z.string()).default([]),
  category: z.enum(['backend', 'fullstack', 'frontend', 'mobile', 'api']).default('backend'),
  isPinned: z.boolean().default(false),
  architecture: z.array(ArchitectureHighlightSchema).default([]),
  challenges: z.array(z.string()).default([]),
  updatedAt: z.string()
});

export type Project = z.infer<typeof ProjectSchema>;

export const LanguageStatSchema = z.object({
  language: z.string(),
  count: z.number(),
  color: z.string()
});

export type LanguageStat = z.infer<typeof LanguageStatSchema>;

export const PortfolioOverviewResponseSchema = z.object({
  profile: ProfileSchema,
  pinnedProjects: z.array(ProjectSchema),
  allProjects: z.array(ProjectSchema),
  stats: z.object({
    totalStars: z.number(),
    totalRepos: z.number(),
    topLanguages: z.array(LanguageStatSchema)
  }),
  cachedAt: z.string(),
  isCached: z.boolean()
});

export type PortfolioOverviewResponse = z.infer<typeof PortfolioOverviewResponseSchema>;
