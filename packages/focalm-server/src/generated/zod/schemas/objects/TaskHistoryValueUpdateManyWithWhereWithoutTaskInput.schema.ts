import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { TaskHistoryValueScalarWhereInputObjectSchema } from './TaskHistoryValueScalarWhereInput.schema';
import { TaskHistoryValueUncheckedUpdateManyWithoutHistoryValuesInputObjectSchema } from './TaskHistoryValueUncheckedUpdateManyWithoutHistoryValuesInput.schema';
import { TaskHistoryValueUpdateManyMutationInputObjectSchema } from './TaskHistoryValueUpdateManyMutationInput.schema';

const Schema: z.ZodType<Prisma.TaskHistoryValueUpdateManyWithWhereWithoutTaskInput> = z
  .object({
    where: z.lazy(() => TaskHistoryValueScalarWhereInputObjectSchema),
    data: z.union([
      z.lazy(() => TaskHistoryValueUpdateManyMutationInputObjectSchema),
      z.lazy(() => TaskHistoryValueUncheckedUpdateManyWithoutHistoryValuesInputObjectSchema),
    ]),
  })
  .strict();

export const TaskHistoryValueUpdateManyWithWhereWithoutTaskInputObjectSchema = Schema;
