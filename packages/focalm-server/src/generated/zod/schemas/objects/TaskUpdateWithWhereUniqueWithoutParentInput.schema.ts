import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { TaskUncheckedUpdateWithoutParentInputObjectSchema } from './TaskUncheckedUpdateWithoutParentInput.schema';
import { TaskUpdateWithoutParentInputObjectSchema } from './TaskUpdateWithoutParentInput.schema';
import { TaskWhereUniqueInputObjectSchema } from './TaskWhereUniqueInput.schema';

const Schema: z.ZodType<Prisma.TaskUpdateWithWhereUniqueWithoutParentInput> = z
  .object({
    where: z.lazy(() => TaskWhereUniqueInputObjectSchema),
    data: z.union([
      z.lazy(() => TaskUpdateWithoutParentInputObjectSchema),
      z.lazy(() => TaskUncheckedUpdateWithoutParentInputObjectSchema),
    ]),
  })
  .strict();

export const TaskUpdateWithWhereUniqueWithoutParentInputObjectSchema = Schema;
