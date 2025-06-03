import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { TaskCreateWithoutParentInputObjectSchema } from './TaskCreateWithoutParentInput.schema';
import { TaskUncheckedCreateWithoutParentInputObjectSchema } from './TaskUncheckedCreateWithoutParentInput.schema';
import { TaskUncheckedUpdateWithoutParentInputObjectSchema } from './TaskUncheckedUpdateWithoutParentInput.schema';
import { TaskUpdateWithoutParentInputObjectSchema } from './TaskUpdateWithoutParentInput.schema';
import { TaskWhereUniqueInputObjectSchema } from './TaskWhereUniqueInput.schema';

const Schema: z.ZodType<Prisma.TaskUpsertWithWhereUniqueWithoutParentInput> = z
  .object({
    where: z.lazy(() => TaskWhereUniqueInputObjectSchema),
    update: z.union([
      z.lazy(() => TaskUpdateWithoutParentInputObjectSchema),
      z.lazy(() => TaskUncheckedUpdateWithoutParentInputObjectSchema),
    ]),
    create: z.union([
      z.lazy(() => TaskCreateWithoutParentInputObjectSchema),
      z.lazy(() => TaskUncheckedCreateWithoutParentInputObjectSchema),
    ]),
  })
  .strict();

export const TaskUpsertWithWhereUniqueWithoutParentInputObjectSchema = Schema;
