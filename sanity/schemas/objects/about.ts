import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'about',
  title: 'About',
  description: 'About section content',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'About Title',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'About Description',
      type: 'text',
    }),
    defineField({
      name: 'image',
      title: 'About Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'caption',
          type: 'string',
          title: 'Caption',
        }),
        defineField({
          name: 'attribution',
          type: 'string',
          title: 'Attribution',
        }),
      ],
    }),
  ],
});
