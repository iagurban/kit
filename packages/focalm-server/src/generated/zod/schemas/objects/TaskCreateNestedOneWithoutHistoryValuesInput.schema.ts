import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { TaskCreateOrConnectWithoutHistoryValuesInputObjectSchema } from './TaskCreateOrConnectWithoutHistoryValuesInput.schema';
import { TaskCreateWithoutHistoryValuesInputObjectSchema } from './TaskCreateWithoutHistoryValuesInput.schema';
import { TaskUncheckedCreateWithoutHistoryValuesInputObjectSchema } from './TaskUncheckedCreateWithoutHistoryValuesInput.schema';
import { TaskWhereUniqueInputObjectSchema } from './TaskWhereUniqueInput.schema';

const Schema: z.ZodType<Prisma.TaskCreateNestedOneWithoutHistoryValuesInput> = z
  .object({
    create: z
      .union([
        z.lazy(() => TaskCreateWithoutHistoryValuesInputObjectSchema),
        z.lazy(() => TaskUncheckedCreateWithoutHistoryValuesInputObjectSchema),
      ])
      .optional(),
    connectOrCreate: z.lazy(() => TaskCreateOrConnectWithoutHistoryValuesInputObjectSchema).optional(),
    connect: z.lazy(() => TaskWhereUniqueInputObjectSchema).optional(),
  })
  .strict();

export const TaskCreateNestedOneWithoutHistoryValuesInputObjectSchema = Schema;
