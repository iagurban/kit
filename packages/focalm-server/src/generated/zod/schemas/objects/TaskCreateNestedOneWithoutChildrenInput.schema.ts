import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { TaskCreateOrConnectWithoutChildrenInputObjectSchema } from './TaskCreateOrConnectWithoutChildrenInput.schema';
import { TaskCreateWithoutChildrenInputObjectSchema } from './TaskCreateWithoutChildrenInput.schema';
import { TaskUncheckedCreateWithoutChildrenInputObjectSchema } from './TaskUncheckedCreateWithoutChildrenInput.schema';
import { TaskWhereUniqueInputObjectSchema } from './TaskWhereUniqueInput.schema';

const Schema: z.ZodType<Prisma.TaskCreateNestedOneWithoutChildrenInput> = z
  .object({
    create: z
      .union([
        z.lazy(() => TaskCreateWithoutChildrenInputObjectSchema),
        z.lazy(() => TaskUncheckedCreateWithoutChildrenInputObjectSchema),
      ])
      .optional(),
    connectOrCreate: z.lazy(() => TaskCreateOrConnectWithoutChildrenInputObjectSchema).optional(),
    connect: z.lazy(() => TaskWhereUniqueInputObjectSchema).optional(),
  })
  .strict();

export const TaskCreateNestedOneWithoutChildrenInputObjectSchema = Schema;
