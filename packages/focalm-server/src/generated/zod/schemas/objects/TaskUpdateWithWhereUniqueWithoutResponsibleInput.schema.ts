import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { TaskUncheckedUpdateWithoutResponsibleInputObjectSchema } from './TaskUncheckedUpdateWithoutResponsibleInput.schema';
import { TaskUpdateWithoutResponsibleInputObjectSchema } from './TaskUpdateWithoutResponsibleInput.schema';
import { TaskWhereUniqueInputObjectSchema } from './TaskWhereUniqueInput.schema';

const Schema: z.ZodType<Prisma.TaskUpdateWithWhereUniqueWithoutResponsibleInput> = z
  .object({
    where: z.lazy(() => TaskWhereUniqueInputObjectSchema),
    data: z.union([
      z.lazy(() => TaskUpdateWithoutResponsibleInputObjectSchema),
      z.lazy(() => TaskUncheckedUpdateWithoutResponsibleInputObjectSchema),
    ]),
  })
  .strict();

export const TaskUpdateWithWhereUniqueWithoutResponsibleInputObjectSchema = Schema;
