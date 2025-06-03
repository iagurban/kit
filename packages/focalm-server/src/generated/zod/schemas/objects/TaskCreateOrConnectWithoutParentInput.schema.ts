import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { TaskCreateWithoutParentInputObjectSchema } from './TaskCreateWithoutParentInput.schema';
import { TaskUncheckedCreateWithoutParentInputObjectSchema } from './TaskUncheckedCreateWithoutParentInput.schema';
import { TaskWhereUniqueInputObjectSchema } from './TaskWhereUniqueInput.schema';

const Schema: z.ZodType<Prisma.TaskCreateOrConnectWithoutParentInput> = z
  .object({
    where: z.lazy(() => TaskWhereUniqueInputObjectSchema),
    create: z.union([
      z.lazy(() => TaskCreateWithoutParentInputObjectSchema),
      z.lazy(() => TaskUncheckedCreateWithoutParentInputObjectSchema),
    ]),
  })
  .strict();

export const TaskCreateOrConnectWithoutParentInputObjectSchema = Schema;
