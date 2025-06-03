import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { MenuCreateManyOwnerInputEnvelopeObjectSchema } from './MenuCreateManyOwnerInputEnvelope.schema';
import { MenuCreateOrConnectWithoutOwnerInputObjectSchema } from './MenuCreateOrConnectWithoutOwnerInput.schema';
import { MenuCreateWithoutOwnerInputObjectSchema } from './MenuCreateWithoutOwnerInput.schema';
import { MenuUncheckedCreateWithoutOwnerInputObjectSchema } from './MenuUncheckedCreateWithoutOwnerInput.schema';
import { MenuWhereUniqueInputObjectSchema } from './MenuWhereUniqueInput.schema';

const Schema: z.ZodType<Prisma.MenuUncheckedCreateNestedManyWithoutOwnerInput> = z
  .object({
    create: z
      .union([
        z.lazy(() => MenuCreateWithoutOwnerInputObjectSchema),
        z.lazy(() => MenuCreateWithoutOwnerInputObjectSchema).array(),
        z.lazy(() => MenuUncheckedCreateWithoutOwnerInputObjectSchema),
        z.lazy(() => MenuUncheckedCreateWithoutOwnerInputObjectSchema).array(),
      ])
      .optional(),
    connectOrCreate: z
      .union([
        z.lazy(() => MenuCreateOrConnectWithoutOwnerInputObjectSchema),
        z.lazy(() => MenuCreateOrConnectWithoutOwnerInputObjectSchema).array(),
      ])
      .optional(),
    createMany: z.lazy(() => MenuCreateManyOwnerInputEnvelopeObjectSchema).optional(),
    connect: z
      .union([
        z.lazy(() => MenuWhereUniqueInputObjectSchema),
        z.lazy(() => MenuWhereUniqueInputObjectSchema).array(),
      ])
      .optional(),
  })
  .strict();

export const MenuUncheckedCreateNestedManyWithoutOwnerInputObjectSchema = Schema;
