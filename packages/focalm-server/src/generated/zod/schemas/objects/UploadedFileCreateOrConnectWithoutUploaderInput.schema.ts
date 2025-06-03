import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { UploadedFileCreateWithoutUploaderInputObjectSchema } from './UploadedFileCreateWithoutUploaderInput.schema';
import { UploadedFileUncheckedCreateWithoutUploaderInputObjectSchema } from './UploadedFileUncheckedCreateWithoutUploaderInput.schema';
import { UploadedFileWhereUniqueInputObjectSchema } from './UploadedFileWhereUniqueInput.schema';

const Schema: z.ZodType<Prisma.UploadedFileCreateOrConnectWithoutUploaderInput> = z
  .object({
    where: z.lazy(() => UploadedFileWhereUniqueInputObjectSchema),
    create: z.union([
      z.lazy(() => UploadedFileCreateWithoutUploaderInputObjectSchema),
      z.lazy(() => UploadedFileUncheckedCreateWithoutUploaderInputObjectSchema),
    ]),
  })
  .strict();

export const UploadedFileCreateOrConnectWithoutUploaderInputObjectSchema = Schema;
