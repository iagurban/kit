import { z } from 'zod';

import type { Prisma } from '../../../old-client';

const Schema: z.ZodType<Prisma.UserCountOutputTypeSelect> = z
  .object({
    menus: z.boolean().optional(),
    uploadedFiles: z.boolean().optional(),
    refreshTokens: z.boolean().optional(),
  })
  .strict();

export const UserCountOutputTypeSelectObjectSchema = Schema;
