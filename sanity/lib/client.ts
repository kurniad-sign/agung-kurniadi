import { createClient } from 'next-sanity';

import { apiVersion, dataset, projectId, studioUrl, useCdn } from './api';

export const client = createClient({
  apiVersion,
  dataset,
  projectId,
  useCdn,
  perspective: 'published',
  studioUrl,
});
