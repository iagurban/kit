import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { TaskCreateManyAuthorInputEnvelopeObjectSchema } from './TaskCreateManyAuthorInputEnvelope.schema';
import { TaskCreateOrConnectWithoutAuthorInputObjectSchema } from './TaskCreateOrConnectWithoutAuthorInput.schema';
import { TaskCreateWithoutAuthorInputObjectSchema } from './TaskCreateWithoutAuthorInput.schema';
import { TaskUncheckedCreateWithoutAuthorInputObjectSchema } from './TaskUncheckedCreateWithoutAuthorInput.schema';
import { TaskWhereUniqueInputObjectSchema } from './TaskWhereUniqueInput.schema';

const Schema: z.ZodType<Prisma.TaskUncheckedCreateNestedManyWithoutAuthorInput> = z
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
    createMany: z.lazy(() => TaskCreateManyAuthorInputEnvelopeObjectSchema).optional(),
    connect: z
      .union([
        z.lazy(() => TaskWhereUniqueInputObjectSchema),
        z.lazy(() => TaskWhereUniqueInputObjectSchema).array(),
      ])
      .optional(),
  })
  .strict();

export const TaskUncheckedCreateNestedManyWithoutAuthorInputObjectSchema = Schema;
