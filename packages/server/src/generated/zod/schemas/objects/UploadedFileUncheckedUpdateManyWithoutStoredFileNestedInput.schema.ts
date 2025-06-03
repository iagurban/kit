import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { UploadedFileCreateManyStoredFileInputEnvelopeObjectSchema } from './UploadedFileCreateManyStoredFileInputEnvelope.schema';
import { UploadedFileCreateOrConnectWithoutStoredFileInputObjectSchema } from './UploadedFileCreateOrConnectWithoutStoredFileInput.schema';
import { UploadedFileCreateWithoutStoredFileInputObjectSchema } from './UploadedFileCreateWithoutStoredFileInput.schema';
import { UploadedFileScalarWhereInputObjectSchema } from './UploadedFileScalarWhereInput.schema';
import { UploadedFileUncheckedCreateWithoutStoredFileInputObjectSchema } from './UploadedFileUncheckedCreateWithoutStoredFileInput.schema';
import { UploadedFileUpdateManyWithWhereWithoutStoredFileInputObjectSchema } from './UploadedFileUpdateManyWithWhereWithoutStoredFileInput.schema';
import { UploadedFileUpdateWithWhereUniqueWithoutStoredFileInputObjectSchema } from './UploadedFileUpdateWithWhereUniqueWithoutStoredFileInput.schema';
import { UploadedFileUpsertWithWhereUniqueWithoutStoredFileInputObjectSchema } from './UploadedFileUpsertWithWhereUniqueWithoutStoredFileInput.schema';
import { UploadedFileWhereUniqueInputObjectSchema } from './UploadedFileWhereUniqueInput.schema';

const Schema: z.ZodType<Prisma.UploadedFileUncheckedUpdateManyWithoutStoredFileNestedInput> = z
  .object({
    create: z
      .union([
        z.lazy(() => UploadedFileCreateWithoutStoredFileInputObjectSchema),
        z.lazy(() => UploadedFileCreateWithoutStoredFileInputObjectSchema).array(),
        z.lazy(() => UploadedFileUncheckedCreateWithoutStoredFileInputObjectSchema),
        z.lazy(() => UploadedFileUncheckedCreateWithoutStoredFileInputObjectSchema).array(),
      ])
      .optional(),
    connectOrCreate: z
      .union([
        z.lazy(() => UploadedFileCreateOrConnectWithoutStoredFileInputObjectSchema),
        z.lazy(() => UploadedFileCreateOrConnectWithoutStoredFileInputObjectSchema).array(),
      ])
      .optional(),
    upsert: z
      .union([
        z.lazy(() => UploadedFileUpsertWithWhereUniqueWithoutStoredFileInputObjectSchema),
        z.lazy(() => UploadedFileUpsertWithWhereUniqueWithoutStoredFileInputObjectSchema).array(),
      ])
      .optional(),
    createMany: z.lazy(() => UploadedFileCreateManyStoredFileInputEnvelopeObjectSchema).optional(),
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
        z.lazy(() => UploadedFileUpdateWithWhereUniqueWithoutStoredFileInputObjectSchema),
        z.lazy(() => UploadedFileUpdateWithWhereUniqueWithoutStoredFileInputObjectSchema).array(),
      ])
      .optional(),
    updateMany: z
      .union([
        z.lazy(() => UploadedFileUpdateManyWithWhereWithoutStoredFileInputObjectSchema),
        z.lazy(() => UploadedFileUpdateManyWithWhereWithoutStoredFileInputObjectSchema).array(),
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

export const UploadedFileUncheckedUpdateManyWithoutStoredFileNestedInputObjectSchema = Schema;
