import { z } from 'zod';
import { TagWhereUniqueInputObjectSchema } from './TagWhereUniqueInput.schema';
import { TagCreateWithoutMenuInputObjectSchema } from './TagCreateWithoutMenuInput.schema';
import { TagUncheckedCreateWithoutMenuInputObjectSchema } from './TagUncheckedCreateWithoutMenuInput.schema';

import type { Prisma } from '../../../old-client';

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
