import { z } from 'zod';
import { RefreshTokenWhereUniqueInputObjectSchema } from './RefreshTokenWhereUniqueInput.schema';
import { RefreshTokenUpdateWithoutUserInputObjectSchema } from './RefreshTokenUpdateWithoutUserInput.schema';
import { RefreshTokenUncheckedUpdateWithoutUserInputObjectSchema } from './RefreshTokenUncheckedUpdateWithoutUserInput.schema';

import type { Prisma } from '../../../old-client';

const Schema: z.ZodType<Prisma.RefreshTokenUpdateWithWhereUniqueWithoutUserInput> = z
  .object({
    where: z.lazy(() => RefreshTokenWhereUniqueInputObjectSchema),
    data: z.union([
      z.lazy(() => RefreshTokenUpdateWithoutUserInputObjectSchema),
      z.lazy(() => RefreshTokenUncheckedUpdateWithoutUserInputObjectSchema),
    ]),
  })
  .strict();

export const RefreshTokenUpdateWithWhereUniqueWithoutUserInputObjectSchema = Schema;
