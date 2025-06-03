import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { TaskHistoryGroupCreateManyTaskInputEnvelopeObjectSchema } from './TaskHistoryGroupCreateManyTaskInputEnvelope.schema';
import { TaskHistoryGroupCreateOrConnectWithoutTaskInputObjectSchema } from './TaskHistoryGroupCreateOrConnectWithoutTaskInput.schema';
import { TaskHistoryGroupCreateWithoutTaskInputObjectSchema } from './TaskHistoryGroupCreateWithoutTaskInput.schema';
import { TaskHistoryGroupUncheckedCreateWithoutTaskInputObjectSchema } from './TaskHistoryGroupUncheckedCreateWithoutTaskInput.schema';
import { TaskHistoryGroupWhereUniqueInputObjectSchema } from './TaskHistoryGroupWhereUniqueInput.schema';

const Schema: z.ZodType<Prisma.TaskHistoryGroupUncheckedCreateNestedManyWithoutTaskInput> = z
  .object({
    create: z
      .union([
        z.lazy(() => TaskHistoryGroupCreateWithoutTaskInputObjectSchema),
        z.lazy(() => TaskHistoryGroupCreateWithoutTaskInputObjectSchema).array(),
        z.lazy(() => TaskHistoryGroupUncheckedCreateWithoutTaskInputObjectSchema),
        z.lazy(() => TaskHistoryGroupUncheckedCreateWithoutTaskInputObjectSchema).array(),
      ])
      .optional(),
    connectOrCreate: z
      .union([
        z.lazy(() => TaskHistoryGroupCreateOrConnectWithoutTaskInputObjectSchema),
        z.lazy(() => TaskHistoryGroupCreateOrConnectWithoutTaskInputObjectSchema).array(),
      ])
      .optional(),
    createMany: z.lazy(() => TaskHistoryGroupCreateManyTaskInputEnvelopeObjectSchema).optional(),
    connect: z
      .union([
        z.lazy(() => TaskHistoryGroupWhereUniqueInputObjectSchema),
        z.lazy(() => TaskHistoryGroupWhereUniqueInputObjectSchema).array(),
      ])
      .optional(),
  })
  .strict();

export const TaskHistoryGroupUncheckedCreateNestedManyWithoutTaskInputObjectSchema = Schema;
