import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { TaskCreateWithoutResponsibleInputObjectSchema } from './TaskCreateWithoutResponsibleInput.schema';
import { TaskUncheckedCreateWithoutResponsibleInputObjectSchema } from './TaskUncheckedCreateWithoutResponsibleInput.schema';
import { TaskUncheckedUpdateWithoutResponsibleInputObjectSchema } from './TaskUncheckedUpdateWithoutResponsibleInput.schema';
import { TaskUpdateWithoutResponsibleInputObjectSchema } from './TaskUpdateWithoutResponsibleInput.schema';
import { TaskWhereUniqueInputObjectSchema } from './TaskWhereUniqueInput.schema';

const Schema: z.ZodType<Prisma.TaskUpsertWithWhereUniqueWithoutResponsibleInput> = z
  .object({
    where: z.lazy(() => TaskWhereUniqueInputObjectSchema),
    update: z.union([
      z.lazy(() => TaskUpdateWithoutResponsibleInputObjectSchema),
      z.lazy(() => TaskUncheckedUpdateWithoutResponsibleInputObjectSchema),
    ]),
    create: z.union([
      z.lazy(() => TaskCreateWithoutResponsibleInputObjectSchema),
      z.lazy(() => TaskUncheckedCreateWithoutResponsibleInputObjectSchema),
    ]),
  })
  .strict();

export const TaskUpsertWithWhereUniqueWithoutResponsibleInputObjectSchema = Schema;
