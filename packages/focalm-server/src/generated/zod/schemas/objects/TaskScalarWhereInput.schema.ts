import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { TaskStateSchema } from '../enums/TaskState.schema';
import { BoolFilterObjectSchema } from './BoolFilter.schema';
import { DateTimeFilterObjectSchema } from './DateTimeFilter.schema';
import { DateTimeNullableFilterObjectSchema } from './DateTimeNullableFilter.schema';
import { EnumTaskStateFilterObjectSchema } from './EnumTaskStateFilter.schema';
import { FloatFilterObjectSchema } from './FloatFilter.schema';
import { StringFilterObjectSchema } from './StringFilter.schema';
import { UuidFilterObjectSchema } from './UuidFilter.schema';
import { UuidNullableFilterObjectSchema } from './UuidNullableFilter.schema';

const Schema: z.ZodType<Prisma.TaskScalarWhereInput> = z
  .object({
    AND: z
      .union([
        z.lazy(() => TaskScalarWhereInputObjectSchema),
        z.lazy(() => TaskScalarWhereInputObjectSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => TaskScalarWhereInputObjectSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => TaskScalarWhereInputObjectSchema),
        z.lazy(() => TaskScalarWhereInputObjectSchema).array(),
      ])
      .optional(),
    id: z.union([z.lazy(() => UuidFilterObjectSchema), z.string()]).optional(),
    title: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
    state: z.union([z.lazy(() => EnumTaskStateFilterObjectSchema), z.lazy(() => TaskStateSchema)]).optional(),
    archived: z.union([z.lazy(() => BoolFilterObjectSchema), z.boolean()]).optional(),
    impact: z.union([z.lazy(() => FloatFilterObjectSchema), z.number()]).optional(),
    ease: z.union([z.lazy(() => FloatFilterObjectSchema), z.number()]).optional(),
    startAfter: z
      .union([z.lazy(() => DateTimeNullableFilterObjectSchema), z.coerce.date()])
      .optional()
      .nullable(),
    plannedStart: z
      .union([z.lazy(() => DateTimeNullableFilterObjectSchema), z.coerce.date()])
      .optional()
      .nullable(),
    dueTo: z
      .union([z.lazy(() => DateTimeNullableFilterObjectSchema), z.coerce.date()])
      .optional()
      .nullable(),
    createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
    updatedAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
    authorId: z.union([z.lazy(() => UuidFilterObjectSchema), z.string()]).optional(),
    responsibleId: z
      .union([z.lazy(() => UuidNullableFilterObjectSchema), z.string()])
      .optional()
      .nullable(),
    parentId: z
      .union([z.lazy(() => UuidNullableFilterObjectSchema), z.string()])
      .optional()
      .nullable(),
    orderKey: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  })
  .strict();

export const TaskScalarWhereInputObjectSchema = Schema;
