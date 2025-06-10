import { z } from 'zod';
import { RefreshTokenScalarWhereInputObjectSchema } from './RefreshTokenScalarWhereInput.schema';
import { RefreshTokenUpdateManyMutationInputObjectSchema } from './RefreshTokenUpdateManyMutationInput.schema';
import { RefreshTokenUncheckedUpdateManyWithoutRefreshTokensInputObjectSchema } from './RefreshTokenUncheckedUpdateManyWithoutRefreshTokensInput.schema';

import type { Prisma } from '../../../old-client';

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
