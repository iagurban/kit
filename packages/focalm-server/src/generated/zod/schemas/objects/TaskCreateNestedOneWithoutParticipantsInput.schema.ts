import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { TaskCreateOrConnectWithoutParticipantsInputObjectSchema } from './TaskCreateOrConnectWithoutParticipantsInput.schema';
import { TaskCreateWithoutParticipantsInputObjectSchema } from './TaskCreateWithoutParticipantsInput.schema';
import { TaskUncheckedCreateWithoutParticipantsInputObjectSchema } from './TaskUncheckedCreateWithoutParticipantsInput.schema';
import { TaskWhereUniqueInputObjectSchema } from './TaskWhereUniqueInput.schema';

const Schema: z.ZodType<Prisma.TaskCreateNestedOneWithoutParticipantsInput> = z
  .object({
    create: z
      .union([
        z.lazy(() => TaskCreateWithoutParticipantsInputObjectSchema),
        z.lazy(() => TaskUncheckedCreateWithoutParticipantsInputObjectSchema),
      ])
      .optional(),
    connectOrCreate: z.lazy(() => TaskCreateOrConnectWithoutParticipantsInputObjectSchema).optional(),
    connect: z.lazy(() => TaskWhereUniqueInputObjectSchema).optional(),
  })
  .strict();

export const TaskCreateNestedOneWithoutParticipantsInputObjectSchema = Schema;
