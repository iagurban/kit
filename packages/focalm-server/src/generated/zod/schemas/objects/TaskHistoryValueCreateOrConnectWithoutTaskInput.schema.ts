import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { TaskHistoryValueCreateWithoutTaskInputObjectSchema } from './TaskHistoryValueCreateWithoutTaskInput.schema';
import { TaskHistoryValueUncheckedCreateWithoutTaskInputObjectSchema } from './TaskHistoryValueUncheckedCreateWithoutTaskInput.schema';
import { TaskHistoryValueWhereUniqueInputObjectSchema } from './TaskHistoryValueWhereUniqueInput.schema';

const Schema: z.ZodType<Prisma.TaskHistoryValueCreateOrConnectWithoutTaskInput> = z
  .object({
    where: z.lazy(() => TaskHistoryValueWhereUniqueInputObjectSchema),
    create: z.union([
      z.lazy(() => TaskHistoryValueCreateWithoutTaskInputObjectSchema),
      z.lazy(() => TaskHistoryValueUncheckedCreateWithoutTaskInputObjectSchema),
    ]),
  })
  .strict();

export const TaskHistoryValueCreateOrConnectWithoutTaskInputObjectSchema = Schema;
