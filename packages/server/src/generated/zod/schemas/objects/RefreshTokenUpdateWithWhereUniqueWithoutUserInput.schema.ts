import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { RefreshTokenUncheckedUpdateWithoutUserInputObjectSchema } from './RefreshTokenUncheckedUpdateWithoutUserInput.schema';
import { RefreshTokenUpdateWithoutUserInputObjectSchema } from './RefreshTokenUpdateWithoutUserInput.schema';
import { RefreshTokenWhereUniqueInputObjectSchema } from './RefreshTokenWhereUniqueInput.schema';

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
