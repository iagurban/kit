import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { TaskCreateOrConnectWithoutHistoryGroupsInputObjectSchema } from './TaskCreateOrConnectWithoutHistoryGroupsInput.schema';
import { TaskCreateWithoutHistoryGroupsInputObjectSchema } from './TaskCreateWithoutHistoryGroupsInput.schema';
import { TaskUncheckedCreateWithoutHistoryGroupsInputObjectSchema } from './TaskUncheckedCreateWithoutHistoryGroupsInput.schema';
import { TaskUncheckedUpdateWithoutHistoryGroupsInputObjectSchema } from './TaskUncheckedUpdateWithoutHistoryGroupsInput.schema';
import { TaskUpdateWithoutHistoryGroupsInputObjectSchema } from './TaskUpdateWithoutHistoryGroupsInput.schema';
import { TaskUpsertWithoutHistoryGroupsInputObjectSchema } from './TaskUpsertWithoutHistoryGroupsInput.schema';
import { TaskWhereUniqueInputObjectSchema } from './TaskWhereUniqueInput.schema';

const Schema: z.ZodType<Prisma.TaskUpdateOneRequiredWithoutHistoryGroupsNestedInput> = z
  .object({
    create: z
      .union([
        z.lazy(() => TaskCreateWithoutHistoryGroupsInputObjectSchema),
        z.lazy(() => TaskUncheckedCreateWithoutHistoryGroupsInputObjectSchema),
      ])
      .optional(),
    connectOrCreate: z.lazy(() => TaskCreateOrConnectWithoutHistoryGroupsInputObjectSchema).optional(),
    upsert: z.lazy(() => TaskUpsertWithoutHistoryGroupsInputObjectSchema).optional(),
    connect: z.lazy(() => TaskWhereUniqueInputObjectSchema).optional(),
    update: z
      .union([
        z.lazy(() => TaskUpdateWithoutHistoryGroupsInputObjectSchema),
        z.lazy(() => TaskUncheckedUpdateWithoutHistoryGroupsInputObjectSchema),
      ])
      .optional(),
  })
  .strict();

export const TaskUpdateOneRequiredWithoutHistoryGroupsNestedInputObjectSchema = Schema;
