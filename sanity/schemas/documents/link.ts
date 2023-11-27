import { Link } from 'lucide-react';
import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'social',
  title: 'Social Media',
  type: 'document',
  icon: Link,
  fields: [
    defineField({
      type: 'string',
      name: 'title',
      title: 'Title',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'link',
      title: 'Social Media Link',
      type: 'url',
    }),
  ],
});
