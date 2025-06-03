import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { TaskHistoryGroupCreateOrConnectWithoutValuesInputObjectSchema } from './TaskHistoryGroupCreateOrConnectWithoutValuesInput.schema';
import { TaskHistoryGroupCreateWithoutValuesInputObjectSchema } from './TaskHistoryGroupCreateWithoutValuesInput.schema';
import { TaskHistoryGroupUncheckedCreateWithoutValuesInputObjectSchema } from './TaskHistoryGroupUncheckedCreateWithoutValuesInput.schema';
import { TaskHistoryGroupUncheckedUpdateWithoutValuesInputObjectSchema } from './TaskHistoryGroupUncheckedUpdateWithoutValuesInput.schema';
import { TaskHistoryGroupUpdateWithoutValuesInputObjectSchema } from './TaskHistoryGroupUpdateWithoutValuesInput.schema';
import { TaskHistoryGroupUpsertWithoutValuesInputObjectSchema } from './TaskHistoryGroupUpsertWithoutValuesInput.schema';
import { TaskHistoryGroupWhereUniqueInputObjectSchema } from './TaskHistoryGroupWhereUniqueInput.schema';

const Schema: z.ZodType<Prisma.TaskHistoryGroupUpdateOneRequiredWithoutValuesNestedInput> = z
  .object({
    create: z
      .union([
        z.lazy(() => TaskHistoryGroupCreateWithoutValuesInputObjectSchema),
        z.lazy(() => TaskHistoryGroupUncheckedCreateWithoutValuesInputObjectSchema),
      ])
      .optional(),
    connectOrCreate: z.lazy(() => TaskHistoryGroupCreateOrConnectWithoutValuesInputObjectSchema).optional(),
    upsert: z.lazy(() => TaskHistoryGroupUpsertWithoutValuesInputObjectSchema).optional(),
    connect: z.lazy(() => TaskHistoryGroupWhereUniqueInputObjectSchema).optional(),
    update: z
      .union([
        z.lazy(() => TaskHistoryGroupUpdateWithoutValuesInputObjectSchema),
        z.lazy(() => TaskHistoryGroupUncheckedUpdateWithoutValuesInputObjectSchema),
      ])
      .optional(),
  })
  .strict();

export const TaskHistoryGroupUpdateOneRequiredWithoutValuesNestedInputObjectSchema = Schema;
