import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { ItemCreateManyMenuInputEnvelopeObjectSchema } from './ItemCreateManyMenuInputEnvelope.schema';
import { ItemCreateOrConnectWithoutMenuInputObjectSchema } from './ItemCreateOrConnectWithoutMenuInput.schema';
import { ItemCreateWithoutMenuInputObjectSchema } from './ItemCreateWithoutMenuInput.schema';
import { ItemUncheckedCreateWithoutMenuInputObjectSchema } from './ItemUncheckedCreateWithoutMenuInput.schema';
import { ItemWhereUniqueInputObjectSchema } from './ItemWhereUniqueInput.schema';

const Schema: z.ZodType<Prisma.ItemCreateNestedManyWithoutMenuInput> = z
  .object({
    create: z
      .union([
        z.lazy(() => ItemCreateWithoutMenuInputObjectSchema),
        z.lazy(() => ItemCreateWithoutMenuInputObjectSchema).array(),
        z.lazy(() => ItemUncheckedCreateWithoutMenuInputObjectSchema),
        z.lazy(() => ItemUncheckedCreateWithoutMenuInputObjectSchema).array(),
      ])
      .optional(),
    connectOrCreate: z
      .union([
        z.lazy(() => ItemCreateOrConnectWithoutMenuInputObjectSchema),
        z.lazy(() => ItemCreateOrConnectWithoutMenuInputObjectSchema).array(),
      ])
      .optional(),
    createMany: z.lazy(() => ItemCreateManyMenuInputEnvelopeObjectSchema).optional(),
    connect: z
      .union([
        z.lazy(() => ItemWhereUniqueInputObjectSchema),
        z.lazy(() => ItemWhereUniqueInputObjectSchema).array(),
      ])
      .optional(),
  })
  .strict();

export const ItemCreateNestedManyWithoutMenuInputObjectSchema = Schema;
