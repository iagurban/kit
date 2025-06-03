import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { TaskHistoryValueGroupIdKeyCompoundUniqueInputObjectSchema } from './TaskHistoryValueGroupIdKeyCompoundUniqueInput.schema';

const Schema: z.ZodType<Prisma.TaskHistoryValueWhereUniqueInput> = z
  .object({
    groupId_key: z.lazy(() => TaskHistoryValueGroupIdKeyCompoundUniqueInputObjectSchema).optional(),
  })
  .strict();

export const TaskHistoryValueWhereUniqueInputObjectSchema = Schema;
