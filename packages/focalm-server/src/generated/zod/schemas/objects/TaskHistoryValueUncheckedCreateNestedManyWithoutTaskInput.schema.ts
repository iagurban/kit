import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { TaskHistoryValueCreateManyTaskInputEnvelopeObjectSchema } from './TaskHistoryValueCreateManyTaskInputEnvelope.schema';
import { TaskHistoryValueCreateOrConnectWithoutTaskInputObjectSchema } from './TaskHistoryValueCreateOrConnectWithoutTaskInput.schema';
import { TaskHistoryValueCreateWithoutTaskInputObjectSchema } from './TaskHistoryValueCreateWithoutTaskInput.schema';
import { TaskHistoryValueUncheckedCreateWithoutTaskInputObjectSchema } from './TaskHistoryValueUncheckedCreateWithoutTaskInput.schema';
import { TaskHistoryValueWhereUniqueInputObjectSchema } from './TaskHistoryValueWhereUniqueInput.schema';

const Schema: z.ZodType<Prisma.TaskHistoryValueUncheckedCreateNestedManyWithoutTaskInput> = z
  .object({
    create: z
      .union([
        z.lazy(() => TaskHistoryValueCreateWithoutTaskInputObjectSchema),
        z.lazy(() => TaskHistoryValueCreateWithoutTaskInputObjectSchema).array(),
        z.lazy(() => TaskHistoryValueUncheckedCreateWithoutTaskInputObjectSchema),
        z.lazy(() => TaskHistoryValueUncheckedCreateWithoutTaskInputObjectSchema).array(),
      ])
      .optional(),
    connectOrCreate: z
      .union([
        z.lazy(() => TaskHistoryValueCreateOrConnectWithoutTaskInputObjectSchema),
        z.lazy(() => TaskHistoryValueCreateOrConnectWithoutTaskInputObjectSchema).array(),
      ])
      .optional(),
    createMany: z.lazy(() => TaskHistoryValueCreateManyTaskInputEnvelopeObjectSchema).optional(),
    connect: z
      .union([
        z.lazy(() => TaskHistoryValueWhereUniqueInputObjectSchema),
        z.lazy(() => TaskHistoryValueWhereUniqueInputObjectSchema).array(),
      ])
      .optional(),
  })
  .strict();

export const TaskHistoryValueUncheckedCreateNestedManyWithoutTaskInputObjectSchema = Schema;
