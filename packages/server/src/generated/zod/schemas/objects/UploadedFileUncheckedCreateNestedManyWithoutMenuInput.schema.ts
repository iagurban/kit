import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { UploadedFileCreateManyMenuInputEnvelopeObjectSchema } from './UploadedFileCreateManyMenuInputEnvelope.schema';
import { UploadedFileCreateOrConnectWithoutMenuInputObjectSchema } from './UploadedFileCreateOrConnectWithoutMenuInput.schema';
import { UploadedFileCreateWithoutMenuInputObjectSchema } from './UploadedFileCreateWithoutMenuInput.schema';
import { UploadedFileUncheckedCreateWithoutMenuInputObjectSchema } from './UploadedFileUncheckedCreateWithoutMenuInput.schema';
import { UploadedFileWhereUniqueInputObjectSchema } from './UploadedFileWhereUniqueInput.schema';

const Schema: z.ZodType<Prisma.UploadedFileUncheckedCreateNestedManyWithoutMenuInput> = z
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
    createMany: z.lazy(() => UploadedFileCreateManyMenuInputEnvelopeObjectSchema).optional(),
    connect: z
      .union([
        z.lazy(() => UploadedFileWhereUniqueInputObjectSchema),
        z.lazy(() => UploadedFileWhereUniqueInputObjectSchema).array(),
      ])
      .optional(),
  })
  .strict();

export const UploadedFileUncheckedCreateNestedManyWithoutMenuInputObjectSchema = Schema;
