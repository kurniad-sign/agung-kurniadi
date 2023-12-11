import { z } from 'zod';

const Slug = z
  .object({
    current: z.string().nullable(),
  })
  .nullable();

const Image = z.object({
  _type: z.string(),
  caption: z.string().nullable().optional(),
  asset: z.object({
    metadata: z.object({
      dimensions: z.object({
        width: z.number(),
        height: z.number(),
        aspectRatio: z.number(),
        _type: z.string(),
      }),
      blurHash: z.string(),
    }),
    url: z.string(),
  }),
});

const Project = z.object({
  _id: z.string(),
  coverImage: Image,
  description: z.string(),
  site: z.string(),
  slug: z.string(),
  title: z.string(),
  tags: z.array(z.string()),
});

const SkillList = z.object({
  _id: z.string(),
  name: z.string(),
  slug: z.string(),
  image: z.array(Image),
  description: z.string(),
});

const ProjectList = z.object({
  _type: z.string(),
  title: z.string(),
  list: z.array(Project),
});

const Skills = z.object({
  _type: z.string(),
  title: z.string(),
  list: z.array(SkillList),
});

export const home = z.object({
  _id: z.string(),
  about: z.object({
    _type: z.string(),
    description: z.string(),
    image: Image,
    title: z.string(),
  }),
  hero: z.object({
    _type: z.string(),
    description: z.string(),
    scroll_text: z.string(),
    title: z.string(),
  }),
  project_list: ProjectList,
  skills: Skills,
});

export type HomeQueryType = z.infer<typeof home>;
export type ProjectListQuery = z.infer<typeof ProjectList>;
export type SkillsQuery = z.infer<typeof Skills>;
