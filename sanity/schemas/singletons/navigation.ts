import { Navigation } from 'lucide-react';
import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'navigation',
  title: 'Navigation',
  type: 'document',
  icon: Navigation,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'status',
      title: 'Work Status',
      type: 'string',
    }),
    defineField({
      name: 'resume',
      title: 'Resume',
      type: 'file',
      fields: [{ name: 'description', title: 'Description', type: 'string' }],
    }),
  ],
});
