import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { TaskCreateWithoutHistoryGroupsInputObjectSchema } from './TaskCreateWithoutHistoryGroupsInput.schema';
import { TaskUncheckedCreateWithoutHistoryGroupsInputObjectSchema } from './TaskUncheckedCreateWithoutHistoryGroupsInput.schema';
import { TaskWhereUniqueInputObjectSchema } from './TaskWhereUniqueInput.schema';

const Schema: z.ZodType<Prisma.TaskCreateOrConnectWithoutHistoryGroupsInput> = z
  .object({
    where: z.lazy(() => TaskWhereUniqueInputObjectSchema),
    create: z.union([
      z.lazy(() => TaskCreateWithoutHistoryGroupsInputObjectSchema),
      z.lazy(() => TaskUncheckedCreateWithoutHistoryGroupsInputObjectSchema),
    ]),
  })
  .strict();

export const TaskCreateOrConnectWithoutHistoryGroupsInputObjectSchema = Schema;
