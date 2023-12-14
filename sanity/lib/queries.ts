import { makeSafeQueryRunner, q } from 'groqd';
import { groq } from 'next-sanity';

import { navigation } from '../types/navigation';
import { client } from './client';
import { home } from './types';

const runQuery = makeSafeQueryRunner((query) => client.fetch(query));

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

export const navigationDataQuery = groq`
  *[_type == "navigation"][0] {
    _id,
    title,
    status,
    resume{
      ...,
      asset->{
        _id,
        url
     }
    }
  }
`;

export const metaHomeQuery = await runQuery(
  q('*').filter('_type == "home"').slice(1).grab$({
    title: q.string(),
    overview: q.string(),
  })
);

export async function makeHomeQuery() {
  return await client
    .fetch(homeDataQuery)
    .then((result) => (result ? home.parse(result) : null));
}

export async function makeNavigationQuery() {
  return await client
    .fetch(navigationDataQuery)
    .then((result) => (result ? navigation.parse(result) : null));
}
