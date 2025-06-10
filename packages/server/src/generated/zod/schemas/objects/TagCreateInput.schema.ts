import { z } from 'zod';
import { MenuCreateNestedOneWithoutTagsInputObjectSchema } from './MenuCreateNestedOneWithoutTagsInput.schema';

import type { Prisma } from '../../../old-client';

const Schema: z.ZodType<Prisma.TagCreateInput> = z
  .object({
    id: z.string().optional(),
    menu: z.lazy(() => MenuCreateNestedOneWithoutTagsInputObjectSchema),
  })
  .strict();

export const TagCreateInputObjectSchema = Schema;
