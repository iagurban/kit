import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { TaskHistoryGroupUncheckedUpdateWithoutAuthorInputObjectSchema } from './TaskHistoryGroupUncheckedUpdateWithoutAuthorInput.schema';
import { TaskHistoryGroupUpdateWithoutAuthorInputObjectSchema } from './TaskHistoryGroupUpdateWithoutAuthorInput.schema';
import { TaskHistoryGroupWhereUniqueInputObjectSchema } from './TaskHistoryGroupWhereUniqueInput.schema';

const Schema: z.ZodType<Prisma.TaskHistoryGroupUpdateWithWhereUniqueWithoutAuthorInput> = z
  .object({
    where: z.lazy(() => TaskHistoryGroupWhereUniqueInputObjectSchema),
    data: z.union([
      z.lazy(() => TaskHistoryGroupUpdateWithoutAuthorInputObjectSchema),
      z.lazy(() => TaskHistoryGroupUncheckedUpdateWithoutAuthorInputObjectSchema),
    ]),
  })
  .strict();

export const TaskHistoryGroupUpdateWithWhereUniqueWithoutAuthorInputObjectSchema = Schema;
