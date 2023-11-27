import { defineArrayMember, defineField, defineType } from 'sanity';

export default defineType({
  name: 'projects',
  title: 'Project',
  description: 'Project Section',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Project Title',
      type: 'string',
    }),
    defineField({
      name: 'list',
      title: 'Project List',
      description:
        'These are the projects that will appear first on your landing page.',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'reference',
          to: [{ type: 'project' }],
        }),
      ],
    }),
  ],
});
