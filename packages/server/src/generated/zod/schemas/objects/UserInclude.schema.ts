import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { MenuFindManySchema } from '../findManyMenu.schema';
import { RefreshTokenFindManySchema } from '../findManyRefreshToken.schema';
import { UploadedFileFindManySchema } from '../findManyUploadedFile.schema';
import { UserCountOutputTypeArgsObjectSchema } from './UserCountOutputTypeArgs.schema';

const Schema: z.ZodType<Prisma.UserInclude> = z
  .object({
    menus: z.union([z.boolean(), z.lazy(() => MenuFindManySchema)]).optional(),
    uploadedFiles: z.union([z.boolean(), z.lazy(() => UploadedFileFindManySchema)]).optional(),
    refreshTokens: z.union([z.boolean(), z.lazy(() => RefreshTokenFindManySchema)]).optional(),
    _count: z.union([z.boolean(), z.lazy(() => UserCountOutputTypeArgsObjectSchema)]).optional(),
  })
  .strict();

export const UserIncludeObjectSchema = Schema;
