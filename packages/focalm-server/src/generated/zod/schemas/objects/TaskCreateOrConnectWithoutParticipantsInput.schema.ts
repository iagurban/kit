import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { TaskCreateWithoutParticipantsInputObjectSchema } from './TaskCreateWithoutParticipantsInput.schema';
import { TaskUncheckedCreateWithoutParticipantsInputObjectSchema } from './TaskUncheckedCreateWithoutParticipantsInput.schema';
import { TaskWhereUniqueInputObjectSchema } from './TaskWhereUniqueInput.schema';

const Schema: z.ZodType<Prisma.TaskCreateOrConnectWithoutParticipantsInput> = z
  .object({
    where: z.lazy(() => TaskWhereUniqueInputObjectSchema),
    create: z.union([
      z.lazy(() => TaskCreateWithoutParticipantsInputObjectSchema),
      z.lazy(() => TaskUncheckedCreateWithoutParticipantsInputObjectSchema),
    ]),
  })
  .strict();

export const TaskCreateOrConnectWithoutParticipantsInputObjectSchema = Schema;
