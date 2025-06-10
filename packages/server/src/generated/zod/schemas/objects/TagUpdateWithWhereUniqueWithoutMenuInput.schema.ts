import { z } from 'zod';
import { TagWhereUniqueInputObjectSchema } from './TagWhereUniqueInput.schema';
import { TagUpdateWithoutMenuInputObjectSchema } from './TagUpdateWithoutMenuInput.schema';
import { TagUncheckedUpdateWithoutMenuInputObjectSchema } from './TagUncheckedUpdateWithoutMenuInput.schema';

import type { Prisma } from '../../../old-client';

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
