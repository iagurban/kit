import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { TagCreateManyMenuInputEnvelopeObjectSchema } from './TagCreateManyMenuInputEnvelope.schema';
import { TagCreateOrConnectWithoutMenuInputObjectSchema } from './TagCreateOrConnectWithoutMenuInput.schema';
import { TagCreateWithoutMenuInputObjectSchema } from './TagCreateWithoutMenuInput.schema';
import { TagUncheckedCreateWithoutMenuInputObjectSchema } from './TagUncheckedCreateWithoutMenuInput.schema';
import { TagWhereUniqueInputObjectSchema } from './TagWhereUniqueInput.schema';

const Schema: z.ZodType<Prisma.TagUncheckedCreateNestedManyWithoutMenuInput> = z
  .object({
    create: z
      .union([
        z.lazy(() => TagCreateWithoutMenuInputObjectSchema),
        z.lazy(() => TagCreateWithoutMenuInputObjectSchema).array(),
        z.lazy(() => TagUncheckedCreateWithoutMenuInputObjectSchema),
        z.lazy(() => TagUncheckedCreateWithoutMenuInputObjectSchema).array(),
      ])
      .optional(),
    connectOrCreate: z
      .union([
        z.lazy(() => TagCreateOrConnectWithoutMenuInputObjectSchema),
        z.lazy(() => TagCreateOrConnectWithoutMenuInputObjectSchema).array(),
      ])
      .optional(),
    createMany: z.lazy(() => TagCreateManyMenuInputEnvelopeObjectSchema).optional(),
    connect: z
      .union([
        z.lazy(() => TagWhereUniqueInputObjectSchema),
        z.lazy(() => TagWhereUniqueInputObjectSchema).array(),
      ])
      .optional(),
  })
  .strict();

export const TagUncheckedCreateNestedManyWithoutMenuInputObjectSchema = Schema;
