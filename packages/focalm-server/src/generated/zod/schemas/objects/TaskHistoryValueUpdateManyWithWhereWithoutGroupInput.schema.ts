import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { TaskHistoryValueScalarWhereInputObjectSchema } from './TaskHistoryValueScalarWhereInput.schema';
import { TaskHistoryValueUncheckedUpdateManyWithoutValuesInputObjectSchema } from './TaskHistoryValueUncheckedUpdateManyWithoutValuesInput.schema';
import { TaskHistoryValueUpdateManyMutationInputObjectSchema } from './TaskHistoryValueUpdateManyMutationInput.schema';

const Schema: z.ZodType<Prisma.TaskHistoryValueUpdateManyWithWhereWithoutGroupInput> = z
  .object({
    where: z.lazy(() => TaskHistoryValueScalarWhereInputObjectSchema),
    data: z.union([
      z.lazy(() => TaskHistoryValueUpdateManyMutationInputObjectSchema),
      z.lazy(() => TaskHistoryValueUncheckedUpdateManyWithoutValuesInputObjectSchema),
    ]),
  })
  .strict();

export const TaskHistoryValueUpdateManyWithWhereWithoutGroupInputObjectSchema = Schema;
