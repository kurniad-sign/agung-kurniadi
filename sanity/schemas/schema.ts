import { type SchemaTypeDefinition } from 'sanity';

import blog from './documents/blog';
import link from './documents/link';
import projects from './documents/projects';
import skillset from './documents/skillset';
import about from './objects/about';
import hero from './objects/hero';
import project from './objects/project';
import skills from './objects/skills';
import home from './singletons/home';
import settings from './singletons/settings';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    home,
    settings,
    link,
    blog,
    projects,
    hero,
    about,
    project,
    skillset,
    skills,
    // sitemeta
  ],
};
