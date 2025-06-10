import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { StringFilterObjectSchema } from './StringFilter.schema';
import { UuidFilterObjectSchema } from './UuidFilter.schema';

const Schema: z.ZodType<Prisma.UserInTaskTagScalarWhereInput> = z
  .object({
    AND: z
      .union([
        z.lazy(() => UserInTaskTagScalarWhereInputObjectSchema),
        z.lazy(() => UserInTaskTagScalarWhereInputObjectSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => UserInTaskTagScalarWhereInputObjectSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => UserInTaskTagScalarWhereInputObjectSchema),
        z.lazy(() => UserInTaskTagScalarWhereInputObjectSchema).array(),
      ])
      .optional(),
    userInTaskId: z.union([z.lazy(() => UuidFilterObjectSchema), z.string()]).optional(),
    tag: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  })
  .strict();

export const UserInTaskTagScalarWhereInputObjectSchema = Schema;
