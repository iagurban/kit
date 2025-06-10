import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { TaskHistoryValueCreateManyTaskInputEnvelopeObjectSchema } from './TaskHistoryValueCreateManyTaskInputEnvelope.schema';
import { TaskHistoryValueCreateOrConnectWithoutTaskInputObjectSchema } from './TaskHistoryValueCreateOrConnectWithoutTaskInput.schema';
import { TaskHistoryValueCreateWithoutTaskInputObjectSchema } from './TaskHistoryValueCreateWithoutTaskInput.schema';
import { TaskHistoryValueScalarWhereInputObjectSchema } from './TaskHistoryValueScalarWhereInput.schema';
import { TaskHistoryValueUncheckedCreateWithoutTaskInputObjectSchema } from './TaskHistoryValueUncheckedCreateWithoutTaskInput.schema';
import { TaskHistoryValueUpdateManyWithWhereWithoutTaskInputObjectSchema } from './TaskHistoryValueUpdateManyWithWhereWithoutTaskInput.schema';
import { TaskHistoryValueUpdateWithWhereUniqueWithoutTaskInputObjectSchema } from './TaskHistoryValueUpdateWithWhereUniqueWithoutTaskInput.schema';
import { TaskHistoryValueUpsertWithWhereUniqueWithoutTaskInputObjectSchema } from './TaskHistoryValueUpsertWithWhereUniqueWithoutTaskInput.schema';
import { TaskHistoryValueWhereUniqueInputObjectSchema } from './TaskHistoryValueWhereUniqueInput.schema';

const Schema: z.ZodType<Prisma.TaskHistoryValueUncheckedUpdateManyWithoutTaskNestedInput> = z
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
    upsert: z
      .union([
        z.lazy(() => TaskHistoryValueUpsertWithWhereUniqueWithoutTaskInputObjectSchema),
        z.lazy(() => TaskHistoryValueUpsertWithWhereUniqueWithoutTaskInputObjectSchema).array(),
      ])
      .optional(),
    createMany: z.lazy(() => TaskHistoryValueCreateManyTaskInputEnvelopeObjectSchema).optional(),
    set: z
      .union([
        z.lazy(() => TaskHistoryValueWhereUniqueInputObjectSchema),
        z.lazy(() => TaskHistoryValueWhereUniqueInputObjectSchema).array(),
      ])
      .optional(),
    disconnect: z
      .union([
        z.lazy(() => TaskHistoryValueWhereUniqueInputObjectSchema),
        z.lazy(() => TaskHistoryValueWhereUniqueInputObjectSchema).array(),
      ])
      .optional(),
    delete: z
      .union([
        z.lazy(() => TaskHistoryValueWhereUniqueInputObjectSchema),
        z.lazy(() => TaskHistoryValueWhereUniqueInputObjectSchema).array(),
      ])
      .optional(),
    connect: z
      .union([
        z.lazy(() => TaskHistoryValueWhereUniqueInputObjectSchema),
        z.lazy(() => TaskHistoryValueWhereUniqueInputObjectSchema).array(),
      ])
      .optional(),
    update: z
      .union([
        z.lazy(() => TaskHistoryValueUpdateWithWhereUniqueWithoutTaskInputObjectSchema),
        z.lazy(() => TaskHistoryValueUpdateWithWhereUniqueWithoutTaskInputObjectSchema).array(),
      ])
      .optional(),
    updateMany: z
      .union([
        z.lazy(() => TaskHistoryValueUpdateManyWithWhereWithoutTaskInputObjectSchema),
        z.lazy(() => TaskHistoryValueUpdateManyWithWhereWithoutTaskInputObjectSchema).array(),
      ])
      .optional(),
    deleteMany: z
      .union([
        z.lazy(() => TaskHistoryValueScalarWhereInputObjectSchema),
        z.lazy(() => TaskHistoryValueScalarWhereInputObjectSchema).array(),
      ])
      .optional(),
  })
  .strict();

export const TaskHistoryValueUncheckedUpdateManyWithoutTaskNestedInputObjectSchema = Schema;
