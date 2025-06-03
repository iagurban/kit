import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { TaskHistoryGroupScalarWhereInputObjectSchema } from './TaskHistoryGroupScalarWhereInput.schema';
import { TaskHistoryGroupUncheckedUpdateManyWithoutAuthoredTaskChangesInputObjectSchema } from './TaskHistoryGroupUncheckedUpdateManyWithoutAuthoredTaskChangesInput.schema';
import { TaskHistoryGroupUpdateManyMutationInputObjectSchema } from './TaskHistoryGroupUpdateManyMutationInput.schema';

const Schema: z.ZodType<Prisma.TaskHistoryGroupUpdateManyWithWhereWithoutAuthorInput> = z
  .object({
    where: z.lazy(() => TaskHistoryGroupScalarWhereInputObjectSchema),
    data: z.union([
      z.lazy(() => TaskHistoryGroupUpdateManyMutationInputObjectSchema),
      z.lazy(() => TaskHistoryGroupUncheckedUpdateManyWithoutAuthoredTaskChangesInputObjectSchema),
    ]),
  })
  .strict();

export const TaskHistoryGroupUpdateManyWithWhereWithoutAuthorInputObjectSchema = Schema;
