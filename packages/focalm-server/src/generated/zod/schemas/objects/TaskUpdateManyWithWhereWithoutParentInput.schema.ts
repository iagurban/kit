import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { TaskScalarWhereInputObjectSchema } from './TaskScalarWhereInput.schema';
import { TaskUncheckedUpdateManyWithoutChildrenInputObjectSchema } from './TaskUncheckedUpdateManyWithoutChildrenInput.schema';
import { TaskUpdateManyMutationInputObjectSchema } from './TaskUpdateManyMutationInput.schema';

const Schema: z.ZodType<Prisma.TaskUpdateManyWithWhereWithoutParentInput> = z
  .object({
    where: z.lazy(() => TaskScalarWhereInputObjectSchema),
    data: z.union([
      z.lazy(() => TaskUpdateManyMutationInputObjectSchema),
      z.lazy(() => TaskUncheckedUpdateManyWithoutChildrenInputObjectSchema),
    ]),
  })
  .strict();

export const TaskUpdateManyWithWhereWithoutParentInputObjectSchema = Schema;
