import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { TaskHistoryGroupCreateOrConnectWithoutValuesInputObjectSchema } from './TaskHistoryGroupCreateOrConnectWithoutValuesInput.schema';
import { TaskHistoryGroupCreateWithoutValuesInputObjectSchema } from './TaskHistoryGroupCreateWithoutValuesInput.schema';
import { TaskHistoryGroupUncheckedCreateWithoutValuesInputObjectSchema } from './TaskHistoryGroupUncheckedCreateWithoutValuesInput.schema';
import { TaskHistoryGroupWhereUniqueInputObjectSchema } from './TaskHistoryGroupWhereUniqueInput.schema';

const Schema: z.ZodType<Prisma.TaskHistoryGroupCreateNestedOneWithoutValuesInput> = z
  .object({
    create: z
      .union([
        z.lazy(() => TaskHistoryGroupCreateWithoutValuesInputObjectSchema),
        z.lazy(() => TaskHistoryGroupUncheckedCreateWithoutValuesInputObjectSchema),
      ])
      .optional(),
    connectOrCreate: z.lazy(() => TaskHistoryGroupCreateOrConnectWithoutValuesInputObjectSchema).optional(),
    connect: z.lazy(() => TaskHistoryGroupWhereUniqueInputObjectSchema).optional(),
  })
  .strict();

export const TaskHistoryGroupCreateNestedOneWithoutValuesInputObjectSchema = Schema;
