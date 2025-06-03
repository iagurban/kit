import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { RefreshTokenScalarWhereInputObjectSchema } from './RefreshTokenScalarWhereInput.schema';
import { RefreshTokenUncheckedUpdateManyWithoutRefreshTokensInputObjectSchema } from './RefreshTokenUncheckedUpdateManyWithoutRefreshTokensInput.schema';
import { RefreshTokenUpdateManyMutationInputObjectSchema } from './RefreshTokenUpdateManyMutationInput.schema';

const Schema: z.ZodType<Prisma.RefreshTokenUpdateManyWithWhereWithoutUserInput> = z
  .object({
    where: z.lazy(() => RefreshTokenScalarWhereInputObjectSchema),
    data: z.union([
      z.lazy(() => RefreshTokenUpdateManyMutationInputObjectSchema),
      z.lazy(() => RefreshTokenUncheckedUpdateManyWithoutRefreshTokensInputObjectSchema),
    ]),
  })
  .strict();

export const RefreshTokenUpdateManyWithWhereWithoutUserInputObjectSchema = Schema;
