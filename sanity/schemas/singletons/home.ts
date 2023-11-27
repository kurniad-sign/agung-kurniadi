import { Home } from 'lucide-react';
import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'home',
  title: 'Home',
  type: 'document',
  icon: Home,
  // Uncomment below to have edits publish automatically as you type
  // liveEdit: true,
  fields: [
    defineField({
      name: 'title',
      description: 'This field is the title of your personal website.',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    // defineField({
    //   name: 'overview',
    //   description:
    //     'Used both for the <meta> description tag for SEO, and the personal website subheader.',
    //   title: 'Description',
    //   type: 'array',
    //   of: [
    //     // Paragraphs
    //     defineArrayMember({
    //       lists: [],
    //       marks: {
    //         annotations: [
    //           {
    //             name: 'link',
    //             type: 'object',
    //             title: 'Link',
    //             fields: [
    //               {
    //                 name: 'href',
    //                 type: 'url',
    //                 title: 'Url',
    //               },
    //             ],
    //           },
    //         ],
    //         decorators: [
    //           {
    //             title: 'Italic',
    //             value: 'em',
    //           },
    //           {
    //             title: 'Strong',
    //             value: 'strong',
    //           },
    //         ],
    //       },
    //       styles: [],
    //       type: 'block',
    //     }),
    //   ],
    //   validation: (rule) => rule.max(155).required(),
    // }),
    defineField({
      name: 'hero',
      title: 'Hero',
      type: 'hero',
    }),
    defineField({
      name: 'about',
      title: 'About',
      type: 'about',
    }),
    defineField({
      name: 'project_list',
      title: 'Project',
      type: 'project_list',
    }),
    defineField({
      name: 'skills',
      title: 'Skillset',
      type: 'skills',
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({ title }) {
      return {
        subtitle: 'Home',
        title,
      };
    },
  },
});
