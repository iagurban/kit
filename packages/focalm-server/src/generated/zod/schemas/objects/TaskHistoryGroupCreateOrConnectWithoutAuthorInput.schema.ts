import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { TaskHistoryGroupCreateWithoutAuthorInputObjectSchema } from './TaskHistoryGroupCreateWithoutAuthorInput.schema';
import { TaskHistoryGroupUncheckedCreateWithoutAuthorInputObjectSchema } from './TaskHistoryGroupUncheckedCreateWithoutAuthorInput.schema';
import { TaskHistoryGroupWhereUniqueInputObjectSchema } from './TaskHistoryGroupWhereUniqueInput.schema';

const Schema: z.ZodType<Prisma.TaskHistoryGroupCreateOrConnectWithoutAuthorInput> = z
  .object({
    where: z.lazy(() => TaskHistoryGroupWhereUniqueInputObjectSchema),
    create: z.union([
      z.lazy(() => TaskHistoryGroupCreateWithoutAuthorInputObjectSchema),
      z.lazy(() => TaskHistoryGroupUncheckedCreateWithoutAuthorInputObjectSchema),
    ]),
  })
  .strict();

export const TaskHistoryGroupCreateOrConnectWithoutAuthorInputObjectSchema = Schema;
