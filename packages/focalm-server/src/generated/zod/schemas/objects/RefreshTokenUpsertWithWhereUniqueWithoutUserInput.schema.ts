import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { RefreshTokenCreateWithoutUserInputObjectSchema } from './RefreshTokenCreateWithoutUserInput.schema';
import { RefreshTokenUncheckedCreateWithoutUserInputObjectSchema } from './RefreshTokenUncheckedCreateWithoutUserInput.schema';
import { RefreshTokenUncheckedUpdateWithoutUserInputObjectSchema } from './RefreshTokenUncheckedUpdateWithoutUserInput.schema';
import { RefreshTokenUpdateWithoutUserInputObjectSchema } from './RefreshTokenUpdateWithoutUserInput.schema';
import { RefreshTokenWhereUniqueInputObjectSchema } from './RefreshTokenWhereUniqueInput.schema';

const Schema: z.ZodType<Prisma.RefreshTokenUpsertWithWhereUniqueWithoutUserInput> = z
  .object({
    where: z.lazy(() => RefreshTokenWhereUniqueInputObjectSchema),
    update: z.union([
      z.lazy(() => RefreshTokenUpdateWithoutUserInputObjectSchema),
      z.lazy(() => RefreshTokenUncheckedUpdateWithoutUserInputObjectSchema),
    ]),
    create: z.union([
      z.lazy(() => RefreshTokenCreateWithoutUserInputObjectSchema),
      z.lazy(() => RefreshTokenUncheckedCreateWithoutUserInputObjectSchema),
    ]),
  })
  .strict();

export const RefreshTokenUpsertWithWhereUniqueWithoutUserInputObjectSchema = Schema;
