import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { TaskCreateWithoutResponsibleInputObjectSchema } from './TaskCreateWithoutResponsibleInput.schema';
import { TaskUncheckedCreateWithoutResponsibleInputObjectSchema } from './TaskUncheckedCreateWithoutResponsibleInput.schema';
import { TaskWhereUniqueInputObjectSchema } from './TaskWhereUniqueInput.schema';

const Schema: z.ZodType<Prisma.TaskCreateOrConnectWithoutResponsibleInput> = z
  .object({
    where: z.lazy(() => TaskWhereUniqueInputObjectSchema),
    create: z.union([
      z.lazy(() => TaskCreateWithoutResponsibleInputObjectSchema),
      z.lazy(() => TaskUncheckedCreateWithoutResponsibleInputObjectSchema),
    ]),
  })
  .strict();

export const TaskCreateOrConnectWithoutResponsibleInputObjectSchema = Schema;
