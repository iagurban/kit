import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { RefreshTokenCreateManyUserInputEnvelopeObjectSchema } from './RefreshTokenCreateManyUserInputEnvelope.schema';
import { RefreshTokenCreateOrConnectWithoutUserInputObjectSchema } from './RefreshTokenCreateOrConnectWithoutUserInput.schema';
import { RefreshTokenCreateWithoutUserInputObjectSchema } from './RefreshTokenCreateWithoutUserInput.schema';
import { RefreshTokenUncheckedCreateWithoutUserInputObjectSchema } from './RefreshTokenUncheckedCreateWithoutUserInput.schema';
import { RefreshTokenWhereUniqueInputObjectSchema } from './RefreshTokenWhereUniqueInput.schema';

const Schema: z.ZodType<Prisma.RefreshTokenUncheckedCreateNestedManyWithoutUserInput> = z
  .object({
    create: z
      .union([
        z.lazy(() => RefreshTokenCreateWithoutUserInputObjectSchema),
        z.lazy(() => RefreshTokenCreateWithoutUserInputObjectSchema).array(),
        z.lazy(() => RefreshTokenUncheckedCreateWithoutUserInputObjectSchema),
        z.lazy(() => RefreshTokenUncheckedCreateWithoutUserInputObjectSchema).array(),
      ])
      .optional(),
    connectOrCreate: z
      .union([
        z.lazy(() => RefreshTokenCreateOrConnectWithoutUserInputObjectSchema),
        z.lazy(() => RefreshTokenCreateOrConnectWithoutUserInputObjectSchema).array(),
      ])
      .optional(),
    createMany: z.lazy(() => RefreshTokenCreateManyUserInputEnvelopeObjectSchema).optional(),
    connect: z
      .union([
        z.lazy(() => RefreshTokenWhereUniqueInputObjectSchema),
        z.lazy(() => RefreshTokenWhereUniqueInputObjectSchema).array(),
      ])
      .optional(),
  })
  .strict();

export const RefreshTokenUncheckedCreateNestedManyWithoutUserInputObjectSchema = Schema;
