import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { TaskCreateWithoutChildrenInputObjectSchema } from './TaskCreateWithoutChildrenInput.schema';
import { TaskUncheckedCreateWithoutChildrenInputObjectSchema } from './TaskUncheckedCreateWithoutChildrenInput.schema';
import { TaskUncheckedUpdateWithoutChildrenInputObjectSchema } from './TaskUncheckedUpdateWithoutChildrenInput.schema';
import { TaskUpdateWithoutChildrenInputObjectSchema } from './TaskUpdateWithoutChildrenInput.schema';

const Schema: z.ZodType<Prisma.TaskUpsertWithoutChildrenInput> = z
  .object({
    update: z.union([
      z.lazy(() => TaskUpdateWithoutChildrenInputObjectSchema),
      z.lazy(() => TaskUncheckedUpdateWithoutChildrenInputObjectSchema),
    ]),
    create: z.union([
      z.lazy(() => TaskCreateWithoutChildrenInputObjectSchema),
      z.lazy(() => TaskUncheckedCreateWithoutChildrenInputObjectSchema),
    ]),
  })
  .strict();

export const TaskUpsertWithoutChildrenInputObjectSchema = Schema;
