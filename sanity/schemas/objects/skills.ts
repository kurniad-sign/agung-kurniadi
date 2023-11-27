import { defineArrayMember, defineField, defineType } from 'sanity';

export default defineType({
  name: 'skills',
  title: 'Skill',
  description: 'Skillset section content',

  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Skill Title',
      type: 'string',
    }),
    defineField({
      name: 'list',
      title: 'Skill List',
      description: 'Skillset list that will appear first on your landing page.',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'reference',
          to: [{ type: 'skillset' }],
        }),
      ],
    }),
  ],
});
