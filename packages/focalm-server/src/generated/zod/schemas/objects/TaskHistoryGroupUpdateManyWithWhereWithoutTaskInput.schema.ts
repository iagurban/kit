import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { TaskHistoryGroupScalarWhereInputObjectSchema } from './TaskHistoryGroupScalarWhereInput.schema';
import { TaskHistoryGroupUncheckedUpdateManyWithoutHistoryGroupsInputObjectSchema } from './TaskHistoryGroupUncheckedUpdateManyWithoutHistoryGroupsInput.schema';
import { TaskHistoryGroupUpdateManyMutationInputObjectSchema } from './TaskHistoryGroupUpdateManyMutationInput.schema';

const Schema: z.ZodType<Prisma.TaskHistoryGroupUpdateManyWithWhereWithoutTaskInput> = z
  .object({
    where: z.lazy(() => TaskHistoryGroupScalarWhereInputObjectSchema),
    data: z.union([
      z.lazy(() => TaskHistoryGroupUpdateManyMutationInputObjectSchema),
      z.lazy(() => TaskHistoryGroupUncheckedUpdateManyWithoutHistoryGroupsInputObjectSchema),
    ]),
  })
  .strict();

export const TaskHistoryGroupUpdateManyWithWhereWithoutTaskInputObjectSchema = Schema;
