import { z } from 'zod';
import { UploadedFileWhereUniqueInputObjectSchema } from './UploadedFileWhereUniqueInput.schema';
import { UploadedFileCreateWithoutUploaderInputObjectSchema } from './UploadedFileCreateWithoutUploaderInput.schema';
import { UploadedFileUncheckedCreateWithoutUploaderInputObjectSchema } from './UploadedFileUncheckedCreateWithoutUploaderInput.schema';

import type { Prisma } from '../../../old-client';

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
