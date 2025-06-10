import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { TaskCreateWithoutHistoryValuesInputObjectSchema } from './TaskCreateWithoutHistoryValuesInput.schema';
import { TaskUncheckedCreateWithoutHistoryValuesInputObjectSchema } from './TaskUncheckedCreateWithoutHistoryValuesInput.schema';
import { TaskWhereUniqueInputObjectSchema } from './TaskWhereUniqueInput.schema';

const Schema: z.ZodType<Prisma.TaskCreateOrConnectWithoutHistoryValuesInput> = z
  .object({
    where: z.lazy(() => TaskWhereUniqueInputObjectSchema),
    create: z.union([
      z.lazy(() => TaskCreateWithoutHistoryValuesInputObjectSchema),
      z.lazy(() => TaskUncheckedCreateWithoutHistoryValuesInputObjectSchema),
    ]),
  })
  .strict();

export const TaskCreateOrConnectWithoutHistoryValuesInputObjectSchema = Schema;
