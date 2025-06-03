import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { TaskUncheckedUpdateWithoutAuthorInputObjectSchema } from './TaskUncheckedUpdateWithoutAuthorInput.schema';
import { TaskUpdateWithoutAuthorInputObjectSchema } from './TaskUpdateWithoutAuthorInput.schema';
import { TaskWhereUniqueInputObjectSchema } from './TaskWhereUniqueInput.schema';

const Schema: z.ZodType<Prisma.TaskUpdateWithWhereUniqueWithoutAuthorInput> = z
  .object({
    where: z.lazy(() => TaskWhereUniqueInputObjectSchema),
    data: z.union([
      z.lazy(() => TaskUpdateWithoutAuthorInputObjectSchema),
      z.lazy(() => TaskUncheckedUpdateWithoutAuthorInputObjectSchema),
    ]),
  })
  .strict();

export const TaskUpdateWithWhereUniqueWithoutAuthorInputObjectSchema = Schema;
