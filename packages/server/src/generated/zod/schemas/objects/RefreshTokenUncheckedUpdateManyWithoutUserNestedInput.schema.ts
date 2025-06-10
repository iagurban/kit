import { z } from 'zod';
import { RefreshTokenCreateWithoutUserInputObjectSchema } from './RefreshTokenCreateWithoutUserInput.schema';
import { RefreshTokenUncheckedCreateWithoutUserInputObjectSchema } from './RefreshTokenUncheckedCreateWithoutUserInput.schema';
import { RefreshTokenCreateOrConnectWithoutUserInputObjectSchema } from './RefreshTokenCreateOrConnectWithoutUserInput.schema';
import { RefreshTokenUpsertWithWhereUniqueWithoutUserInputObjectSchema } from './RefreshTokenUpsertWithWhereUniqueWithoutUserInput.schema';
import { RefreshTokenCreateManyUserInputEnvelopeObjectSchema } from './RefreshTokenCreateManyUserInputEnvelope.schema';
import { RefreshTokenWhereUniqueInputObjectSchema } from './RefreshTokenWhereUniqueInput.schema';
import { RefreshTokenUpdateWithWhereUniqueWithoutUserInputObjectSchema } from './RefreshTokenUpdateWithWhereUniqueWithoutUserInput.schema';
import { RefreshTokenUpdateManyWithWhereWithoutUserInputObjectSchema } from './RefreshTokenUpdateManyWithWhereWithoutUserInput.schema';
import { RefreshTokenScalarWhereInputObjectSchema } from './RefreshTokenScalarWhereInput.schema';

import type { Prisma } from '../../../old-client';

const Schema: z.ZodType<Prisma.RefreshTokenUncheckedUpdateManyWithoutUserNestedInput> = z
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
    upsert: z
      .union([
        z.lazy(() => RefreshTokenUpsertWithWhereUniqueWithoutUserInputObjectSchema),
        z.lazy(() => RefreshTokenUpsertWithWhereUniqueWithoutUserInputObjectSchema).array(),
      ])
      .optional(),
    createMany: z.lazy(() => RefreshTokenCreateManyUserInputEnvelopeObjectSchema).optional(),
    set: z
      .union([
        z.lazy(() => RefreshTokenWhereUniqueInputObjectSchema),
        z.lazy(() => RefreshTokenWhereUniqueInputObjectSchema).array(),
      ])
      .optional(),
    disconnect: z
      .union([
        z.lazy(() => RefreshTokenWhereUniqueInputObjectSchema),
        z.lazy(() => RefreshTokenWhereUniqueInputObjectSchema).array(),
      ])
      .optional(),
    delete: z
      .union([
        z.lazy(() => RefreshTokenWhereUniqueInputObjectSchema),
        z.lazy(() => RefreshTokenWhereUniqueInputObjectSchema).array(),
      ])
      .optional(),
    connect: z
      .union([
        z.lazy(() => RefreshTokenWhereUniqueInputObjectSchema),
        z.lazy(() => RefreshTokenWhereUniqueInputObjectSchema).array(),
      ])
      .optional(),
    update: z
      .union([
        z.lazy(() => RefreshTokenUpdateWithWhereUniqueWithoutUserInputObjectSchema),
        z.lazy(() => RefreshTokenUpdateWithWhereUniqueWithoutUserInputObjectSchema).array(),
      ])
      .optional(),
    updateMany: z
      .union([
        z.lazy(() => RefreshTokenUpdateManyWithWhereWithoutUserInputObjectSchema),
        z.lazy(() => RefreshTokenUpdateManyWithWhereWithoutUserInputObjectSchema).array(),
      ])
      .optional(),
    deleteMany: z
      .union([
        z.lazy(() => RefreshTokenScalarWhereInputObjectSchema),
        z.lazy(() => RefreshTokenScalarWhereInputObjectSchema).array(),
      ])
      .optional(),
  })
  .strict();

export const RefreshTokenUncheckedUpdateManyWithoutUserNestedInputObjectSchema = Schema;
