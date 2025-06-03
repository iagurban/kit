import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { TagCreateWithoutMenuInputObjectSchema } from './TagCreateWithoutMenuInput.schema';
import { TagUncheckedCreateWithoutMenuInputObjectSchema } from './TagUncheckedCreateWithoutMenuInput.schema';
import { TagWhereUniqueInputObjectSchema } from './TagWhereUniqueInput.schema';

const Schema: z.ZodType<Prisma.TagCreateOrConnectWithoutMenuInput> = z
  .object({
    where: z.lazy(() => TagWhereUniqueInputObjectSchema),
    create: z.union([
      z.lazy(() => TagCreateWithoutMenuInputObjectSchema),
      z.lazy(() => TagUncheckedCreateWithoutMenuInputObjectSchema),
    ]),
  })
  .strict();

export const TagCreateOrConnectWithoutMenuInputObjectSchema = Schema;
