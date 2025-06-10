import { z } from 'zod';
import { UploadedFileCreateWithoutMenuInputObjectSchema } from './UploadedFileCreateWithoutMenuInput.schema';
import { UploadedFileUncheckedCreateWithoutMenuInputObjectSchema } from './UploadedFileUncheckedCreateWithoutMenuInput.schema';
import { UploadedFileCreateOrConnectWithoutMenuInputObjectSchema } from './UploadedFileCreateOrConnectWithoutMenuInput.schema';
import { UploadedFileCreateManyMenuInputEnvelopeObjectSchema } from './UploadedFileCreateManyMenuInputEnvelope.schema';
import { UploadedFileWhereUniqueInputObjectSchema } from './UploadedFileWhereUniqueInput.schema';

import type { Prisma } from '../../../old-client';

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
