import { z } from 'zod';
import { MenuFindManySchema } from '../findManyMenu.schema';
import { UploadedFileFindManySchema } from '../findManyUploadedFile.schema';
import { RefreshTokenFindManySchema } from '../findManyRefreshToken.schema';
import { UserCountOutputTypeArgsObjectSchema } from './UserCountOutputTypeArgs.schema';

import type { Prisma } from '../../../old-client';

const Schema: z.ZodType<Prisma.UserInclude> = z
  .object({
    menus: z.union([z.boolean(), z.lazy(() => MenuFindManySchema)]).optional(),
    uploadedFiles: z.union([z.boolean(), z.lazy(() => UploadedFileFindManySchema)]).optional(),
    refreshTokens: z.union([z.boolean(), z.lazy(() => RefreshTokenFindManySchema)]).optional(),
    _count: z.union([z.boolean(), z.lazy(() => UserCountOutputTypeArgsObjectSchema)]).optional(),
  })
  .strict();

export const UserIncludeObjectSchema = Schema;
