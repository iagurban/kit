import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { TaskCreateManyResponsibleInputEnvelopeObjectSchema } from './TaskCreateManyResponsibleInputEnvelope.schema';
import { TaskCreateOrConnectWithoutResponsibleInputObjectSchema } from './TaskCreateOrConnectWithoutResponsibleInput.schema';
import { TaskCreateWithoutResponsibleInputObjectSchema } from './TaskCreateWithoutResponsibleInput.schema';
import { TaskUncheckedCreateWithoutResponsibleInputObjectSchema } from './TaskUncheckedCreateWithoutResponsibleInput.schema';
import { TaskWhereUniqueInputObjectSchema } from './TaskWhereUniqueInput.schema';

const Schema: z.ZodType<Prisma.TaskUncheckedCreateNestedManyWithoutResponsibleInput> = z
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
    createMany: z.lazy(() => TaskCreateManyResponsibleInputEnvelopeObjectSchema).optional(),
    connect: z
      .union([
        z.lazy(() => TaskWhereUniqueInputObjectSchema),
        z.lazy(() => TaskWhereUniqueInputObjectSchema).array(),
      ])
      .optional(),
  })
  .strict();

export const TaskUncheckedCreateNestedManyWithoutResponsibleInputObjectSchema = Schema;
