import { z } from 'zod';
import { TagCreateWithoutMenuInputObjectSchema } from './TagCreateWithoutMenuInput.schema';
import { TagUncheckedCreateWithoutMenuInputObjectSchema } from './TagUncheckedCreateWithoutMenuInput.schema';
import { TagCreateOrConnectWithoutMenuInputObjectSchema } from './TagCreateOrConnectWithoutMenuInput.schema';
import { TagUpsertWithWhereUniqueWithoutMenuInputObjectSchema } from './TagUpsertWithWhereUniqueWithoutMenuInput.schema';
import { TagCreateManyMenuInputEnvelopeObjectSchema } from './TagCreateManyMenuInputEnvelope.schema';
import { TagWhereUniqueInputObjectSchema } from './TagWhereUniqueInput.schema';
import { TagUpdateWithWhereUniqueWithoutMenuInputObjectSchema } from './TagUpdateWithWhereUniqueWithoutMenuInput.schema';
import { TagUpdateManyWithWhereWithoutMenuInputObjectSchema } from './TagUpdateManyWithWhereWithoutMenuInput.schema';
import { TagScalarWhereInputObjectSchema } from './TagScalarWhereInput.schema';

import type { Prisma } from '../../../old-client';

const Schema: z.ZodType<Prisma.TagUncheckedUpdateManyWithoutMenuNestedInput> = z
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
    upsert: z
      .union([
        z.lazy(() => TagUpsertWithWhereUniqueWithoutMenuInputObjectSchema),
        z.lazy(() => TagUpsertWithWhereUniqueWithoutMenuInputObjectSchema).array(),
      ])
      .optional(),
    createMany: z.lazy(() => TagCreateManyMenuInputEnvelopeObjectSchema).optional(),
    set: z
      .union([
        z.lazy(() => TagWhereUniqueInputObjectSchema),
        z.lazy(() => TagWhereUniqueInputObjectSchema).array(),
      ])
      .optional(),
    disconnect: z
      .union([
        z.lazy(() => TagWhereUniqueInputObjectSchema),
        z.lazy(() => TagWhereUniqueInputObjectSchema).array(),
      ])
      .optional(),
    delete: z
      .union([
        z.lazy(() => TagWhereUniqueInputObjectSchema),
        z.lazy(() => TagWhereUniqueInputObjectSchema).array(),
      ])
      .optional(),
    connect: z
      .union([
        z.lazy(() => TagWhereUniqueInputObjectSchema),
        z.lazy(() => TagWhereUniqueInputObjectSchema).array(),
      ])
      .optional(),
    update: z
      .union([
        z.lazy(() => TagUpdateWithWhereUniqueWithoutMenuInputObjectSchema),
        z.lazy(() => TagUpdateWithWhereUniqueWithoutMenuInputObjectSchema).array(),
      ])
      .optional(),
    updateMany: z
      .union([
        z.lazy(() => TagUpdateManyWithWhereWithoutMenuInputObjectSchema),
        z.lazy(() => TagUpdateManyWithWhereWithoutMenuInputObjectSchema).array(),
      ])
      .optional(),
    deleteMany: z
      .union([
        z.lazy(() => TagScalarWhereInputObjectSchema),
        z.lazy(() => TagScalarWhereInputObjectSchema).array(),
      ])
      .optional(),
  })
  .strict();

export const TagUncheckedUpdateManyWithoutMenuNestedInputObjectSchema = Schema;
