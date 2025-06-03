import { z } from 'zod';

import type { Prisma } from '../../../old-client';

const Schema: z.ZodType<Prisma.UserCountOutputTypeSelect> = z
  .object({
    uploadedFiles: z.boolean().optional(),
    refreshTokens: z.boolean().optional(),
    assignedTasks: z.boolean().optional(),
    authoredTasks: z.boolean().optional(),
    authoredTaskChanges: z.boolean().optional(),
  })
  .strict();

export const UserCountOutputTypeSelectObjectSchema = Schema;
