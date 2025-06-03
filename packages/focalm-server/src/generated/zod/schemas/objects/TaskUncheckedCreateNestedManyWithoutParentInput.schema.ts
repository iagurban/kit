import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { TaskCreateManyParentInputEnvelopeObjectSchema } from './TaskCreateManyParentInputEnvelope.schema';
import { TaskCreateOrConnectWithoutParentInputObjectSchema } from './TaskCreateOrConnectWithoutParentInput.schema';
import { TaskCreateWithoutParentInputObjectSchema } from './TaskCreateWithoutParentInput.schema';
import { TaskUncheckedCreateWithoutParentInputObjectSchema } from './TaskUncheckedCreateWithoutParentInput.schema';
import { TaskWhereUniqueInputObjectSchema } from './TaskWhereUniqueInput.schema';

const Schema: z.ZodType<Prisma.TaskUncheckedCreateNestedManyWithoutParentInput> = z
  .object({
    create: z
      .union([
        z.lazy(() => TaskCreateWithoutParentInputObjectSchema),
        z.lazy(() => TaskCreateWithoutParentInputObjectSchema).array(),
        z.lazy(() => TaskUncheckedCreateWithoutParentInputObjectSchema),
        z.lazy(() => TaskUncheckedCreateWithoutParentInputObjectSchema).array(),
      ])
      .optional(),
    connectOrCreate: z
      .union([
        z.lazy(() => TaskCreateOrConnectWithoutParentInputObjectSchema),
        z.lazy(() => TaskCreateOrConnectWithoutParentInputObjectSchema).array(),
      ])
      .optional(),
    createMany: z.lazy(() => TaskCreateManyParentInputEnvelopeObjectSchema).optional(),
    connect: z
      .union([
        z.lazy(() => TaskWhereUniqueInputObjectSchema),
        z.lazy(() => TaskWhereUniqueInputObjectSchema).array(),
      ])
      .optional(),
  })
  .strict();

export const TaskUncheckedCreateNestedManyWithoutParentInputObjectSchema = Schema;
