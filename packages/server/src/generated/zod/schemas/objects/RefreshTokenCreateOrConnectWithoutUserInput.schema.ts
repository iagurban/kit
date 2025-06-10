import { z } from 'zod';
import { RefreshTokenWhereUniqueInputObjectSchema } from './RefreshTokenWhereUniqueInput.schema';
import { RefreshTokenCreateWithoutUserInputObjectSchema } from './RefreshTokenCreateWithoutUserInput.schema';
import { RefreshTokenUncheckedCreateWithoutUserInputObjectSchema } from './RefreshTokenUncheckedCreateWithoutUserInput.schema';

import type { Prisma } from '../../../old-client';

const Schema: z.ZodType<Prisma.RefreshTokenCreateOrConnectWithoutUserInput> = z
  .object({
    where: z.lazy(() => RefreshTokenWhereUniqueInputObjectSchema),
    create: z.union([
      z.lazy(() => RefreshTokenCreateWithoutUserInputObjectSchema),
      z.lazy(() => RefreshTokenUncheckedCreateWithoutUserInputObjectSchema),
    ]),
  })
  .strict();

export const RefreshTokenCreateOrConnectWithoutUserInputObjectSchema = Schema;
