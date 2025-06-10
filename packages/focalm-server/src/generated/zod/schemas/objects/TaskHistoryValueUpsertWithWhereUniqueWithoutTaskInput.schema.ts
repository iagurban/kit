import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { TaskHistoryValueCreateWithoutTaskInputObjectSchema } from './TaskHistoryValueCreateWithoutTaskInput.schema';
import { TaskHistoryValueUncheckedCreateWithoutTaskInputObjectSchema } from './TaskHistoryValueUncheckedCreateWithoutTaskInput.schema';
import { TaskHistoryValueUncheckedUpdateWithoutTaskInputObjectSchema } from './TaskHistoryValueUncheckedUpdateWithoutTaskInput.schema';
import { TaskHistoryValueUpdateWithoutTaskInputObjectSchema } from './TaskHistoryValueUpdateWithoutTaskInput.schema';
import { TaskHistoryValueWhereUniqueInputObjectSchema } from './TaskHistoryValueWhereUniqueInput.schema';

const Schema: z.ZodType<Prisma.TaskHistoryValueUpsertWithWhereUniqueWithoutTaskInput> = z
  .object({
    where: z.lazy(() => TaskHistoryValueWhereUniqueInputObjectSchema),
    update: z.union([
      z.lazy(() => TaskHistoryValueUpdateWithoutTaskInputObjectSchema),
      z.lazy(() => TaskHistoryValueUncheckedUpdateWithoutTaskInputObjectSchema),
    ]),
    create: z.union([
      z.lazy(() => TaskHistoryValueCreateWithoutTaskInputObjectSchema),
      z.lazy(() => TaskHistoryValueUncheckedCreateWithoutTaskInputObjectSchema),
    ]),
  })
  .strict();

export const TaskHistoryValueUpsertWithWhereUniqueWithoutTaskInputObjectSchema = Schema;
