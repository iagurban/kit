import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { TaskHistoryValueCreateWithoutGroupInputObjectSchema } from './TaskHistoryValueCreateWithoutGroupInput.schema';
import { TaskHistoryValueUncheckedCreateWithoutGroupInputObjectSchema } from './TaskHistoryValueUncheckedCreateWithoutGroupInput.schema';
import { TaskHistoryValueUncheckedUpdateWithoutGroupInputObjectSchema } from './TaskHistoryValueUncheckedUpdateWithoutGroupInput.schema';
import { TaskHistoryValueUpdateWithoutGroupInputObjectSchema } from './TaskHistoryValueUpdateWithoutGroupInput.schema';
import { TaskHistoryValueWhereUniqueInputObjectSchema } from './TaskHistoryValueWhereUniqueInput.schema';

const Schema: z.ZodType<Prisma.TaskHistoryValueUpsertWithWhereUniqueWithoutGroupInput> = z
  .object({
    where: z.lazy(() => TaskHistoryValueWhereUniqueInputObjectSchema),
    update: z.union([
      z.lazy(() => TaskHistoryValueUpdateWithoutGroupInputObjectSchema),
      z.lazy(() => TaskHistoryValueUncheckedUpdateWithoutGroupInputObjectSchema),
    ]),
    create: z.union([
      z.lazy(() => TaskHistoryValueCreateWithoutGroupInputObjectSchema),
      z.lazy(() => TaskHistoryValueUncheckedCreateWithoutGroupInputObjectSchema),
    ]),
  })
  .strict();

export const TaskHistoryValueUpsertWithWhereUniqueWithoutGroupInputObjectSchema = Schema;
