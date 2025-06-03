import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { TaskScalarWhereInputObjectSchema } from './TaskScalarWhereInput.schema';
import { TaskUncheckedUpdateManyWithoutAuthoredTasksInputObjectSchema } from './TaskUncheckedUpdateManyWithoutAuthoredTasksInput.schema';
import { TaskUpdateManyMutationInputObjectSchema } from './TaskUpdateManyMutationInput.schema';

const Schema: z.ZodType<Prisma.TaskUpdateManyWithWhereWithoutAuthorInput> = z
  .object({
    where: z.lazy(() => TaskScalarWhereInputObjectSchema),
    data: z.union([
      z.lazy(() => TaskUpdateManyMutationInputObjectSchema),
      z.lazy(() => TaskUncheckedUpdateManyWithoutAuthoredTasksInputObjectSchema),
    ]),
  })
  .strict();

export const TaskUpdateManyWithWhereWithoutAuthorInputObjectSchema = Schema;
