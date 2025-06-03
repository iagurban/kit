import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { TaskCreateWithoutAuthorInputObjectSchema } from './TaskCreateWithoutAuthorInput.schema';
import { TaskUncheckedCreateWithoutAuthorInputObjectSchema } from './TaskUncheckedCreateWithoutAuthorInput.schema';
import { TaskUncheckedUpdateWithoutAuthorInputObjectSchema } from './TaskUncheckedUpdateWithoutAuthorInput.schema';
import { TaskUpdateWithoutAuthorInputObjectSchema } from './TaskUpdateWithoutAuthorInput.schema';
import { TaskWhereUniqueInputObjectSchema } from './TaskWhereUniqueInput.schema';

const Schema: z.ZodType<Prisma.TaskUpsertWithWhereUniqueWithoutAuthorInput> = z
  .object({
    where: z.lazy(() => TaskWhereUniqueInputObjectSchema),
    update: z.union([
      z.lazy(() => TaskUpdateWithoutAuthorInputObjectSchema),
      z.lazy(() => TaskUncheckedUpdateWithoutAuthorInputObjectSchema),
    ]),
    create: z.union([
      z.lazy(() => TaskCreateWithoutAuthorInputObjectSchema),
      z.lazy(() => TaskUncheckedCreateWithoutAuthorInputObjectSchema),
    ]),
  })
  .strict();

export const TaskUpsertWithWhereUniqueWithoutAuthorInputObjectSchema = Schema;
