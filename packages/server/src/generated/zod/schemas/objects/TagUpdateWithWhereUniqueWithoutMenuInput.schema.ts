import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { TagUncheckedUpdateWithoutMenuInputObjectSchema } from './TagUncheckedUpdateWithoutMenuInput.schema';
import { TagUpdateWithoutMenuInputObjectSchema } from './TagUpdateWithoutMenuInput.schema';
import { TagWhereUniqueInputObjectSchema } from './TagWhereUniqueInput.schema';

const Schema: z.ZodType<Prisma.TagUpdateWithWhereUniqueWithoutMenuInput> = z
  .object({
    where: z.lazy(() => TagWhereUniqueInputObjectSchema),
    data: z.union([
      z.lazy(() => TagUpdateWithoutMenuInputObjectSchema),
      z.lazy(() => TagUncheckedUpdateWithoutMenuInputObjectSchema),
    ]),
  })
  .strict();

export const TagUpdateWithWhereUniqueWithoutMenuInputObjectSchema = Schema;
