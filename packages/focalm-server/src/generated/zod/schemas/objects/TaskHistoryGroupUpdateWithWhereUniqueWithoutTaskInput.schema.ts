import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { TaskHistoryGroupUncheckedUpdateWithoutTaskInputObjectSchema } from './TaskHistoryGroupUncheckedUpdateWithoutTaskInput.schema';
import { TaskHistoryGroupUpdateWithoutTaskInputObjectSchema } from './TaskHistoryGroupUpdateWithoutTaskInput.schema';
import { TaskHistoryGroupWhereUniqueInputObjectSchema } from './TaskHistoryGroupWhereUniqueInput.schema';

const Schema: z.ZodType<Prisma.TaskHistoryGroupUpdateWithWhereUniqueWithoutTaskInput> = z
  .object({
    where: z.lazy(() => TaskHistoryGroupWhereUniqueInputObjectSchema),
    data: z.union([
      z.lazy(() => TaskHistoryGroupUpdateWithoutTaskInputObjectSchema),
      z.lazy(() => TaskHistoryGroupUncheckedUpdateWithoutTaskInputObjectSchema),
    ]),
  })
  .strict();

export const TaskHistoryGroupUpdateWithWhereUniqueWithoutTaskInputObjectSchema = Schema;
