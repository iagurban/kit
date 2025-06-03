import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { MenuCreateNestedOneWithoutTagsInputObjectSchema } from './MenuCreateNestedOneWithoutTagsInput.schema';

const Schema: z.ZodType<Prisma.TagCreateInput> = z
  .object({
    id: z.string().optional(),
    menu: z.lazy(() => MenuCreateNestedOneWithoutTagsInputObjectSchema),
  })
  .strict();

export const TagCreateInputObjectSchema = Schema;
