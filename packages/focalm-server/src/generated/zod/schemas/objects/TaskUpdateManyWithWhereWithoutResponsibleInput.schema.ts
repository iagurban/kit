import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { TaskScalarWhereInputObjectSchema } from './TaskScalarWhereInput.schema';
import { TaskUncheckedUpdateManyWithoutAssignedTasksInputObjectSchema } from './TaskUncheckedUpdateManyWithoutAssignedTasksInput.schema';
import { TaskUpdateManyMutationInputObjectSchema } from './TaskUpdateManyMutationInput.schema';

const Schema: z.ZodType<Prisma.TaskUpdateManyWithWhereWithoutResponsibleInput> = z
  .object({
    where: z.lazy(() => TaskScalarWhereInputObjectSchema),
    data: z.union([
      z.lazy(() => TaskUpdateManyMutationInputObjectSchema),
      z.lazy(() => TaskUncheckedUpdateManyWithoutAssignedTasksInputObjectSchema),
    ]),
  })
  .strict();

export const TaskUpdateManyWithWhereWithoutResponsibleInputObjectSchema = Schema;
