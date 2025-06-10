import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { TaskRelationFilterObjectSchema } from './TaskRelationFilter.schema';
import { TaskWhereInputObjectSchema } from './TaskWhereInput.schema';
import { UserInTaskTagListRelationFilterObjectSchema } from './UserInTaskTagListRelationFilter.schema';
import { UserRelationFilterObjectSchema } from './UserRelationFilter.schema';
import { UserWhereInputObjectSchema } from './UserWhereInput.schema';
import { UuidFilterObjectSchema } from './UuidFilter.schema';

const Schema: z.ZodType<Prisma.UserInTaskWhereInput> = z
  .object({
    AND: z
      .union([
        z.lazy(() => UserInTaskWhereInputObjectSchema),
        z.lazy(() => UserInTaskWhereInputObjectSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => UserInTaskWhereInputObjectSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => UserInTaskWhereInputObjectSchema),
        z.lazy(() => UserInTaskWhereInputObjectSchema).array(),
      ])
      .optional(),
    id: z.union([z.lazy(() => UuidFilterObjectSchema), z.string()]).optional(),
    userId: z.union([z.lazy(() => UuidFilterObjectSchema), z.string()]).optional(),
    taskId: z.union([z.lazy(() => UuidFilterObjectSchema), z.string()]).optional(),
    user: z
      .union([z.lazy(() => UserRelationFilterObjectSchema), z.lazy(() => UserWhereInputObjectSchema)])
      .optional(),
    task: z
      .union([z.lazy(() => TaskRelationFilterObjectSchema), z.lazy(() => TaskWhereInputObjectSchema)])
      .optional(),
    tags: z.lazy(() => UserInTaskTagListRelationFilterObjectSchema).optional(),
  })
  .strict();

export const UserInTaskWhereInputObjectSchema = Schema;
