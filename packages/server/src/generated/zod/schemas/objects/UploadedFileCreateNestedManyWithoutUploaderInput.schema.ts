import { z } from 'zod';
import { UploadedFileCreateWithoutUploaderInputObjectSchema } from './UploadedFileCreateWithoutUploaderInput.schema';
import { UploadedFileUncheckedCreateWithoutUploaderInputObjectSchema } from './UploadedFileUncheckedCreateWithoutUploaderInput.schema';
import { UploadedFileCreateOrConnectWithoutUploaderInputObjectSchema } from './UploadedFileCreateOrConnectWithoutUploaderInput.schema';
import { UploadedFileCreateManyUploaderInputEnvelopeObjectSchema } from './UploadedFileCreateManyUploaderInputEnvelope.schema';
import { UploadedFileWhereUniqueInputObjectSchema } from './UploadedFileWhereUniqueInput.schema';

import type { Prisma } from '../../../old-client';

const Schema: z.ZodType<Prisma.UploadedFileCreateNestedManyWithoutUploaderInput> = z
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
    createMany: z.lazy(() => UploadedFileCreateManyUploaderInputEnvelopeObjectSchema).optional(),
    connect: z
      .union([
        z.lazy(() => UploadedFileWhereUniqueInputObjectSchema),
        z.lazy(() => UploadedFileWhereUniqueInputObjectSchema).array(),
      ])
      .optional(),
  })
  .strict();

export const UploadedFileCreateNestedManyWithoutUploaderInputObjectSchema = Schema;
