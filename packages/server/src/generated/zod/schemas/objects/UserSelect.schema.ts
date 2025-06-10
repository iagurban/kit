import { z } from 'zod';
import { MenuFindManySchema } from '../findManyMenu.schema';
import { UploadedFileFindManySchema } from '../findManyUploadedFile.schema';
import { RefreshTokenFindManySchema } from '../findManyRefreshToken.schema';
import { UserCountOutputTypeArgsObjectSchema } from './UserCountOutputTypeArgs.schema';

import type { Prisma } from '../../../old-client';

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
