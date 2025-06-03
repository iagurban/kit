import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { TaskHistoryGroupCreateWithoutTaskInputObjectSchema } from './TaskHistoryGroupCreateWithoutTaskInput.schema';
import { TaskHistoryGroupUncheckedCreateWithoutTaskInputObjectSchema } from './TaskHistoryGroupUncheckedCreateWithoutTaskInput.schema';
import { TaskHistoryGroupWhereUniqueInputObjectSchema } from './TaskHistoryGroupWhereUniqueInput.schema';

const Schema: z.ZodType<Prisma.TaskHistoryGroupCreateOrConnectWithoutTaskInput> = z
  .object({
    where: z.lazy(() => TaskHistoryGroupWhereUniqueInputObjectSchema),
    create: z.union([
      z.lazy(() => TaskHistoryGroupCreateWithoutTaskInputObjectSchema),
      z.lazy(() => TaskHistoryGroupUncheckedCreateWithoutTaskInputObjectSchema),
    ]),
  })
  .strict();

export const TaskHistoryGroupCreateOrConnectWithoutTaskInputObjectSchema = Schema;
