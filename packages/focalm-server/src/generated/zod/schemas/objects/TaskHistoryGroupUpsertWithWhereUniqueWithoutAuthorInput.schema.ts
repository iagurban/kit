import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { TaskHistoryGroupCreateWithoutAuthorInputObjectSchema } from './TaskHistoryGroupCreateWithoutAuthorInput.schema';
import { TaskHistoryGroupUncheckedCreateWithoutAuthorInputObjectSchema } from './TaskHistoryGroupUncheckedCreateWithoutAuthorInput.schema';
import { TaskHistoryGroupUncheckedUpdateWithoutAuthorInputObjectSchema } from './TaskHistoryGroupUncheckedUpdateWithoutAuthorInput.schema';
import { TaskHistoryGroupUpdateWithoutAuthorInputObjectSchema } from './TaskHistoryGroupUpdateWithoutAuthorInput.schema';
import { TaskHistoryGroupWhereUniqueInputObjectSchema } from './TaskHistoryGroupWhereUniqueInput.schema';

const Schema: z.ZodType<Prisma.TaskHistoryGroupUpsertWithWhereUniqueWithoutAuthorInput> = z
  .object({
    where: z.lazy(() => TaskHistoryGroupWhereUniqueInputObjectSchema),
    update: z.union([
      z.lazy(() => TaskHistoryGroupUpdateWithoutAuthorInputObjectSchema),
      z.lazy(() => TaskHistoryGroupUncheckedUpdateWithoutAuthorInputObjectSchema),
    ]),
    create: z.union([
      z.lazy(() => TaskHistoryGroupCreateWithoutAuthorInputObjectSchema),
      z.lazy(() => TaskHistoryGroupUncheckedCreateWithoutAuthorInputObjectSchema),
    ]),
  })
  .strict();

export const TaskHistoryGroupUpsertWithWhereUniqueWithoutAuthorInputObjectSchema = Schema;
