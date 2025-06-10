import { z } from 'zod';
import { TagWhereUniqueInputObjectSchema } from './TagWhereUniqueInput.schema';
import { TagUpdateWithoutMenuInputObjectSchema } from './TagUpdateWithoutMenuInput.schema';
import { TagUncheckedUpdateWithoutMenuInputObjectSchema } from './TagUncheckedUpdateWithoutMenuInput.schema';
import { TagCreateWithoutMenuInputObjectSchema } from './TagCreateWithoutMenuInput.schema';
import { TagUncheckedCreateWithoutMenuInputObjectSchema } from './TagUncheckedCreateWithoutMenuInput.schema';

import type { Prisma } from '../../../old-client';

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
