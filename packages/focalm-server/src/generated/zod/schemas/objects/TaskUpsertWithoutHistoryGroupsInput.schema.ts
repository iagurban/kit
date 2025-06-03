import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { TaskCreateWithoutHistoryGroupsInputObjectSchema } from './TaskCreateWithoutHistoryGroupsInput.schema';
import { TaskUncheckedCreateWithoutHistoryGroupsInputObjectSchema } from './TaskUncheckedCreateWithoutHistoryGroupsInput.schema';
import { TaskUncheckedUpdateWithoutHistoryGroupsInputObjectSchema } from './TaskUncheckedUpdateWithoutHistoryGroupsInput.schema';
import { TaskUpdateWithoutHistoryGroupsInputObjectSchema } from './TaskUpdateWithoutHistoryGroupsInput.schema';

const Schema: z.ZodType<Prisma.TaskUpsertWithoutHistoryGroupsInput> = z
  .object({
    update: z.union([
      z.lazy(() => TaskUpdateWithoutHistoryGroupsInputObjectSchema),
      z.lazy(() => TaskUncheckedUpdateWithoutHistoryGroupsInputObjectSchema),
    ]),
    create: z.union([
      z.lazy(() => TaskCreateWithoutHistoryGroupsInputObjectSchema),
      z.lazy(() => TaskUncheckedCreateWithoutHistoryGroupsInputObjectSchema),
    ]),
  })
  .strict();

export const TaskUpsertWithoutHistoryGroupsInputObjectSchema = Schema;
