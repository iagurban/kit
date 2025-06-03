import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { TaskHistoryGroupCreateWithoutValuesInputObjectSchema } from './TaskHistoryGroupCreateWithoutValuesInput.schema';
import { TaskHistoryGroupUncheckedCreateWithoutValuesInputObjectSchema } from './TaskHistoryGroupUncheckedCreateWithoutValuesInput.schema';
import { TaskHistoryGroupUncheckedUpdateWithoutValuesInputObjectSchema } from './TaskHistoryGroupUncheckedUpdateWithoutValuesInput.schema';
import { TaskHistoryGroupUpdateWithoutValuesInputObjectSchema } from './TaskHistoryGroupUpdateWithoutValuesInput.schema';

const Schema: z.ZodType<Prisma.TaskHistoryGroupUpsertWithoutValuesInput> = z
  .object({
    update: z.union([
      z.lazy(() => TaskHistoryGroupUpdateWithoutValuesInputObjectSchema),
      z.lazy(() => TaskHistoryGroupUncheckedUpdateWithoutValuesInputObjectSchema),
    ]),
    create: z.union([
      z.lazy(() => TaskHistoryGroupCreateWithoutValuesInputObjectSchema),
      z.lazy(() => TaskHistoryGroupUncheckedCreateWithoutValuesInputObjectSchema),
    ]),
  })
  .strict();

export const TaskHistoryGroupUpsertWithoutValuesInputObjectSchema = Schema;
