import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { TaskHistoryGroupCreateManyAuthorInputEnvelopeObjectSchema } from './TaskHistoryGroupCreateManyAuthorInputEnvelope.schema';
import { TaskHistoryGroupCreateOrConnectWithoutAuthorInputObjectSchema } from './TaskHistoryGroupCreateOrConnectWithoutAuthorInput.schema';
import { TaskHistoryGroupCreateWithoutAuthorInputObjectSchema } from './TaskHistoryGroupCreateWithoutAuthorInput.schema';
import { TaskHistoryGroupScalarWhereInputObjectSchema } from './TaskHistoryGroupScalarWhereInput.schema';
import { TaskHistoryGroupUncheckedCreateWithoutAuthorInputObjectSchema } from './TaskHistoryGroupUncheckedCreateWithoutAuthorInput.schema';
import { TaskHistoryGroupUpdateManyWithWhereWithoutAuthorInputObjectSchema } from './TaskHistoryGroupUpdateManyWithWhereWithoutAuthorInput.schema';
import { TaskHistoryGroupUpdateWithWhereUniqueWithoutAuthorInputObjectSchema } from './TaskHistoryGroupUpdateWithWhereUniqueWithoutAuthorInput.schema';
import { TaskHistoryGroupUpsertWithWhereUniqueWithoutAuthorInputObjectSchema } from './TaskHistoryGroupUpsertWithWhereUniqueWithoutAuthorInput.schema';
import { TaskHistoryGroupWhereUniqueInputObjectSchema } from './TaskHistoryGroupWhereUniqueInput.schema';

const Schema: z.ZodType<Prisma.TaskHistoryGroupUncheckedUpdateManyWithoutAuthorNestedInput> = z
  .object({
    create: z
      .union([
        z.lazy(() => TaskHistoryGroupCreateWithoutAuthorInputObjectSchema),
        z.lazy(() => TaskHistoryGroupCreateWithoutAuthorInputObjectSchema).array(),
        z.lazy(() => TaskHistoryGroupUncheckedCreateWithoutAuthorInputObjectSchema),
        z.lazy(() => TaskHistoryGroupUncheckedCreateWithoutAuthorInputObjectSchema).array(),
      ])
      .optional(),
    connectOrCreate: z
      .union([
        z.lazy(() => TaskHistoryGroupCreateOrConnectWithoutAuthorInputObjectSchema),
        z.lazy(() => TaskHistoryGroupCreateOrConnectWithoutAuthorInputObjectSchema).array(),
      ])
      .optional(),
    upsert: z
      .union([
        z.lazy(() => TaskHistoryGroupUpsertWithWhereUniqueWithoutAuthorInputObjectSchema),
        z.lazy(() => TaskHistoryGroupUpsertWithWhereUniqueWithoutAuthorInputObjectSchema).array(),
      ])
      .optional(),
    createMany: z.lazy(() => TaskHistoryGroupCreateManyAuthorInputEnvelopeObjectSchema).optional(),
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
        z.lazy(() => TaskHistoryGroupUpdateWithWhereUniqueWithoutAuthorInputObjectSchema),
        z.lazy(() => TaskHistoryGroupUpdateWithWhereUniqueWithoutAuthorInputObjectSchema).array(),
      ])
      .optional(),
    updateMany: z
      .union([
        z.lazy(() => TaskHistoryGroupUpdateManyWithWhereWithoutAuthorInputObjectSchema),
        z.lazy(() => TaskHistoryGroupUpdateManyWithWhereWithoutAuthorInputObjectSchema).array(),
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

export const TaskHistoryGroupUncheckedUpdateManyWithoutAuthorNestedInputObjectSchema = Schema;
