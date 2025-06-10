import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { TaskCreateWithoutParticipantsInputObjectSchema } from './TaskCreateWithoutParticipantsInput.schema';
import { TaskUncheckedCreateWithoutParticipantsInputObjectSchema } from './TaskUncheckedCreateWithoutParticipantsInput.schema';
import { TaskUncheckedUpdateWithoutParticipantsInputObjectSchema } from './TaskUncheckedUpdateWithoutParticipantsInput.schema';
import { TaskUpdateWithoutParticipantsInputObjectSchema } from './TaskUpdateWithoutParticipantsInput.schema';

const Schema: z.ZodType<Prisma.TaskUpsertWithoutParticipantsInput> = z
  .object({
    update: z.union([
      z.lazy(() => TaskUpdateWithoutParticipantsInputObjectSchema),
      z.lazy(() => TaskUncheckedUpdateWithoutParticipantsInputObjectSchema),
    ]),
    create: z.union([
      z.lazy(() => TaskCreateWithoutParticipantsInputObjectSchema),
      z.lazy(() => TaskUncheckedCreateWithoutParticipantsInputObjectSchema),
    ]),
  })
  .strict();

export const TaskUpsertWithoutParticipantsInputObjectSchema = Schema;
