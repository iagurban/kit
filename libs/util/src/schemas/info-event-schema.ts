import { z } from 'zod/v4';

import { baseEventSchema } from './raw-event-schema-parts';

export const infoEventSchema = baseEventSchema.extend({
  type: z.literal('info'),
  payload: z
    .object({
      title: z.string().min(1).optional(),
      bio: z.string().nullable().optional(),
      avatar: z.url().nullable().optional(),
    })
    .refine(data => Object.values(data).some(value => value !== undefined), {
      message: 'Info payload must contain at least one defined field.',
    }),
});
export type InfoEventDto = z.infer<typeof infoEventSchema>;
