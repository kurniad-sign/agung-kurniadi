import createImageUrlBuilder from '@sanity/image-url';
import { makeSafeQueryRunner } from 'groqd';
import type { Image } from 'sanity';

import { dataset, projectId } from '@/sanity/lib/api';

import { client } from './client';

const imageBuilder = createImageUrlBuilder({
  projectId: projectId || '',
  dataset: dataset || '',
});

export const urlForImage = (source: Image) => {
  return imageBuilder?.image(source).auto('format').fit('max');
};

export function urlForOpenGraphImage(image: Image) {
  return urlForImage(image)?.width(1200).height(627).fit('crop').url();
}

export function resolveHref(
  documentType?: string,
  slug?: string
): string | undefined {
  switch (documentType) {
    case 'home':
      return '/';
    case 'page':
      return slug ? `/${slug}` : undefined;
    default:
      console.warn('Invalid document type:', documentType);
      return undefined;
  }
}

export const runQuery = makeSafeQueryRunner((query) => client.fetch(query));
