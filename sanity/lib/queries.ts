import { InferType, q, sanityImage } from 'groqd';
import { groq } from 'next-sanity';

import { client } from './client';
import { home } from './types';

export const homeDataQuery = groq`
  *[_type == "home"][1]{
    _id,
    about{
      ...,
      image{
        _type,
        caption,
         asset->{
            metadata{
              dimensions,
              blurHash
            },
            url
          },
      },
    },
    hero,
    project_list{
      _type,
      title,
      list[]->{
        _id,
        coverImage{
          ...,
          asset->{
            metadata{
              dimensions,
              blurHash
            },
            url
          }
        },
        description,
        site,
        "slug": slug.current,
        title,
        tags,
      }
    },
    skills{
      _type,
      title,
      list[]->{
        _id,
        name,
         "slug": slug.current,
         description,
         image[]{
            ...,
          asset->{
            metadata{
              dimensions,
              blurHash
            },
            url
          }
        }
      }
    }
  }
`;

export async function makeHomeQuery() {
  return await client
    .fetch(homeDataQuery)
    .then((result) => (result ? home.parse(result) : null));
}

// GROQD Query Below
const projectQuery = q('*')
  .filter('_type == "project"')
  .grab$({
    _id: q.string(),
    coverImage: sanityImage('coverImage'),
    description: q.string(),
    site: q.string(),
    slug: q.slug('slug'),
    title: q.string(),
    tags: q.array(q.string()),
  });

type ProjectType = InferType<typeof projectQuery>;

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
      // list: projectQuery
    }),
    skills: q.object({
      _type: q.string(),
      title: q.string(),
    }),
  });

export type HomeQueryType = InferType<typeof homeQuery>;
