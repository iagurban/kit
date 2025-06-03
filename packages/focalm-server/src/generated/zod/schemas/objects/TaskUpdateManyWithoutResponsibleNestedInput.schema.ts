import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { TaskCreateManyResponsibleInputEnvelopeObjectSchema } from './TaskCreateManyResponsibleInputEnvelope.schema';
import { TaskCreateOrConnectWithoutResponsibleInputObjectSchema } from './TaskCreateOrConnectWithoutResponsibleInput.schema';
import { TaskCreateWithoutResponsibleInputObjectSchema } from './TaskCreateWithoutResponsibleInput.schema';
import { TaskScalarWhereInputObjectSchema } from './TaskScalarWhereInput.schema';
import { TaskUncheckedCreateWithoutResponsibleInputObjectSchema } from './TaskUncheckedCreateWithoutResponsibleInput.schema';
import { TaskUpdateManyWithWhereWithoutResponsibleInputObjectSchema } from './TaskUpdateManyWithWhereWithoutResponsibleInput.schema';
import { TaskUpdateWithWhereUniqueWithoutResponsibleInputObjectSchema } from './TaskUpdateWithWhereUniqueWithoutResponsibleInput.schema';
import { TaskUpsertWithWhereUniqueWithoutResponsibleInputObjectSchema } from './TaskUpsertWithWhereUniqueWithoutResponsibleInput.schema';
import { TaskWhereUniqueInputObjectSchema } from './TaskWhereUniqueInput.schema';

const Schema: z.ZodType<Prisma.TaskUpdateManyWithoutResponsibleNestedInput> = z
  .object({
    create: z
      .union([
        z.lazy(() => TaskCreateWithoutResponsibleInputObjectSchema),
        z.lazy(() => TaskCreateWithoutResponsibleInputObjectSchema).array(),
        z.lazy(() => TaskUncheckedCreateWithoutResponsibleInputObjectSchema),
        z.lazy(() => TaskUncheckedCreateWithoutResponsibleInputObjectSchema).array(),
      ])
      .optional(),
    connectOrCreate: z
      .union([
        z.lazy(() => TaskCreateOrConnectWithoutResponsibleInputObjectSchema),
        z.lazy(() => TaskCreateOrConnectWithoutResponsibleInputObjectSchema).array(),
      ])
      .optional(),
    upsert: z
      .union([
        z.lazy(() => TaskUpsertWithWhereUniqueWithoutResponsibleInputObjectSchema),
        z.lazy(() => TaskUpsertWithWhereUniqueWithoutResponsibleInputObjectSchema).array(),
      ])
      .optional(),
    createMany: z.lazy(() => TaskCreateManyResponsibleInputEnvelopeObjectSchema).optional(),
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
        z.lazy(() => TaskUpdateWithWhereUniqueWithoutResponsibleInputObjectSchema),
        z.lazy(() => TaskUpdateWithWhereUniqueWithoutResponsibleInputObjectSchema).array(),
      ])
      .optional(),
    updateMany: z
      .union([
        z.lazy(() => TaskUpdateManyWithWhereWithoutResponsibleInputObjectSchema),
        z.lazy(() => TaskUpdateManyWithWhereWithoutResponsibleInputObjectSchema).array(),
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

export const TaskUpdateManyWithoutResponsibleNestedInputObjectSchema = Schema;
