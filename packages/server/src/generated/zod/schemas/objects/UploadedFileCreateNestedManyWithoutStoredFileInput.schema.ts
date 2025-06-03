import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { UploadedFileCreateManyStoredFileInputEnvelopeObjectSchema } from './UploadedFileCreateManyStoredFileInputEnvelope.schema';
import { UploadedFileCreateOrConnectWithoutStoredFileInputObjectSchema } from './UploadedFileCreateOrConnectWithoutStoredFileInput.schema';
import { UploadedFileCreateWithoutStoredFileInputObjectSchema } from './UploadedFileCreateWithoutStoredFileInput.schema';
import { UploadedFileUncheckedCreateWithoutStoredFileInputObjectSchema } from './UploadedFileUncheckedCreateWithoutStoredFileInput.schema';
import { UploadedFileWhereUniqueInputObjectSchema } from './UploadedFileWhereUniqueInput.schema';

const Schema: z.ZodType<Prisma.UploadedFileCreateNestedManyWithoutStoredFileInput> = z
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
    createMany: z.lazy(() => UploadedFileCreateManyStoredFileInputEnvelopeObjectSchema).optional(),
    connect: z
      .union([
        z.lazy(() => UploadedFileWhereUniqueInputObjectSchema),
        z.lazy(() => UploadedFileWhereUniqueInputObjectSchema).array(),
      ])
      .optional(),
  })
  .strict();

export const UploadedFileCreateNestedManyWithoutStoredFileInputObjectSchema = Schema;
