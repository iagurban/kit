import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { TagCreateWithoutMenuInputObjectSchema } from './TagCreateWithoutMenuInput.schema';
import { TagUncheckedCreateWithoutMenuInputObjectSchema } from './TagUncheckedCreateWithoutMenuInput.schema';
import { TagUncheckedUpdateWithoutMenuInputObjectSchema } from './TagUncheckedUpdateWithoutMenuInput.schema';
import { TagUpdateWithoutMenuInputObjectSchema } from './TagUpdateWithoutMenuInput.schema';
import { TagWhereUniqueInputObjectSchema } from './TagWhereUniqueInput.schema';

const Schema: z.ZodType<Prisma.TagUpsertWithWhereUniqueWithoutMenuInput> = z
  .object({
    where: z.lazy(() => TagWhereUniqueInputObjectSchema),
    update: z.union([
      z.lazy(() => TagUpdateWithoutMenuInputObjectSchema),
      z.lazy(() => TagUncheckedUpdateWithoutMenuInputObjectSchema),
    ]),
    create: z.union([
      z.lazy(() => TagCreateWithoutMenuInputObjectSchema),
      z.lazy(() => TagUncheckedCreateWithoutMenuInputObjectSchema),
    ]),
  })
  .strict();

export const TagUpsertWithWhereUniqueWithoutMenuInputObjectSchema = Schema;
