import { z } from 'zod';

export const navigation = z.object({
  _id: z.string(),
  title: z.string(),
  status: z.string(),
  resume: z.object({
    _type: z.string(),
    description: z.string(),
    asset: z.object({
      _id: z.string(),
      url: z.string(),
    }),
  }),
});

export type NavigationType = z.infer<typeof navigation>;
