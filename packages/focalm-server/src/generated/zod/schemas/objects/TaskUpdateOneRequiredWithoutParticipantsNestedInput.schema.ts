import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { TaskCreateOrConnectWithoutParticipantsInputObjectSchema } from './TaskCreateOrConnectWithoutParticipantsInput.schema';
import { TaskCreateWithoutParticipantsInputObjectSchema } from './TaskCreateWithoutParticipantsInput.schema';
import { TaskUncheckedCreateWithoutParticipantsInputObjectSchema } from './TaskUncheckedCreateWithoutParticipantsInput.schema';
import { TaskUncheckedUpdateWithoutParticipantsInputObjectSchema } from './TaskUncheckedUpdateWithoutParticipantsInput.schema';
import { TaskUpdateWithoutParticipantsInputObjectSchema } from './TaskUpdateWithoutParticipantsInput.schema';
import { TaskUpsertWithoutParticipantsInputObjectSchema } from './TaskUpsertWithoutParticipantsInput.schema';
import { TaskWhereUniqueInputObjectSchema } from './TaskWhereUniqueInput.schema';

const Schema: z.ZodType<Prisma.TaskUpdateOneRequiredWithoutParticipantsNestedInput> = z
  .object({
    create: z
      .union([
        z.lazy(() => TaskCreateWithoutParticipantsInputObjectSchema),
        z.lazy(() => TaskUncheckedCreateWithoutParticipantsInputObjectSchema),
      ])
      .optional(),
    connectOrCreate: z.lazy(() => TaskCreateOrConnectWithoutParticipantsInputObjectSchema).optional(),
    upsert: z.lazy(() => TaskUpsertWithoutParticipantsInputObjectSchema).optional(),
    connect: z.lazy(() => TaskWhereUniqueInputObjectSchema).optional(),
    update: z
      .union([
        z.lazy(() => TaskUpdateWithoutParticipantsInputObjectSchema),
        z.lazy(() => TaskUncheckedUpdateWithoutParticipantsInputObjectSchema),
      ])
      .optional(),
  })
  .strict();

export const TaskUpdateOneRequiredWithoutParticipantsNestedInputObjectSchema = Schema;
