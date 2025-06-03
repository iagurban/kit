import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { TaskHistoryGroupCreateWithoutValuesInputObjectSchema } from './TaskHistoryGroupCreateWithoutValuesInput.schema';
import { TaskHistoryGroupUncheckedCreateWithoutValuesInputObjectSchema } from './TaskHistoryGroupUncheckedCreateWithoutValuesInput.schema';
import { TaskHistoryGroupWhereUniqueInputObjectSchema } from './TaskHistoryGroupWhereUniqueInput.schema';

const Schema: z.ZodType<Prisma.TaskHistoryGroupCreateOrConnectWithoutValuesInput> = z
  .object({
    where: z.lazy(() => TaskHistoryGroupWhereUniqueInputObjectSchema),
    create: z.union([
      z.lazy(() => TaskHistoryGroupCreateWithoutValuesInputObjectSchema),
      z.lazy(() => TaskHistoryGroupUncheckedCreateWithoutValuesInputObjectSchema),
    ]),
  })
  .strict();

export const TaskHistoryGroupCreateOrConnectWithoutValuesInputObjectSchema = Schema;
