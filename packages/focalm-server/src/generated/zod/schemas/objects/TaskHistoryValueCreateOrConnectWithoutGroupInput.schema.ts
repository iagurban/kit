import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { TaskHistoryValueCreateWithoutGroupInputObjectSchema } from './TaskHistoryValueCreateWithoutGroupInput.schema';
import { TaskHistoryValueUncheckedCreateWithoutGroupInputObjectSchema } from './TaskHistoryValueUncheckedCreateWithoutGroupInput.schema';
import { TaskHistoryValueWhereUniqueInputObjectSchema } from './TaskHistoryValueWhereUniqueInput.schema';

const Schema: z.ZodType<Prisma.TaskHistoryValueCreateOrConnectWithoutGroupInput> = z
  .object({
    where: z.lazy(() => TaskHistoryValueWhereUniqueInputObjectSchema),
    create: z.union([
      z.lazy(() => TaskHistoryValueCreateWithoutGroupInputObjectSchema),
      z.lazy(() => TaskHistoryValueUncheckedCreateWithoutGroupInputObjectSchema),
    ]),
  })
  .strict();

export const TaskHistoryValueCreateOrConnectWithoutGroupInputObjectSchema = Schema;
