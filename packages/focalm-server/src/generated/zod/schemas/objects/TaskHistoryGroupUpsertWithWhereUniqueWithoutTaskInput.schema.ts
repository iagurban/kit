import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { TaskHistoryGroupCreateWithoutTaskInputObjectSchema } from './TaskHistoryGroupCreateWithoutTaskInput.schema';
import { TaskHistoryGroupUncheckedCreateWithoutTaskInputObjectSchema } from './TaskHistoryGroupUncheckedCreateWithoutTaskInput.schema';
import { TaskHistoryGroupUncheckedUpdateWithoutTaskInputObjectSchema } from './TaskHistoryGroupUncheckedUpdateWithoutTaskInput.schema';
import { TaskHistoryGroupUpdateWithoutTaskInputObjectSchema } from './TaskHistoryGroupUpdateWithoutTaskInput.schema';
import { TaskHistoryGroupWhereUniqueInputObjectSchema } from './TaskHistoryGroupWhereUniqueInput.schema';

const Schema: z.ZodType<Prisma.TaskHistoryGroupUpsertWithWhereUniqueWithoutTaskInput> = z
  .object({
    where: z.lazy(() => TaskHistoryGroupWhereUniqueInputObjectSchema),
    update: z.union([
      z.lazy(() => TaskHistoryGroupUpdateWithoutTaskInputObjectSchema),
      z.lazy(() => TaskHistoryGroupUncheckedUpdateWithoutTaskInputObjectSchema),
    ]),
    create: z.union([
      z.lazy(() => TaskHistoryGroupCreateWithoutTaskInputObjectSchema),
      z.lazy(() => TaskHistoryGroupUncheckedCreateWithoutTaskInputObjectSchema),
    ]),
  })
  .strict();

export const TaskHistoryGroupUpsertWithWhereUniqueWithoutTaskInputObjectSchema = Schema;
