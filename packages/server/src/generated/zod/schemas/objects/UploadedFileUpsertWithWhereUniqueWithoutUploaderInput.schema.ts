import { z } from 'zod';
import { UploadedFileWhereUniqueInputObjectSchema } from './UploadedFileWhereUniqueInput.schema';
import { UploadedFileUpdateWithoutUploaderInputObjectSchema } from './UploadedFileUpdateWithoutUploaderInput.schema';
import { UploadedFileUncheckedUpdateWithoutUploaderInputObjectSchema } from './UploadedFileUncheckedUpdateWithoutUploaderInput.schema';
import { UploadedFileCreateWithoutUploaderInputObjectSchema } from './UploadedFileCreateWithoutUploaderInput.schema';
import { UploadedFileUncheckedCreateWithoutUploaderInputObjectSchema } from './UploadedFileUncheckedCreateWithoutUploaderInput.schema';

import type { Prisma } from '../../../old-client';

const Schema: z.ZodType<Prisma.UploadedFileUpsertWithWhereUniqueWithoutUploaderInput> = z
  .object({
    where: z.lazy(() => UploadedFileWhereUniqueInputObjectSchema),
    update: z.union([
      z.lazy(() => UploadedFileUpdateWithoutUploaderInputObjectSchema),
      z.lazy(() => UploadedFileUncheckedUpdateWithoutUploaderInputObjectSchema),
    ]),
    create: z.union([
      z.lazy(() => UploadedFileCreateWithoutUploaderInputObjectSchema),
      z.lazy(() => UploadedFileUncheckedCreateWithoutUploaderInputObjectSchema),
    ]),
  })
  .strict();

export const UploadedFileUpsertWithWhereUniqueWithoutUploaderInputObjectSchema = Schema;
