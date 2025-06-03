import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { TaskCreateWithoutAuthorInputObjectSchema } from './TaskCreateWithoutAuthorInput.schema';
import { TaskUncheckedCreateWithoutAuthorInputObjectSchema } from './TaskUncheckedCreateWithoutAuthorInput.schema';
import { TaskWhereUniqueInputObjectSchema } from './TaskWhereUniqueInput.schema';

const Schema: z.ZodType<Prisma.TaskCreateOrConnectWithoutAuthorInput> = z
  .object({
    where: z.lazy(() => TaskWhereUniqueInputObjectSchema),
    create: z.union([
      z.lazy(() => TaskCreateWithoutAuthorInputObjectSchema),
      z.lazy(() => TaskUncheckedCreateWithoutAuthorInputObjectSchema),
    ]),
  })
  .strict();

export const TaskCreateOrConnectWithoutAuthorInputObjectSchema = Schema;
