import { Settings } from 'lucide-react';
import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'settings',
  title: 'Settings',
  type: 'document',
  icon: Settings,
  // Uncomment below to have edits publish automatically as you type
  // liveEdit: true,
  fields: [
    defineField({
      name: 'resume',
      title: 'Resume',
      type: 'file',
      fields: [{ name: 'description', title: 'Description', type: 'string' }],
    }),
    // defineField({
    //   name: 'footer',
    //   description:
    //     'This is a block of text that will be displayed at the bottom of the page.',
    //   title: 'Footer Info',
    //   type: 'array',
    //   of: [
    //     defineArrayMember({
    //       type: 'block',
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
    //       },
    //     }),
    //   ],
    // }),
    defineField({
      name: 'ogImage',
      title: 'Open Graph Image',
      type: 'image',
      description: 'Displayed on social cards and search engine results.',
      options: {
        hotspot: true,
      },
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Menu Items',
      };
    },
  },
});
