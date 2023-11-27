import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'hero',
  title: 'Hero',
  description: 'Hero section content',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Hero Title',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Hero Description',
      type: 'string',
    }),
    defineField({
      name: 'scroll_text',
      title: 'Hero Scroll Text',
      type: 'string',
    }),
  ],
});
