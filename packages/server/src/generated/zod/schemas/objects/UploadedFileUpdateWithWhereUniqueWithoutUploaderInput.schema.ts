import { z } from 'zod';
import { UploadedFileWhereUniqueInputObjectSchema } from './UploadedFileWhereUniqueInput.schema';
import { UploadedFileUpdateWithoutUploaderInputObjectSchema } from './UploadedFileUpdateWithoutUploaderInput.schema';
import { UploadedFileUncheckedUpdateWithoutUploaderInputObjectSchema } from './UploadedFileUncheckedUpdateWithoutUploaderInput.schema';

import type { Prisma } from '../../../old-client';

const Schema: z.ZodType<Prisma.UploadedFileUpdateWithWhereUniqueWithoutUploaderInput> = z
  .object({
    where: z.lazy(() => UploadedFileWhereUniqueInputObjectSchema),
    data: z.union([
      z.lazy(() => UploadedFileUpdateWithoutUploaderInputObjectSchema),
      z.lazy(() => UploadedFileUncheckedUpdateWithoutUploaderInputObjectSchema),
    ]),
  })
  .strict();

export const UploadedFileUpdateWithWhereUniqueWithoutUploaderInputObjectSchema = Schema;
