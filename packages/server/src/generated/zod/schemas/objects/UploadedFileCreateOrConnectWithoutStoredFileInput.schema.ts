import { z } from 'zod';
import { UploadedFileWhereUniqueInputObjectSchema } from './UploadedFileWhereUniqueInput.schema';
import { UploadedFileCreateWithoutStoredFileInputObjectSchema } from './UploadedFileCreateWithoutStoredFileInput.schema';
import { UploadedFileUncheckedCreateWithoutStoredFileInputObjectSchema } from './UploadedFileUncheckedCreateWithoutStoredFileInput.schema';

import type { Prisma } from '../../../old-client';

const Schema: z.ZodType<Prisma.UploadedFileCreateOrConnectWithoutStoredFileInput> = z
  .object({
    where: z.lazy(() => UploadedFileWhereUniqueInputObjectSchema),
    create: z.union([
      z.lazy(() => UploadedFileCreateWithoutStoredFileInputObjectSchema),
      z.lazy(() => UploadedFileUncheckedCreateWithoutStoredFileInputObjectSchema),
    ]),
  })
  .strict();

export const UploadedFileCreateOrConnectWithoutStoredFileInputObjectSchema = Schema;
