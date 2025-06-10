import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { TaskCreateOrConnectWithoutHistoryValuesInputObjectSchema } from './TaskCreateOrConnectWithoutHistoryValuesInput.schema';
import { TaskCreateWithoutHistoryValuesInputObjectSchema } from './TaskCreateWithoutHistoryValuesInput.schema';
import { TaskUncheckedCreateWithoutHistoryValuesInputObjectSchema } from './TaskUncheckedCreateWithoutHistoryValuesInput.schema';
import { TaskUncheckedUpdateWithoutHistoryValuesInputObjectSchema } from './TaskUncheckedUpdateWithoutHistoryValuesInput.schema';
import { TaskUpdateWithoutHistoryValuesInputObjectSchema } from './TaskUpdateWithoutHistoryValuesInput.schema';
import { TaskUpsertWithoutHistoryValuesInputObjectSchema } from './TaskUpsertWithoutHistoryValuesInput.schema';
import { TaskWhereUniqueInputObjectSchema } from './TaskWhereUniqueInput.schema';

const Schema: z.ZodType<Prisma.TaskUpdateOneRequiredWithoutHistoryValuesNestedInput> = z
  .object({
    create: z
      .union([
        z.lazy(() => TaskCreateWithoutHistoryValuesInputObjectSchema),
        z.lazy(() => TaskUncheckedCreateWithoutHistoryValuesInputObjectSchema),
      ])
      .optional(),
    connectOrCreate: z.lazy(() => TaskCreateOrConnectWithoutHistoryValuesInputObjectSchema).optional(),
    upsert: z.lazy(() => TaskUpsertWithoutHistoryValuesInputObjectSchema).optional(),
    connect: z.lazy(() => TaskWhereUniqueInputObjectSchema).optional(),
    update: z
      .union([
        z.lazy(() => TaskUpdateWithoutHistoryValuesInputObjectSchema),
        z.lazy(() => TaskUncheckedUpdateWithoutHistoryValuesInputObjectSchema),
      ])
      .optional(),
  })
  .strict();

export const TaskUpdateOneRequiredWithoutHistoryValuesNestedInputObjectSchema = Schema;
