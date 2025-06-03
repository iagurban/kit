import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { TaskCreateManyAuthorInputEnvelopeObjectSchema } from './TaskCreateManyAuthorInputEnvelope.schema';
import { TaskCreateOrConnectWithoutAuthorInputObjectSchema } from './TaskCreateOrConnectWithoutAuthorInput.schema';
import { TaskCreateWithoutAuthorInputObjectSchema } from './TaskCreateWithoutAuthorInput.schema';
import { TaskScalarWhereInputObjectSchema } from './TaskScalarWhereInput.schema';
import { TaskUncheckedCreateWithoutAuthorInputObjectSchema } from './TaskUncheckedCreateWithoutAuthorInput.schema';
import { TaskUpdateManyWithWhereWithoutAuthorInputObjectSchema } from './TaskUpdateManyWithWhereWithoutAuthorInput.schema';
import { TaskUpdateWithWhereUniqueWithoutAuthorInputObjectSchema } from './TaskUpdateWithWhereUniqueWithoutAuthorInput.schema';
import { TaskUpsertWithWhereUniqueWithoutAuthorInputObjectSchema } from './TaskUpsertWithWhereUniqueWithoutAuthorInput.schema';
import { TaskWhereUniqueInputObjectSchema } from './TaskWhereUniqueInput.schema';

const Schema: z.ZodType<Prisma.TaskUpdateManyWithoutAuthorNestedInput> = z
  .object({
    create: z
      .union([
        z.lazy(() => TaskCreateWithoutAuthorInputObjectSchema),
        z.lazy(() => TaskCreateWithoutAuthorInputObjectSchema).array(),
        z.lazy(() => TaskUncheckedCreateWithoutAuthorInputObjectSchema),
        z.lazy(() => TaskUncheckedCreateWithoutAuthorInputObjectSchema).array(),
      ])
      .optional(),
    connectOrCreate: z
      .union([
        z.lazy(() => TaskCreateOrConnectWithoutAuthorInputObjectSchema),
        z.lazy(() => TaskCreateOrConnectWithoutAuthorInputObjectSchema).array(),
      ])
      .optional(),
    upsert: z
      .union([
        z.lazy(() => TaskUpsertWithWhereUniqueWithoutAuthorInputObjectSchema),
        z.lazy(() => TaskUpsertWithWhereUniqueWithoutAuthorInputObjectSchema).array(),
      ])
      .optional(),
    createMany: z.lazy(() => TaskCreateManyAuthorInputEnvelopeObjectSchema).optional(),
    set: z
      .union([
        z.lazy(() => TaskWhereUniqueInputObjectSchema),
        z.lazy(() => TaskWhereUniqueInputObjectSchema).array(),
      ])
      .optional(),
    disconnect: z
      .union([
        z.lazy(() => TaskWhereUniqueInputObjectSchema),
        z.lazy(() => TaskWhereUniqueInputObjectSchema).array(),
      ])
      .optional(),
    delete: z
      .union([
        z.lazy(() => TaskWhereUniqueInputObjectSchema),
        z.lazy(() => TaskWhereUniqueInputObjectSchema).array(),
      ])
      .optional(),
    connect: z
      .union([
        z.lazy(() => TaskWhereUniqueInputObjectSchema),
        z.lazy(() => TaskWhereUniqueInputObjectSchema).array(),
      ])
      .optional(),
    update: z
      .union([
        z.lazy(() => TaskUpdateWithWhereUniqueWithoutAuthorInputObjectSchema),
        z.lazy(() => TaskUpdateWithWhereUniqueWithoutAuthorInputObjectSchema).array(),
      ])
      .optional(),
    updateMany: z
      .union([
        z.lazy(() => TaskUpdateManyWithWhereWithoutAuthorInputObjectSchema),
        z.lazy(() => TaskUpdateManyWithWhereWithoutAuthorInputObjectSchema).array(),
      ])
      .optional(),
    deleteMany: z
      .union([
        z.lazy(() => TaskScalarWhereInputObjectSchema),
        z.lazy(() => TaskScalarWhereInputObjectSchema).array(),
      ])
      .optional(),
  })
  .strict();

export const TaskUpdateManyWithoutAuthorNestedInputObjectSchema = Schema;
