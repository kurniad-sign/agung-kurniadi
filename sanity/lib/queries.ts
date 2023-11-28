import { InferType, makeSafeQueryRunner, q } from 'groqd';

import { client } from './client';

export const runQuery = makeSafeQueryRunner((query) => client.fetch(query));

export const homeQuery = q('*')
  .filter('_type == "home"')
  .slice(1)
  .grab$({
    _id: q.string(),
    about: q.object({
      _type: q.string(),
      description: q.string(),
      title: q.string(),
    }),
    hero: q.object({
      _type: q.string(),
      description: q.string(),
      scroll_text: q.string(),
      title: q.string(),
    }),
    project_list: q.object({
      _type: q.string(),
      title: q.string(),
    }),
    skills: q.object({
      _type: q.string(),
      title: q.string(),
    }),
  });

export type HomeQueryType = InferType<typeof homeQuery>;
