import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { UploadedFileCreateManyUploaderInputEnvelopeObjectSchema } from './UploadedFileCreateManyUploaderInputEnvelope.schema';
import { UploadedFileCreateOrConnectWithoutUploaderInputObjectSchema } from './UploadedFileCreateOrConnectWithoutUploaderInput.schema';
import { UploadedFileCreateWithoutUploaderInputObjectSchema } from './UploadedFileCreateWithoutUploaderInput.schema';
import { UploadedFileScalarWhereInputObjectSchema } from './UploadedFileScalarWhereInput.schema';
import { UploadedFileUncheckedCreateWithoutUploaderInputObjectSchema } from './UploadedFileUncheckedCreateWithoutUploaderInput.schema';
import { UploadedFileUpdateManyWithWhereWithoutUploaderInputObjectSchema } from './UploadedFileUpdateManyWithWhereWithoutUploaderInput.schema';
import { UploadedFileUpdateWithWhereUniqueWithoutUploaderInputObjectSchema } from './UploadedFileUpdateWithWhereUniqueWithoutUploaderInput.schema';
import { UploadedFileUpsertWithWhereUniqueWithoutUploaderInputObjectSchema } from './UploadedFileUpsertWithWhereUniqueWithoutUploaderInput.schema';
import { UploadedFileWhereUniqueInputObjectSchema } from './UploadedFileWhereUniqueInput.schema';

const Schema: z.ZodType<Prisma.UploadedFileUpdateManyWithoutUploaderNestedInput> = z
  .object({
    create: z
      .union([
        z.lazy(() => UploadedFileCreateWithoutUploaderInputObjectSchema),
        z.lazy(() => UploadedFileCreateWithoutUploaderInputObjectSchema).array(),
        z.lazy(() => UploadedFileUncheckedCreateWithoutUploaderInputObjectSchema),
        z.lazy(() => UploadedFileUncheckedCreateWithoutUploaderInputObjectSchema).array(),
      ])
      .optional(),
    connectOrCreate: z
      .union([
        z.lazy(() => UploadedFileCreateOrConnectWithoutUploaderInputObjectSchema),
        z.lazy(() => UploadedFileCreateOrConnectWithoutUploaderInputObjectSchema).array(),
      ])
      .optional(),
    upsert: z
      .union([
        z.lazy(() => UploadedFileUpsertWithWhereUniqueWithoutUploaderInputObjectSchema),
        z.lazy(() => UploadedFileUpsertWithWhereUniqueWithoutUploaderInputObjectSchema).array(),
      ])
      .optional(),
    createMany: z.lazy(() => UploadedFileCreateManyUploaderInputEnvelopeObjectSchema).optional(),
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
        z.lazy(() => UploadedFileUpdateWithWhereUniqueWithoutUploaderInputObjectSchema),
        z.lazy(() => UploadedFileUpdateWithWhereUniqueWithoutUploaderInputObjectSchema).array(),
      ])
      .optional(),
    updateMany: z
      .union([
        z.lazy(() => UploadedFileUpdateManyWithWhereWithoutUploaderInputObjectSchema),
        z.lazy(() => UploadedFileUpdateManyWithWhereWithoutUploaderInputObjectSchema).array(),
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

export const UploadedFileUpdateManyWithoutUploaderNestedInputObjectSchema = Schema;
