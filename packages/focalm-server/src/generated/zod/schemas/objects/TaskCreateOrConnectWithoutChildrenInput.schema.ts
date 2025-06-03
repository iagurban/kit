import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { TaskCreateWithoutChildrenInputObjectSchema } from './TaskCreateWithoutChildrenInput.schema';
import { TaskUncheckedCreateWithoutChildrenInputObjectSchema } from './TaskUncheckedCreateWithoutChildrenInput.schema';
import { TaskWhereUniqueInputObjectSchema } from './TaskWhereUniqueInput.schema';

const Schema: z.ZodType<Prisma.TaskCreateOrConnectWithoutChildrenInput> = z
  .object({
    where: z.lazy(() => TaskWhereUniqueInputObjectSchema),
    create: z.union([
      z.lazy(() => TaskCreateWithoutChildrenInputObjectSchema),
      z.lazy(() => TaskUncheckedCreateWithoutChildrenInputObjectSchema),
    ]),
  })
  .strict();

export const TaskCreateOrConnectWithoutChildrenInputObjectSchema = Schema;
