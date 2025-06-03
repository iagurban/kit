import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { TaskHistoryGroupCreateManyTaskInputEnvelopeObjectSchema } from './TaskHistoryGroupCreateManyTaskInputEnvelope.schema';
import { TaskHistoryGroupCreateOrConnectWithoutTaskInputObjectSchema } from './TaskHistoryGroupCreateOrConnectWithoutTaskInput.schema';
import { TaskHistoryGroupCreateWithoutTaskInputObjectSchema } from './TaskHistoryGroupCreateWithoutTaskInput.schema';
import { TaskHistoryGroupScalarWhereInputObjectSchema } from './TaskHistoryGroupScalarWhereInput.schema';
import { TaskHistoryGroupUncheckedCreateWithoutTaskInputObjectSchema } from './TaskHistoryGroupUncheckedCreateWithoutTaskInput.schema';
import { TaskHistoryGroupUpdateManyWithWhereWithoutTaskInputObjectSchema } from './TaskHistoryGroupUpdateManyWithWhereWithoutTaskInput.schema';
import { TaskHistoryGroupUpdateWithWhereUniqueWithoutTaskInputObjectSchema } from './TaskHistoryGroupUpdateWithWhereUniqueWithoutTaskInput.schema';
import { TaskHistoryGroupUpsertWithWhereUniqueWithoutTaskInputObjectSchema } from './TaskHistoryGroupUpsertWithWhereUniqueWithoutTaskInput.schema';
import { TaskHistoryGroupWhereUniqueInputObjectSchema } from './TaskHistoryGroupWhereUniqueInput.schema';

const Schema: z.ZodType<Prisma.TaskHistoryGroupUpdateManyWithoutTaskNestedInput> = z
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
    upsert: z
      .union([
        z.lazy(() => TaskHistoryGroupUpsertWithWhereUniqueWithoutTaskInputObjectSchema),
        z.lazy(() => TaskHistoryGroupUpsertWithWhereUniqueWithoutTaskInputObjectSchema).array(),
      ])
      .optional(),
    createMany: z.lazy(() => TaskHistoryGroupCreateManyTaskInputEnvelopeObjectSchema).optional(),
    set: z
      .union([
        z.lazy(() => TaskHistoryGroupWhereUniqueInputObjectSchema),
        z.lazy(() => TaskHistoryGroupWhereUniqueInputObjectSchema).array(),
      ])
      .optional(),
    disconnect: z
      .union([
        z.lazy(() => TaskHistoryGroupWhereUniqueInputObjectSchema),
        z.lazy(() => TaskHistoryGroupWhereUniqueInputObjectSchema).array(),
      ])
      .optional(),
    delete: z
      .union([
        z.lazy(() => TaskHistoryGroupWhereUniqueInputObjectSchema),
        z.lazy(() => TaskHistoryGroupWhereUniqueInputObjectSchema).array(),
      ])
      .optional(),
    connect: z
      .union([
        z.lazy(() => TaskHistoryGroupWhereUniqueInputObjectSchema),
        z.lazy(() => TaskHistoryGroupWhereUniqueInputObjectSchema).array(),
      ])
      .optional(),
    update: z
      .union([
        z.lazy(() => TaskHistoryGroupUpdateWithWhereUniqueWithoutTaskInputObjectSchema),
        z.lazy(() => TaskHistoryGroupUpdateWithWhereUniqueWithoutTaskInputObjectSchema).array(),
      ])
      .optional(),
    updateMany: z
      .union([
        z.lazy(() => TaskHistoryGroupUpdateManyWithWhereWithoutTaskInputObjectSchema),
        z.lazy(() => TaskHistoryGroupUpdateManyWithWhereWithoutTaskInputObjectSchema).array(),
      ])
      .optional(),
    deleteMany: z
      .union([
        z.lazy(() => TaskHistoryGroupScalarWhereInputObjectSchema),
        z.lazy(() => TaskHistoryGroupScalarWhereInputObjectSchema).array(),
      ])
      .optional(),
  })
  .strict();

export const TaskHistoryGroupUpdateManyWithoutTaskNestedInputObjectSchema = Schema;
