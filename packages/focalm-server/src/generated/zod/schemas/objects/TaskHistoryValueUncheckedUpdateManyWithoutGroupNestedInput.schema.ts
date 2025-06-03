import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { TaskHistoryValueCreateManyGroupInputEnvelopeObjectSchema } from './TaskHistoryValueCreateManyGroupInputEnvelope.schema';
import { TaskHistoryValueCreateOrConnectWithoutGroupInputObjectSchema } from './TaskHistoryValueCreateOrConnectWithoutGroupInput.schema';
import { TaskHistoryValueCreateWithoutGroupInputObjectSchema } from './TaskHistoryValueCreateWithoutGroupInput.schema';
import { TaskHistoryValueScalarWhereInputObjectSchema } from './TaskHistoryValueScalarWhereInput.schema';
import { TaskHistoryValueUncheckedCreateWithoutGroupInputObjectSchema } from './TaskHistoryValueUncheckedCreateWithoutGroupInput.schema';
import { TaskHistoryValueUpdateManyWithWhereWithoutGroupInputObjectSchema } from './TaskHistoryValueUpdateManyWithWhereWithoutGroupInput.schema';
import { TaskHistoryValueUpdateWithWhereUniqueWithoutGroupInputObjectSchema } from './TaskHistoryValueUpdateWithWhereUniqueWithoutGroupInput.schema';
import { TaskHistoryValueUpsertWithWhereUniqueWithoutGroupInputObjectSchema } from './TaskHistoryValueUpsertWithWhereUniqueWithoutGroupInput.schema';
import { TaskHistoryValueWhereUniqueInputObjectSchema } from './TaskHistoryValueWhereUniqueInput.schema';

const Schema: z.ZodType<Prisma.TaskHistoryValueUncheckedUpdateManyWithoutGroupNestedInput> = z
  .object({
    create: z
      .union([
        z.lazy(() => TaskHistoryValueCreateWithoutGroupInputObjectSchema),
        z.lazy(() => TaskHistoryValueCreateWithoutGroupInputObjectSchema).array(),
        z.lazy(() => TaskHistoryValueUncheckedCreateWithoutGroupInputObjectSchema),
        z.lazy(() => TaskHistoryValueUncheckedCreateWithoutGroupInputObjectSchema).array(),
      ])
      .optional(),
    connectOrCreate: z
      .union([
        z.lazy(() => TaskHistoryValueCreateOrConnectWithoutGroupInputObjectSchema),
        z.lazy(() => TaskHistoryValueCreateOrConnectWithoutGroupInputObjectSchema).array(),
      ])
      .optional(),
    upsert: z
      .union([
        z.lazy(() => TaskHistoryValueUpsertWithWhereUniqueWithoutGroupInputObjectSchema),
        z.lazy(() => TaskHistoryValueUpsertWithWhereUniqueWithoutGroupInputObjectSchema).array(),
      ])
      .optional(),
    createMany: z.lazy(() => TaskHistoryValueCreateManyGroupInputEnvelopeObjectSchema).optional(),
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
        z.lazy(() => TaskHistoryValueUpdateWithWhereUniqueWithoutGroupInputObjectSchema),
        z.lazy(() => TaskHistoryValueUpdateWithWhereUniqueWithoutGroupInputObjectSchema).array(),
      ])
      .optional(),
    updateMany: z
      .union([
        z.lazy(() => TaskHistoryValueUpdateManyWithWhereWithoutGroupInputObjectSchema),
        z.lazy(() => TaskHistoryValueUpdateManyWithWhereWithoutGroupInputObjectSchema).array(),
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

export const TaskHistoryValueUncheckedUpdateManyWithoutGroupNestedInputObjectSchema = Schema;
