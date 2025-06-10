import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { TaskHistoryValueUncheckedUpdateWithoutTaskInputObjectSchema } from './TaskHistoryValueUncheckedUpdateWithoutTaskInput.schema';
import { TaskHistoryValueUpdateWithoutTaskInputObjectSchema } from './TaskHistoryValueUpdateWithoutTaskInput.schema';
import { TaskHistoryValueWhereUniqueInputObjectSchema } from './TaskHistoryValueWhereUniqueInput.schema';

const Schema: z.ZodType<Prisma.TaskHistoryValueUpdateWithWhereUniqueWithoutTaskInput> = z
  .object({
    where: z.lazy(() => TaskHistoryValueWhereUniqueInputObjectSchema),
    data: z.union([
      z.lazy(() => TaskHistoryValueUpdateWithoutTaskInputObjectSchema),
      z.lazy(() => TaskHistoryValueUncheckedUpdateWithoutTaskInputObjectSchema),
    ]),
  })
  .strict();

export const TaskHistoryValueUpdateWithWhereUniqueWithoutTaskInputObjectSchema = Schema;
