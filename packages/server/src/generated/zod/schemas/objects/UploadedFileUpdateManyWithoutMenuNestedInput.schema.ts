import { z } from 'zod';
import { UploadedFileCreateWithoutMenuInputObjectSchema } from './UploadedFileCreateWithoutMenuInput.schema';
import { UploadedFileUncheckedCreateWithoutMenuInputObjectSchema } from './UploadedFileUncheckedCreateWithoutMenuInput.schema';
import { UploadedFileCreateOrConnectWithoutMenuInputObjectSchema } from './UploadedFileCreateOrConnectWithoutMenuInput.schema';
import { UploadedFileUpsertWithWhereUniqueWithoutMenuInputObjectSchema } from './UploadedFileUpsertWithWhereUniqueWithoutMenuInput.schema';
import { UploadedFileCreateManyMenuInputEnvelopeObjectSchema } from './UploadedFileCreateManyMenuInputEnvelope.schema';
import { UploadedFileWhereUniqueInputObjectSchema } from './UploadedFileWhereUniqueInput.schema';
import { UploadedFileUpdateWithWhereUniqueWithoutMenuInputObjectSchema } from './UploadedFileUpdateWithWhereUniqueWithoutMenuInput.schema';
import { UploadedFileUpdateManyWithWhereWithoutMenuInputObjectSchema } from './UploadedFileUpdateManyWithWhereWithoutMenuInput.schema';
import { UploadedFileScalarWhereInputObjectSchema } from './UploadedFileScalarWhereInput.schema';

import type { Prisma } from '../../../old-client';

const Schema: z.ZodType<Prisma.UploadedFileUpdateManyWithoutMenuNestedInput> = z
  .object({
    create: z
      .union([
        z.lazy(() => UploadedFileCreateWithoutMenuInputObjectSchema),
        z.lazy(() => UploadedFileCreateWithoutMenuInputObjectSchema).array(),
        z.lazy(() => UploadedFileUncheckedCreateWithoutMenuInputObjectSchema),
        z.lazy(() => UploadedFileUncheckedCreateWithoutMenuInputObjectSchema).array(),
      ])
      .optional(),
    connectOrCreate: z
      .union([
        z.lazy(() => UploadedFileCreateOrConnectWithoutMenuInputObjectSchema),
        z.lazy(() => UploadedFileCreateOrConnectWithoutMenuInputObjectSchema).array(),
      ])
      .optional(),
    upsert: z
      .union([
        z.lazy(() => UploadedFileUpsertWithWhereUniqueWithoutMenuInputObjectSchema),
        z.lazy(() => UploadedFileUpsertWithWhereUniqueWithoutMenuInputObjectSchema).array(),
      ])
      .optional(),
    createMany: z.lazy(() => UploadedFileCreateManyMenuInputEnvelopeObjectSchema).optional(),
    set: z
      .union([
        z.lazy(() => UploadedFileWhereUniqueInputObjectSchema),
        z.lazy(() => UploadedFileWhereUniqueInputObjectSchema).array(),
      ])
      .optional(),
    disconnect: z
      .union([
        z.lazy(() => UploadedFileWhereUniqueInputObjectSchema),
        z.lazy(() => UploadedFileWhereUniqueInputObjectSchema).array(),
      ])
      .optional(),
    delete: z
      .union([
        z.lazy(() => UploadedFileWhereUniqueInputObjectSchema),
        z.lazy(() => UploadedFileWhereUniqueInputObjectSchema).array(),
      ])
      .optional(),
    connect: z
      .union([
        z.lazy(() => UploadedFileWhereUniqueInputObjectSchema),
        z.lazy(() => UploadedFileWhereUniqueInputObjectSchema).array(),
      ])
      .optional(),
    update: z
      .union([
        z.lazy(() => UploadedFileUpdateWithWhereUniqueWithoutMenuInputObjectSchema),
        z.lazy(() => UploadedFileUpdateWithWhereUniqueWithoutMenuInputObjectSchema).array(),
      ])
      .optional(),
    updateMany: z
      .union([
        z.lazy(() => UploadedFileUpdateManyWithWhereWithoutMenuInputObjectSchema),
        z.lazy(() => UploadedFileUpdateManyWithWhereWithoutMenuInputObjectSchema).array(),
      ])
      .optional(),
    deleteMany: z
      .union([
        z.lazy(() => UploadedFileScalarWhereInputObjectSchema),
        z.lazy(() => UploadedFileScalarWhereInputObjectSchema).array(),
      ])
      .optional(),
  })
  .strict();

export const UploadedFileUpdateManyWithoutMenuNestedInputObjectSchema = Schema;
