import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { TaskCreateOrConnectWithoutHistoryGroupsInputObjectSchema } from './TaskCreateOrConnectWithoutHistoryGroupsInput.schema';
import { TaskCreateWithoutHistoryGroupsInputObjectSchema } from './TaskCreateWithoutHistoryGroupsInput.schema';
import { TaskUncheckedCreateWithoutHistoryGroupsInputObjectSchema } from './TaskUncheckedCreateWithoutHistoryGroupsInput.schema';
import { TaskWhereUniqueInputObjectSchema } from './TaskWhereUniqueInput.schema';

const Schema: z.ZodType<Prisma.TaskCreateNestedOneWithoutHistoryGroupsInput> = z
  .object({
    create: z
      .union([
        z.lazy(() => TaskCreateWithoutHistoryGroupsInputObjectSchema),
        z.lazy(() => TaskUncheckedCreateWithoutHistoryGroupsInputObjectSchema),
      ])
      .optional(),
    connectOrCreate: z.lazy(() => TaskCreateOrConnectWithoutHistoryGroupsInputObjectSchema).optional(),
    connect: z.lazy(() => TaskWhereUniqueInputObjectSchema).optional(),
  })
  .strict();

export const TaskCreateNestedOneWithoutHistoryGroupsInputObjectSchema = Schema;
