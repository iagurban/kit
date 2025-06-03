import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { MenuFindManySchema } from '../findManyMenu.schema';
import { RefreshTokenFindManySchema } from '../findManyRefreshToken.schema';
import { UploadedFileFindManySchema } from '../findManyUploadedFile.schema';
import { UserCountOutputTypeArgsObjectSchema } from './UserCountOutputTypeArgs.schema';

const Schema: z.ZodType<Prisma.UserSelect> = z
  .object({
    id: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    email: z.boolean().optional(),
    name: z.boolean().optional(),
    passwordHash: z.boolean().optional(),
    menus: z.union([z.boolean(), z.lazy(() => MenuFindManySchema)]).optional(),
    uploadedFiles: z.union([z.boolean(), z.lazy(() => UploadedFileFindManySchema)]).optional(),
    refreshTokens: z.union([z.boolean(), z.lazy(() => RefreshTokenFindManySchema)]).optional(),
    _count: z.union([z.boolean(), z.lazy(() => UserCountOutputTypeArgsObjectSchema)]).optional(),
  })
  .strict();

export const UserSelectObjectSchema = Schema;
