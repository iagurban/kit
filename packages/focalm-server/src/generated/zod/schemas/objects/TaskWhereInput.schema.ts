import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { TaskStateSchema } from '../enums/TaskState.schema';
import { BoolFilterObjectSchema } from './BoolFilter.schema';
import { DateTimeFilterObjectSchema } from './DateTimeFilter.schema';
import { DateTimeNullableFilterObjectSchema } from './DateTimeNullableFilter.schema';
import { EnumTaskStateFilterObjectSchema } from './EnumTaskStateFilter.schema';
import { FloatFilterObjectSchema } from './FloatFilter.schema';
import { StringFilterObjectSchema } from './StringFilter.schema';
import { TaskHistoryGroupListRelationFilterObjectSchema } from './TaskHistoryGroupListRelationFilter.schema';
import { TaskListRelationFilterObjectSchema } from './TaskListRelationFilter.schema';
import { TaskRelationFilterObjectSchema } from './TaskRelationFilter.schema';
import { UserRelationFilterObjectSchema } from './UserRelationFilter.schema';
import { UserWhereInputObjectSchema } from './UserWhereInput.schema';
import { UuidFilterObjectSchema } from './UuidFilter.schema';
import { UuidNullableFilterObjectSchema } from './UuidNullableFilter.schema';

const Schema: z.ZodType<Prisma.TaskWhereInput> = z
  .object({
    AND: z
      .union([z.lazy(() => TaskWhereInputObjectSchema), z.lazy(() => TaskWhereInputObjectSchema).array()])
      .optional(),
    OR: z
      .lazy(() => TaskWhereInputObjectSchema)
      .array()
      .optional(),
    NOT: z
      .union([z.lazy(() => TaskWhereInputObjectSchema), z.lazy(() => TaskWhereInputObjectSchema).array()])
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
    author: z
      .union([z.lazy(() => UserRelationFilterObjectSchema), z.lazy(() => UserWhereInputObjectSchema)])
      .optional(),
    responsible: z
      .union([z.lazy(() => UserRelationFilterObjectSchema), z.lazy(() => UserWhereInputObjectSchema)])
      .optional()
      .nullable(),
    parent: z
      .union([z.lazy(() => TaskRelationFilterObjectSchema), z.lazy(() => TaskWhereInputObjectSchema)])
      .optional()
      .nullable(),
    children: z.lazy(() => TaskListRelationFilterObjectSchema).optional(),
    historyGroups: z.lazy(() => TaskHistoryGroupListRelationFilterObjectSchema).optional(),
  })
  .strict();

export const TaskWhereInputObjectSchema = Schema;
