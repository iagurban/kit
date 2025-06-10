import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { TaskCreateWithoutHistoryValuesInputObjectSchema } from './TaskCreateWithoutHistoryValuesInput.schema';
import { TaskUncheckedCreateWithoutHistoryValuesInputObjectSchema } from './TaskUncheckedCreateWithoutHistoryValuesInput.schema';
import { TaskUncheckedUpdateWithoutHistoryValuesInputObjectSchema } from './TaskUncheckedUpdateWithoutHistoryValuesInput.schema';
import { TaskUpdateWithoutHistoryValuesInputObjectSchema } from './TaskUpdateWithoutHistoryValuesInput.schema';

const Schema: z.ZodType<Prisma.TaskUpsertWithoutHistoryValuesInput> = z
  .object({
    update: z.union([
      z.lazy(() => TaskUpdateWithoutHistoryValuesInputObjectSchema),
      z.lazy(() => TaskUncheckedUpdateWithoutHistoryValuesInputObjectSchema),
    ]),
    create: z.union([
      z.lazy(() => TaskCreateWithoutHistoryValuesInputObjectSchema),
      z.lazy(() => TaskUncheckedCreateWithoutHistoryValuesInputObjectSchema),
    ]),
  })
  .strict();

export const TaskUpsertWithoutHistoryValuesInputObjectSchema = Schema;
