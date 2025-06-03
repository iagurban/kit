import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { TaskHistoryValueUncheckedUpdateWithoutGroupInputObjectSchema } from './TaskHistoryValueUncheckedUpdateWithoutGroupInput.schema';
import { TaskHistoryValueUpdateWithoutGroupInputObjectSchema } from './TaskHistoryValueUpdateWithoutGroupInput.schema';
import { TaskHistoryValueWhereUniqueInputObjectSchema } from './TaskHistoryValueWhereUniqueInput.schema';

const Schema: z.ZodType<Prisma.TaskHistoryValueUpdateWithWhereUniqueWithoutGroupInput> = z
  .object({
    where: z.lazy(() => TaskHistoryValueWhereUniqueInputObjectSchema),
    data: z.union([
      z.lazy(() => TaskHistoryValueUpdateWithoutGroupInputObjectSchema),
      z.lazy(() => TaskHistoryValueUncheckedUpdateWithoutGroupInputObjectSchema),
    ]),
  })
  .strict();

export const TaskHistoryValueUpdateWithWhereUniqueWithoutGroupInputObjectSchema = Schema;
