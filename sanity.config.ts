/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `/app/studio/[[...index]]/page.tsx` route
 */

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import { codeInput } from '@sanity/code-input';
import { visionTool } from '@sanity/vision';
import { defineConfig } from 'sanity';
import { unsplashImageAsset } from 'sanity-plugin-asset-source-unsplash';
import { deskTool } from 'sanity/desk';
import { presentationTool } from 'sanity/presentation';

import { apiVersion, dataset, projectId, studioUrl } from '@/sanity/lib/api';
import { locate } from '@/sanity/plugins/locate';

import { pageStructure, singletonPlugin } from './sanity/plugins/settings';
import { schema } from './sanity/schemas/schema';
import home from './sanity/schemas/singletons/home';
import settings from './sanity/schemas/singletons/settings';

const title =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_TITLE ||
  'Next.js Personal Website with Sanity.io';

export default defineConfig({
  basePath: studioUrl,
  projectId: projectId || '',
  dataset: dataset || '',
  // Add and edit the content schema in the './sanity/schema' folder
  schema,
  title,
  plugins: [
    codeInput(),
    deskTool({
      structure: pageStructure([home, settings]),
    }),
    presentationTool({
      locate,
      previewUrl: {
        origin:
          typeof location === 'undefined'
            ? 'http://localhost:3000'
            : location.origin,
        draftMode: {
          enable: '/api/draft',
        },
      },
    }),
    singletonPlugin([home.name, settings.name]),
    unsplashImageAsset(),
    // Vision is a tool that lets you query your content with GROQ in the studio
    // https://www.sanity.io/docs/the-vision-plugin
    visionTool({ defaultApiVersion: apiVersion }),
  ],
});
